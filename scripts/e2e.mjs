import { writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const tabs = await fetch('http://127.0.0.1:9222/json/list').then(response => response.json());
const tab = tabs.find(item => item.type === 'page' && item.url.includes('127.0.0.1:5173'));
if (!tab) throw new Error('IQ test tab was not found');

const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let sequence = 0;
const pending = new Map();
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

function send(method, params = {}) {
  const id = ++sequence;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await send('Page.reload');
await new Promise(resolve => setTimeout(resolve, 300));
await evaluate(`document.querySelector('#start-btn').click()`);
const questionScreenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
writeFileSync('/private/tmp/iq-test-question.png', Buffer.from(questionScreenshot.data, 'base64'));
const answers = Array.from({ length: 10 }, (_, i) => i % 4);
for (const answer of answers) {
  await evaluate(`document.querySelector('[data-index="${answer}"]').click()`);
  await evaluate(`document.querySelector('#next-btn').click()`);
}

await evaluate(`document.querySelector('[data-review="0"]').click()`);
const firstReview = await evaluate(`({
  expanded: document.querySelector('[data-review="0"]').getAttribute('aria-expanded'),
  detailVisible: getComputedStyle(document.querySelector('#review-detail-0')).display
})`);

assert.equal(firstReview.expanded, 'true');
assert.equal(firstReview.detailVisible, 'block');
assert.equal(await evaluate(`document.querySelectorAll('.review-choice .rotation-diagram').length`), 4);
await evaluate(`document.querySelector('#open-all-reviews').click()`);
const result = await evaluate(`({
  heading: document.querySelector('.result-copy h1')?.textContent,
  score: document.querySelector('.score-orbit strong')?.textContent,
  reviewCards: document.querySelectorAll('.review-card').length,
  correctCards: document.querySelectorAll('.review-card.correct').length,
  openCards: document.querySelectorAll('.review-card.open').length,
  firstReview: ${JSON.stringify(firstReview)}
})`);

assert.equal(result.reviewCards, 10);
assert.equal(result.openCards, 10);
assert.equal(Number(result.score), result.correctCards * 10);
await evaluate(`document.querySelector('.review-choice .rotation-diagram').closest('.review-card').scrollIntoView({behavior:'instant'})`);
const reviewScreenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
writeFileSync('/private/tmp/iq-test-review.png', Buffer.from(reviewScreenshot.data, 'base64'));

await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await evaluate(`document.querySelector('.review-choice .rotation-diagram').closest('.review-card').scrollIntoView({behavior:'instant'})`);
const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
writeFileSync('/private/tmp/iq-test-mobile.png', Buffer.from(screenshot.data, 'base64'));
process.stdout.write(`${JSON.stringify(result)}\n`);
socket.close();
