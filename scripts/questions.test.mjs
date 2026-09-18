import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { buildPools, createQuiz, rotationQuestion, pinQuestion } from '../src/questions.js';

const source = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const declaration = source.slice(source.indexOf('const baseQuestions'), source.indexOf('const pools'));
const base = runInNewContext(`${declaration};baseQuestions`, { rotationQuestion, pinQuestion });
const pools = buildPools(base);

test('30 questions have four distinct choices and valid answers', () => {
  assert.equal(pools.flat().length, 30);
  for (const q of pools.flat()) {
    assert.equal(q.choices.length, 4);
    assert.equal(new Set(q.choices).size, 4);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
    assert.ok(q.explanation);
  }
});

test('every PIN has exactly one solution among all three-digit numbers', () => {
  for (const q of pools.flat().filter(q => q.constraints)) {
    const solutions = [];
    for (let n = 100; n < 1000; n++) {
      const [h, t, u] = String(n).split('').map(Number);
      if (h === 2 * u && t === h - q.constraints.difference && h + t + u === q.constraints.sum) solutions.push(String(n));
    }
    assert.deepEqual(solutions, [q.choices[q.answer]]);
  }
});

test('rotation moves both arms and dot around the specified center', () => {
  for (const angle of [90, 180, 270]) {
    const q = rotationQuestion(angle);
    assert.ok(q.body.includes(`時計回りに${angle}度`));
    assert.ok(q.choices[q.answer].includes(`rotate(${angle} 50 50)`));
    assert.ok(q.choices[q.answer].includes('cx="76" cy="24"'));
    assert.equal(new Set(q.choices).size, 4);
  }
});

test('100 runs preserve scoring and balance and never repeat the preceding set', () => {
  let previous = [];
  for (let n = 0; n < 100; n++) {
    const quiz = createQuiz(pools, previous);
    assert.equal(quiz.length, 10);
    assert.equal(new Set(quiz.map(q => q.id.split('-')[0])).size, 10);
    for (const q of quiz) {
      assert.ok(!previous.includes(q.id));
      const original = pools.flat().find(v => v.id === q.id);
      assert.equal(q.choices[q.answer], original.choices[original.answer]);
    }
    previous = quiz.map(q => q.id);
  }
});
