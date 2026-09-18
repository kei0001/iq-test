import './style.css';
import { buildPools, createQuiz, rotationQuestion, pinQuestion } from './questions.js';

const baseQuestions = [
  {
    category: '数的推理', level: 'WARM UP', accent: '#ff5f45',
    prompt: '数列の「？」に入る数字は？',
    visual: `<div class="sequence"><span>2</span><i>→</i><span>6</span><i>→</i><span>12</span><i>→</i><span>20</span><i>→</i><b>?</b></div>`,
    choices: ['28', '30', '32', '36'], answer: 1,
    explanation: '差は +4, +6, +8 と2ずつ増えています。次は +10 なので 20 + 10 = 30。'
  },
  {
    category: '論理推理', level: 'LOGIC', accent: '#5e7bf7',
    prompt: '必ず正しいと言えるものは？',
    body: 'すべてのノルは青い。青いものの一部は丸い。',
    choices: ['すべてのノルは丸い', '丸いノルが必ず存在する', '青くないノルが存在する', 'ノルは青い'], answer: 3,
    explanation: '最初の文から「ノルならば青い」だけが必ず成立します。丸い青色とノルが同じとは限りません。'
  },
  {
    category: '図形推理', level: 'PATTERN', accent: '#01a878',
    prompt: '次に来る図形はどれ？',
    visual: `<div class="shape-sequence"><div class="shape triangle"></div><div class="shape square"></div><div class="shape pentagon">⬟</div><div class="shape mystery">?</div></div>`,
    choices: ['● 円', '⬢ 六角形', '★ 星', '◇ ひし形'], answer: 1,
    explanation: '辺の数が3（三角形）、4（四角形）、5（五角形）と増えているため、次は6辺の六角形です。'
  },
  {
    category: '言語推理', level: 'WORDS', accent: '#a264d8',
    prompt: '仲間はずれの言葉は？',
    choices: ['秒', '分', '時間', 'メートル'], answer: 3,
    explanation: '秒・分・時間は時間の単位です。メートルだけは長さの単位です。'
  },
  {
    category: '数的推理', level: 'SEQUENCE', accent: '#ff5f45',
    prompt: '数列の「？」に入る数字は？',
    visual: `<div class="sequence compact"><span>1</span><i>·</i><span>1</span><i>·</i><span>2</span><i>·</i><span>3</span><i>·</i><span>5</span><i>·</i><span>8</span><i>·</i><b>?</b></div>`,
    choices: ['11', '12', '13', '15'], answer: 2,
    explanation: '直前の2つを足すフィボナッチ数列です。5 + 8 = 13。'
  },
  rotationQuestion(180),
  pinQuestion(2, 3),
  {
    category: 'パターン認識', level: 'MATRIX', accent: '#01a878',
    prompt: '空欄に入る記号は？',
    visual: `<div class="matrix"><span>○</span><span>△</span><span>□</span><span>△</span><span>□</span><span>○</span><span>□</span><span>○</span><b>?</b></div>`,
    choices: ['○', '△', '□', '◇'], answer: 1,
    explanation: '各行・各列に ○・△・□ が1つずつ入ります。最後の空欄は△です。'
  },
  {
    category: '言語推理', level: 'ANALOGY', accent: '#a264d8',
    prompt: '同じ関係になる言葉は？',
    body: '「本：読む」＝「音楽：？」',
    choices: ['書く', '聴く', '話す', '見る'], answer: 1,
    explanation: '本に対する主な行為が「読む」なら、音楽に対する主な行為は「聴く」です。'
  },
  {
    category: '複合推理', level: 'FINAL', accent: '#1d1d1b',
    prompt: '「？」に入る数字は？',
    visual: `<div class="number-grid"><div><span>3</span><span>5</span><b>16</b></div><div><span>4</span><span>6</span><b>25</b></div><div><span>5</span><span>7</span><b>?</b></div></div>`,
    choices: ['30', '32', '36', '42'], answer: 2,
    explanation: '左の数 × 右の数 + 1 の規則です。3×5+1=16、4×6+1=25、5×7+1=36。'
  }
];
const pools = buildPools(baseQuestions);
let questions = baseQuestions;
let previousIds = [];
try { previousIds = JSON.parse(localStorage.getItem('mindprint-last-questions') || '[]'); } catch {}

const icons = {
  arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>`
};

const app = document.querySelector('#app');
let state = { screen: 'intro', current: 0, answers: Array(questions.length).fill(null), seconds: 480, timer: null };

function renderShell(content, mode = '') {
  app.innerHTML = `<div class="noise"></div><main class="app-shell ${mode}">${content}</main>`;
}

function renderIntro() {
  state.screen = 'intro';
  const best = localStorage.getItem('mindprint-best');
  renderShell(`
    <nav class="topbar">
      <a class="brand" href="#" aria-label="MINDPRINT ホーム"><span>M</span>MINDPRINT<sup>β</sup></a>
      <div class="nav-note">COGNITIVE<br>FIELD TEST / 01</div>
      <button class="sound-toggle" type="button" aria-label="サウンドはオフです"><i></i> SOUND OFF</button>
    </nav>
    <section class="hero">
      <div class="eyebrow"><span>01</span> THINK DIFFERENTLY</div>
      <div class="hero-copy">
        <h1>あなたの思考には、<br><em>どんな形</em>がある？</h1>
        <p>30問の問題プールから毎回10問を出題。<br>数列・論理・言語・図形のパズルに挑戦しましょう。</p>
        <button class="primary-btn" id="start-btn" type="button">テストをはじめる ${icons.arrow}</button>
        <div class="meta-row">
          <span>${icons.clock} 約8分</span><span>${icons.spark} 全10問</span><span>登録不要</span>
        </div>
        ${best ? `<div class="best-note">YOUR PERSONAL BEST <b>${best}</b></div>` : ''}
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="orbit orbit-a"><i></i></div><div class="orbit orbit-b"><i></i></div>
        <div class="brain-mark"><span>?</span></div>
        <div class="art-label label-a">LOGIC <b>82%</b></div>
        <div class="art-label label-b">PATTERN<br>RECOGNITION</div>
        <div class="cross cross-a">+</div><div class="cross cross-b">+</div>
      </div>
      <aside class="side-index"><span>01</span><i></i><span>10</span></aside>
    </section>
    <footer class="intro-footer">
      <p>SCROLL TO EXPLORE</p><div class="ticker"><span>LOGIC</span><i></i><span>PATTERN</span><i></i><span>MEMORY</span><i></i><span>LANGUAGE</span></div>
      <p class="disclaimer">※ 本テストは娯楽・自己理解を目的とした簡易テストです。医療・教育上の正式なIQ検査ではありません。</p>
    </footer>
  `, 'intro');
  document.querySelector('#start-btn').addEventListener('click', startQuiz);
  document.querySelector('.brand').addEventListener('click', e => e.preventDefault());
}

function startQuiz() {
  clearInterval(state.timer);
  questions = createQuiz(pools, previousIds);
  previousIds = questions.map(q => q.id);
  try { localStorage.setItem('mindprint-last-questions', JSON.stringify(previousIds)); } catch {}
  state = { screen: 'quiz', current: 0, answers: Array(questions.length).fill(null), seconds: 480, timer: null };
  renderQuestion();
  state.timer = window.setInterval(() => {
    state.seconds--;
    updateTimer();
    if (state.seconds <= 0) finishQuiz();
  }, 1000);
}

function formatTime(value) {
  const min = Math.floor(value / 60).toString().padStart(2, '0');
  const sec = (value % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function updateTimer() {
  const el = document.querySelector('#timer');
  if (el) {
    el.textContent = formatTime(Math.max(0, state.seconds));
    el.classList.toggle('urgent', state.seconds <= 60);
  }
}

function renderQuestion() {
  const q = questions[state.current];
  const selected = state.answers[state.current];
  const progress = ((state.current + 1) / questions.length) * 100;
  renderShell(`
    <nav class="quiz-nav">
      <button class="brand brand-btn" id="exit-btn" type="button" aria-label="テストを終了してホームへ"><span>M</span>MINDPRINT</button>
      <div class="quiz-progress"><div><b>${String(state.current + 1).padStart(2, '0')}</b> / ${String(questions.length).padStart(2, '0')}</div><span><i style="width:${progress}%"></i></span></div>
      <div class="timer-wrap">${icons.clock}<small>TIME LEFT</small><b id="timer">${formatTime(state.seconds)}</b></div>
    </nav>
    <section class="question-layout" style="--accent:${q.accent}">
      <aside class="question-rail">
        <span>QUESTION</span><b>${String(state.current + 1).padStart(2, '0')}</b>
        <div class="rail-line"></div><small>${q.level}</small>
      </aside>
      <article class="question-card">
        <div class="question-kicker"><i></i>${q.category}</div>
        <h2>${q.prompt}</h2>
        ${q.body ? `<p class="question-body">${q.body}</p>` : ''}
        ${q.visual || ''}
        <div class="choices" role="radiogroup" aria-label="回答の選択肢">
          ${q.choices.map((choice, i) => `<button type="button" class="choice ${selected === i ? 'selected' : ''}" data-index="${i}" role="radio" aria-checked="${selected === i}"><span>${String.fromCharCode(65 + i)}</span><b>${choice}</b><i>${icons.check}</i></button>`).join('')}
        </div>
        <div class="question-actions">
          <button class="text-btn" id="prev-btn" type="button" ${state.current === 0 ? 'disabled' : ''}>← 前の問題</button>
          <button class="next-btn" id="next-btn" type="button" ${selected === null ? 'disabled' : ''}>${state.current === questions.length - 1 ? '結果を見る' : '次の問題'} ${icons.arrow}</button>
        </div>
      </article>
      <aside class="question-map" aria-label="問題一覧">
        ${questions.map((_, i) => `<button type="button" data-jump="${i}" class="${i === state.current ? 'active' : ''} ${state.answers[i] !== null ? 'done' : ''}" aria-label="問題${i + 1}">${String(i + 1).padStart(2, '0')}</button>`).join('')}
      </aside>
    </section>
  `, 'quiz');

  document.querySelectorAll('.choice').forEach(btn => btn.addEventListener('click', () => {
    state.answers[state.current] = Number(btn.dataset.index);
    renderQuestion();
  }));
  document.querySelector('#prev-btn').addEventListener('click', () => { state.current--; renderQuestion(); });
  document.querySelector('#next-btn').addEventListener('click', () => {
    if (state.current === questions.length - 1) finishQuiz();
    else { state.current++; renderQuestion(); }
  });
  document.querySelectorAll('[data-jump]').forEach(btn => btn.addEventListener('click', () => { state.current = Number(btn.dataset.jump); renderQuestion(); }));
  document.querySelector('#exit-btn').addEventListener('click', () => { clearInterval(state.timer); renderIntro(); });
}

function scoreQuiz() {
  return state.answers.reduce((total, answer, i) => total + (answer === questions[i].answer ? 1 : 0), 0);
}

function resultProfile(score) {
  if (score >= 9) return { iq: '130+', title: '異次元のパターンハンター', text: '複雑な情報から規則性を素早く見つける力が際立っています。未知の問題でも、構造を捉えて突破口を作れるタイプです。' };
  if (score >= 7) return { iq: '115–129', title: '鋭敏なロジックビルダー', text: '論理と直感のバランスが良く、複数の手がかりを整理して答えにたどり着くのが得意です。' };
  if (score >= 5) return { iq: '100–114', title: '柔軟なアイデアナビゲーター', text: '標準以上の推理力を持ち、視点を切り替えながら着実に問題を解けるタイプです。' };
  if (score >= 3) return { iq: '85–99', title: 'じっくり型のシンカー', text: '慎重に情報を扱うタイプです。得意分野を磨くと、さらに思考のスピードと精度が伸びていきます。' };
  return { iq: '〜84', title: '自由な発想のエクスプローラー', text: '定型にとらわれない発想の持ち主です。今回は問題との相性もありそう。解説を見てもう一度挑戦してみましょう。' };
}

function finishQuiz() {
  clearInterval(state.timer);
  const score = scoreQuiz();
  const previous = Number(localStorage.getItem('mindprint-best') || 0);
  if (score > previous) localStorage.setItem('mindprint-best', String(score));
  state.screen = 'result';
  const profile = resultProfile(score);
  const angle = Math.round((score / questions.length) * 360);
  renderShell(`
    <nav class="topbar result-nav"><a class="brand" href="#"><span>M</span>MINDPRINT<sup>RESULT</sup></a><div class="nav-note">COGNITIVE<br>FIELD TEST / 01</div></nav>
    <section class="result-hero">
      <div class="result-copy">
        <div class="eyebrow"><span>RESULT</span> YOUR MINDPRINT</div>
        <p class="result-overline">YOUR THINKING TYPE IS...</p>
        <h1>${profile.title}</h1>
        <p>${profile.text}</p>
        <div class="score-strip"><div><small>推定IQレンジ</small><strong>${profile.iq}</strong></div><div><small>正解数</small><strong>${score}<em> / ${questions.length}</em></strong></div><div><small>所要時間</small><strong>${formatTime(480 - state.seconds)}</strong></div></div>
        <button class="review-jump" id="review-jump" type="button">問題を振り返る <span>↓</span></button>
      </div>
      <div class="score-orbit" style="--score-angle:${angle}deg"><div><small>SCORE</small><strong>${score * 10}</strong><span>/ 100</span></div></div>
    </section>
    <section class="review-section">
      <div class="review-heading"><span>02</span><div><small>ANSWER REVIEW</small><h2>思考の軌跡を<br>振り返る。</h2></div></div>
      <div class="review-tools"><p>カードを開くと、出題内容とすべての選択肢を確認できます。</p><button id="open-all-reviews" type="button">すべて開く</button></div>
      <div class="review-grid">
        ${questions.map((q, i) => {
          const correct = state.answers[i] === q.answer;
          return `<article class="review-card ${correct ? 'correct' : 'wrong'}" style="--accent:${q.accent}">
            <button class="review-summary" type="button" data-review="${i}" aria-expanded="false">
              <span class="review-number">Q${String(i + 1).padStart(2, '0')}</span>
              <span class="review-status">${correct ? 'CORRECT' : 'REVIEW'}</span>
              <strong>${q.prompt}</strong>
              <span class="review-answer">あなたの回答 <b>${state.answers[i] === null ? '未回答' : q.choices[state.answers[i]]}</b></span>
              <i>＋</i>
            </button>
            <div class="review-detail" id="review-detail-${i}">
              <div class="review-question">
                <small>${q.category} / ${q.level}</small>
                ${q.body ? `<p class="review-body">${q.body}</p>` : ''}
                ${q.visual || ''}
                <div class="review-choices">
                  ${q.choices.map((choice, choiceIndex) => {
                    const isCorrect = choiceIndex === q.answer;
                    const isSelected = choiceIndex === state.answers[i];
                    return `<div class="review-choice ${isCorrect ? 'is-correct' : ''} ${isSelected ? 'is-selected' : ''}"><span>${String.fromCharCode(65 + choiceIndex)}</span><b>${choice}</b>${isCorrect ? '<em>正解</em>' : ''}${isSelected && !isCorrect ? '<em>あなたの回答</em>' : ''}</div>`;
                  }).join('')}
                </div>
              </div>
              <div class="review-explanation"><small>EXPLANATION</small><p>${q.explanation}</p></div>
            </div>
          </article>`;
        }).join('')}
      </div>
      <div class="result-actions"><button class="primary-btn" id="retry-btn" type="button">もう一度挑戦する ${icons.arrow}</button><button class="text-btn" id="home-btn" type="button">トップに戻る</button></div>
      <p class="result-disclaimer">この結果は簡易問題に基づく目安です。正式な知能指数の測定には、専門家による標準化検査が必要です。</p>
    </section>
  `, 'result');
  document.querySelector('#retry-btn').addEventListener('click', startQuiz);
  document.querySelector('#home-btn').addEventListener('click', renderIntro);
  document.querySelector('#review-jump').addEventListener('click', () => document.querySelector('.review-section').scrollIntoView({ behavior: 'smooth' }));
  document.querySelectorAll('[data-review]').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.review-card');
    const isOpen = card.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  }));
  document.querySelector('#open-all-reviews').addEventListener('click', event => {
    const cards = [...document.querySelectorAll('.review-card')];
    const shouldOpen = cards.some(card => !card.classList.contains('open'));
    cards.forEach(card => {
      card.classList.toggle('open', shouldOpen);
      card.querySelector('.review-summary').setAttribute('aria-expanded', String(shouldOpen));
    });
    event.currentTarget.textContent = shouldOpen ? 'すべて閉じる' : 'すべて開く';
  });
  document.querySelector('.brand').addEventListener('click', e => { e.preventDefault(); renderIntro(); });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('keydown', event => {
  if (state.screen !== 'quiz') return;
  if (/^[1-4]$/.test(event.key)) {
    state.answers[state.current] = Number(event.key) - 1;
    renderQuestion();
  }
  if (event.key === 'Enter' && state.answers[state.current] !== null) {
    if (state.current === questions.length - 1) finishQuiz();
    else { state.current++; renderQuestion(); }
  }
});

renderIntro();
