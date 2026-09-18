(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function c(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=c(s);fetch(s.href,a)}})();const i=[{category:"数的推理",level:"WARM UP",accent:"#ff5f45",prompt:"数列の「？」に入る数字は？",visual:'<div class="sequence"><span>2</span><i>→</i><span>6</span><i>→</i><span>12</span><i>→</i><span>20</span><i>→</i><b>?</b></div>',choices:["28","30","32","36"],answer:1,explanation:"差は +4, +6, +8 と2ずつ増えています。次は +10 なので 20 + 10 = 30。"},{category:"論理推理",level:"LOGIC",accent:"#5e7bf7",prompt:"必ず正しいと言えるものは？",body:"すべてのノルは青い。青いものの一部は丸い。",choices:["すべてのノルは丸い","丸いノルが必ず存在する","青くないノルが存在する","ノルは青い"],answer:3,explanation:"最初の文から「ノルならば青い」だけが必ず成立します。丸い青色とノルが同じとは限りません。"},{category:"図形推理",level:"PATTERN",accent:"#01a878",prompt:"次に来る図形はどれ？",visual:'<div class="shape-sequence"><div class="shape triangle"></div><div class="shape square"></div><div class="shape pentagon">⬟</div><div class="shape mystery">?</div></div>',choices:["● 円","⬢ 六角形","★ 星","◇ ひし形"],answer:1,explanation:"辺の数が3（三角形）、4（四角形）、5（五角形）と増えているため、次は6辺の六角形です。"},{category:"言語推理",level:"WORDS",accent:"#a264d8",prompt:"仲間はずれの言葉は？",choices:["秒","分","時間","メートル"],answer:3,explanation:"秒・分・時間は時間の単位です。メートルだけは長さの単位です。"},{category:"数的推理",level:"SEQUENCE",accent:"#ff5f45",prompt:"数列の「？」に入る数字は？",visual:'<div class="sequence compact"><span>1</span><i>·</i><span>1</span><i>·</i><span>2</span><i>·</i><span>3</span><i>·</i><span>5</span><i>·</i><span>8</span><i>·</i><b>?</b></div>',choices:["11","12","13","15"],answer:2,explanation:"直前の2つを足すフィボナッチ数列です。5 + 8 = 13。"},{category:"空間認識",level:"ROTATION",accent:"#f4b942",prompt:"同じ形を回転させたものはどれ？",visual:'<div class="rotation-stage"><div class="tangram original"><i></i><b></b><em></em></div><span>↻</span></div>',choices:["左上に点があるL","右上に点があるL","左下に点があるL","点のないL"],answer:2,explanation:"180度回転すると、L字の向きと点の位置がともに反転し、点は左下に移動します。"},{category:"論理推理",level:"DEDUCTION",accent:"#5e7bf7",prompt:"暗証番号として正しいのは？",body:"3桁の数。百の位は一の位の2倍。十の位は百の位より3小さい。3つの数字の合計は9。",choices:["624","402","412","321"],answer:2,explanation:"百の位＝2×一の位、十の位＝百の位−3。3つの数字の合計が9になるのは、一の位2・百の位4・十の位1の「412」です。"},{category:"パターン認識",level:"MATRIX",accent:"#01a878",prompt:"空欄に入る記号は？",visual:'<div class="matrix"><span>○</span><span>△</span><span>□</span><span>△</span><span>□</span><span>○</span><span>□</span><span>○</span><b>?</b></div>',choices:["○","△","□","◇"],answer:1,explanation:"各行・各列に ○・△・□ が1つずつ入ります。最後の空欄は△です。"},{category:"言語推理",level:"ANALOGY",accent:"#a264d8",prompt:"同じ関係になる言葉は？",body:"「本：読む」＝「音楽：？」",choices:["書く","聴く","話す","見る"],answer:1,explanation:"本に対する主な行為が「読む」なら、音楽に対する主な行為は「聴く」です。"},{category:"複合推理",level:"FINAL",accent:"#1d1d1b",prompt:"「？」に入る数字は？",visual:'<div class="number-grid"><div><span>3</span><span>5</span><b>16</b></div><div><span>4</span><span>6</span><b>25</b></div><div><span>5</span><span>7</span><b>?</b></div></div>',choices:["30","32","36","42"],answer:2,explanation:"左の数 × 右の数 + 1 の規則です。3×5+1=16、4×6+1=25、5×7+1=36。"}],l={arrow:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',clock:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',spark:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"/></svg>',check:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>'},h=document.querySelector("#app");let t={screen:"intro",current:0,answers:Array(i.length).fill(null),seconds:480,timer:null};function u(e,n=""){h.innerHTML=`<div class="noise"></div><main class="app-shell ${n}">${e}</main>`}function p(){const e=localStorage.getItem("mindprint-best");u(`
    <nav class="topbar">
      <a class="brand" href="#" aria-label="MINDPRINT ホーム"><span>M</span>MINDPRINT<sup>β</sup></a>
      <div class="nav-note">COGNITIVE<br>FIELD TEST / 01</div>
      <button class="sound-toggle" type="button" aria-label="サウンドはオフです"><i></i> SOUND OFF</button>
    </nav>
    <section class="hero">
      <div class="eyebrow"><span>01</span> THINK DIFFERENTLY</div>
      <div class="hero-copy">
        <h1>あなたの思考には、<br><em>どんな形</em>がある？</h1>
        <p>10の問いから、論理・数理・言語・空間認識をスキャン。<br>正解の数だけでは見えない、あなたの“考え方の輪郭”を描きます。</p>
        <button class="primary-btn" id="start-btn" type="button">テストをはじめる ${l.arrow}</button>
        <div class="meta-row">
          <span>${l.clock} 約8分</span><span>${l.spark} 全10問</span><span>登録不要</span>
        </div>
        ${e?`<div class="best-note">YOUR PERSONAL BEST <b>${e}</b></div>`:""}
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
  `,"intro"),document.querySelector("#start-btn").addEventListener("click",m),document.querySelector(".brand").addEventListener("click",n=>n.preventDefault())}function m(){t={screen:"quiz",current:0,answers:Array(i.length).fill(null),seconds:480,timer:null},o(),t.timer=window.setInterval(()=>{t.seconds--,g(),t.seconds<=0&&b()},1e3)}function v(e){const n=Math.floor(e/60).toString().padStart(2,"0"),c=(e%60).toString().padStart(2,"0");return`${n}:${c}`}function g(){const e=document.querySelector("#timer");e&&(e.textContent=v(Math.max(0,t.seconds)),e.classList.toggle("urgent",t.seconds<=60))}function o(){const e=i[t.current],n=t.answers[t.current],c=(t.current+1)/i.length*100;u(`
    <nav class="quiz-nav">
      <button class="brand brand-btn" id="exit-btn" type="button" aria-label="テストを終了してホームへ"><span>M</span>MINDPRINT</button>
      <div class="quiz-progress"><div><b>${String(t.current+1).padStart(2,"0")}</b> / ${String(i.length).padStart(2,"0")}</div><span><i style="width:${c}%"></i></span></div>
      <div class="timer-wrap">${l.clock}<small>TIME LEFT</small><b id="timer">${v(t.seconds)}</b></div>
    </nav>
    <section class="question-layout" style="--accent:${e.accent}">
      <aside class="question-rail">
        <span>QUESTION</span><b>${String(t.current+1).padStart(2,"0")}</b>
        <div class="rail-line"></div><small>${e.level}</small>
      </aside>
      <article class="question-card">
        <div class="question-kicker"><i></i>${e.category}</div>
        <h2>${e.prompt}</h2>
        ${e.body?`<p class="question-body">${e.body}</p>`:""}
        ${e.visual||""}
        <div class="choices" role="radiogroup" aria-label="回答の選択肢">
          ${e.choices.map((r,s)=>`<button type="button" class="choice ${n===s?"selected":""}" data-index="${s}" role="radio" aria-checked="${n===s}"><span>${String.fromCharCode(65+s)}</span><b>${r}</b><i>${l.check}</i></button>`).join("")}
        </div>
        <div class="question-actions">
          <button class="text-btn" id="prev-btn" type="button" ${t.current===0?"disabled":""}>← 前の問題</button>
          <button class="next-btn" id="next-btn" type="button" ${n===null?"disabled":""}>${t.current===i.length-1?"結果を見る":"次の問題"} ${l.arrow}</button>
        </div>
      </article>
      <aside class="question-map" aria-label="問題一覧">
        ${i.map((r,s)=>`<button type="button" data-jump="${s}" class="${s===t.current?"active":""} ${t.answers[s]!==null?"done":""}" aria-label="問題${s+1}">${String(s+1).padStart(2,"0")}</button>`).join("")}
      </aside>
    </section>
  `,"quiz"),document.querySelectorAll(".choice").forEach(r=>r.addEventListener("click",()=>{t.answers[t.current]=Number(r.dataset.index),o()})),document.querySelector("#prev-btn").addEventListener("click",()=>{t.current--,o()}),document.querySelector("#next-btn").addEventListener("click",()=>{t.current===i.length-1?b():(t.current++,o())}),document.querySelectorAll("[data-jump]").forEach(r=>r.addEventListener("click",()=>{t.current=Number(r.dataset.jump),o()})),document.querySelector("#exit-btn").addEventListener("click",()=>{clearInterval(t.timer),p()})}function f(){return t.answers.reduce((e,n,c)=>e+(n===i[c].answer?1:0),0)}function y(e){return e>=9?{iq:"130+",title:"異次元のパターンハンター",text:"複雑な情報から規則性を素早く見つける力が際立っています。未知の問題でも、構造を捉えて突破口を作れるタイプです。"}:e>=7?{iq:"115–129",title:"鋭敏なロジックビルダー",text:"論理と直感のバランスが良く、複数の手がかりを整理して答えにたどり着くのが得意です。"}:e>=5?{iq:"100–114",title:"柔軟なアイデアナビゲーター",text:"標準以上の推理力を持ち、視点を切り替えながら着実に問題を解けるタイプです。"}:e>=3?{iq:"85–99",title:"じっくり型のシンカー",text:"慎重に情報を扱うタイプです。得意分野を磨くと、さらに思考のスピードと精度が伸びていきます。"}:{iq:"〜84",title:"自由な発想のエクスプローラー",text:"定型にとらわれない発想の持ち主です。今回は問題との相性もありそう。解説を見てもう一度挑戦してみましょう。"}}function b(){clearInterval(t.timer);const e=f(),n=Number(localStorage.getItem("mindprint-best")||0);e>n&&localStorage.setItem("mindprint-best",String(e)),t.screen="result";const c=y(e),r=Math.round(e/i.length*360);u(`
    <nav class="topbar result-nav"><a class="brand" href="#"><span>M</span>MINDPRINT<sup>RESULT</sup></a><div class="nav-note">COGNITIVE<br>FIELD TEST / 01</div></nav>
    <section class="result-hero">
      <div class="result-copy">
        <div class="eyebrow"><span>RESULT</span> YOUR MINDPRINT</div>
        <p class="result-overline">YOUR THINKING TYPE IS...</p>
        <h1>${c.title}</h1>
        <p>${c.text}</p>
        <div class="score-strip"><div><small>推定IQレンジ</small><strong>${c.iq}</strong></div><div><small>正解数</small><strong>${e}<em> / ${i.length}</em></strong></div><div><small>所要時間</small><strong>${v(480-t.seconds)}</strong></div></div>
      </div>
      <div class="score-orbit" style="--score-angle:${r}deg"><div><small>SCORE</small><strong>${e*10}</strong><span>/ 100</span></div></div>
    </section>
    <section class="review-section">
      <div class="review-heading"><span>02</span><div><small>ANSWER REVIEW</small><h2>思考の軌跡を<br>振り返る。</h2></div></div>
      <div class="review-grid">
        ${i.map((s,a)=>{const d=t.answers[a]===s.answer;return`<article class="review-card ${d?"correct":"wrong"}"><header><span>Q${String(a+1).padStart(2,"0")}</span><b>${d?"CORRECT":"REVIEW"}</b></header><h3>${s.prompt}</h3><p>${s.explanation}</p><footer><span>あなたの回答</span><b>${t.answers[a]===null?"未回答":s.choices[t.answers[a]]}</b><i>正解 ${s.choices[s.answer]}</i></footer></article>`}).join("")}
      </div>
      <div class="result-actions"><button class="primary-btn" id="retry-btn" type="button">もう一度挑戦する ${l.arrow}</button><button class="text-btn" id="home-btn" type="button">トップに戻る</button></div>
      <p class="result-disclaimer">この結果は簡易問題に基づく目安です。正式な知能指数の測定には、専門家による標準化検査が必要です。</p>
    </section>
  `,"result"),document.querySelector("#retry-btn").addEventListener("click",m),document.querySelector("#home-btn").addEventListener("click",p),document.querySelector(".brand").addEventListener("click",s=>{s.preventDefault(),p()}),window.scrollTo({top:0,behavior:"smooth"})}document.addEventListener("keydown",e=>{t.screen==="quiz"&&(/^[1-4]$/.test(e.key)&&(t.answers[t.current]=Number(e.key)-1,o()),e.key==="Enter"&&t.answers[t.current]!==null&&(t.current===i.length-1?b():(t.current++,o())))});p();
