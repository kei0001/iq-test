(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();function E(e=0){return`<svg class="rotation-diagram" viewBox="0 0 100 100" role="img" aria-label="元の図形を時計回りに${e}度回転した図"><rect x="2" y="2" width="96" height="96" fill="none" stroke="#888" stroke-dasharray="3 3"/><g transform="rotate(${e} 50 50)"><path d="M20 20H36V64H72V80H20Z" fill="#1c1c1a"/><circle cx="76" cy="24" r="7" fill="#ff5f45"/></g><path d="M46 50h8M50 46v8" stroke="#5e7bf7" stroke-width="2"/></svg>`}function y(e){return{category:"空間認識",level:"ROTATION",accent:"#f4b942",prompt:`時計回りに${e}度回転した図は？`,body:`点線の正方形の中心（青い＋）を軸に、黒い図形と赤い点を一緒に時計回りに${e}度回します。鏡映（裏返し）はしません。枠と青い＋は動かしません。`,visual:`<div class="rotation-stage">${E(0)}</div>`,choices:[0,90,180,270].map(E),answer:e/90,explanation:`${e}度は${e/90}回の90度回転です。黒い図形の向きと赤い点の位置が一緒に変わります。${e===180?"180度回転は中心に関する点対称移動で、赤い点は右上から左下へ移ります。":e===90?"赤い点は右上から右下へ移ります。":"赤い点は右上から左上へ移ります。"}線対称の鏡映ではありません。`,rotation:e}}function g(e,r){const n=2*e,i=n-r,t=n+i+e,a=n*100+i*10+e;return{category:"論理推理",level:"DEDUCTION",accent:"#5e7bf7",prompt:"すべての条件を満たす暗証番号は？",body:`3桁の数。百の位は一の位の2倍。十の位は百の位より${r}小さい。3つの数字の合計は${t}。`,choices:[a,a+10,a+1,a-100].map(String),answer:0,explanation:`${a}なら、${n}＝${e}×2、${i}＝${n}−${r}、${n}＋${i}＋${e}＝${t}。すべての条件を満たします。`,constraints:{difference:r,sum:t}}}function c(e,r,n,i){return{body:e,choices:r,answer:n,explanation:i,visual:""}}function N(e){const r=[[c("3 → 7 → 13 → 21 → ？",["29","30","31","33"],2,"差が4、6、8と2ずつ増えるので、次は21＋10＝31。"),c("1 → 4 → 9 → 16 → ？",["20","24","25","32"],2,"1²、2²、3²、4²に続く5²＝25です。")],[c("すべてのミルは赤い。赤いものはすべて軽い。必ず正しいのは？",["すべての軽いものはミル","すべてのミルは軽い","赤いものはすべてミル","ミルは重い"],1,"ミル→赤い→軽いと条件をたどれるので、ミルなら必ず軽いと言えます。"),c("AはBより背が高く、BはCより背が高い。必ず正しいのは？",["Cが最も高い","Bが最も高い","AはCより高い","AとCは同じ高さ"],2,"A＞B＞CなのでAはCより高くなります。")],[c("○ → △ → □ → ○ → △ → ？",["○","△","□","◇"],2,"○・△・□の3つの繰り返しなので、次は□です。"),c("↑ → → → ↓ → ← → ？（矢印の向きは、上・右・下・左の順です）",["↑","→","↓","←"],0,"矢印が毎回時計回りに90度回るので、左の次は上向きです。")],[c("次のうち、長さの単位ではないものは？",["センチメートル","キロメートル","ミリメートル","キログラム"],3,"キログラムは質量の単位で、残り3つは長さの単位です。"),c("次のうち、平面図形ではないものは？",["三角形","円","立方体","正方形"],2,"立方体は立体です。残りは平面図形です。")],[c("2 → 3 → 5 → 8 → 13 → ？",["18","20","21","26"],2,"直前の2項を足します。8＋13＝21。"),c("3 → 6 → 12 → 24 → ？",["30","36","42","48"],3,"毎回2倍するので24×2＝48。")],[y(90),y(270)],[g(3,2),g(4,3)],[c("各行・各列にA・B・Cを1つずつ入れます。上段 A B C ／ 中段 C A B ／ 下段 B C ？",["A","B","C","D"],0,"下段も右列も足りない文字はAです。"),c("各行・各列に1・2・3を1つずつ入れます。上段 2 3 1 ／ 中段 1 2 3 ／ 下段 3 1 ？",["1","2","3","4"],1,"下段も右列も足りない数字は2です。")],[c("「鳥：翼」＝「魚：？」（移動に使う器官の関係）",["うろこ","えら","ひれ","目"],2,"鳥が翼を使って飛ぶように、魚はひれを使って泳ぎます。"),c("「温度：温度計」＝「時間：？」（測る対象と道具の関係）",["時計","定規","はかり","方位磁針"],0,"温度を測るのは温度計、時間を測るのは時計です。")],[c("各組で「左×中央＋2＝右」。2・4・10 ／ 3・5・17 ／ 4・6・？",["24","25","26","28"],2,"指定の規則から4×6＋2＝26。"),c("各組で「左＋中央×2＝右」。2・3・8 ／ 4・5・14 ／ 6・7・？",["19","20","21","26"],1,"指定の規則から6＋7×2＝20。")]];return e.map((n,i)=>[n,...r[i].map(t=>({...n,...t}))].map((t,a)=>({...t,id:`${i}-${a}`})))}function I(e,r){const n=[...e];for(let i=n.length-1;i>0;i--){const t=Math.floor(r()*(i+1));[n[i],n[t]]=[n[t],n[i]]}return n}function T(e,r=[],n=Math.random){const i=new Set(Array.isArray(r)?r:[]);return I(e.map(t=>{const a=t.filter(p=>!i.has(p.id)),o=a.length?a:t,d=o[Math.floor(n()*o.length)],b=I(d.choices.map((p,m)=>m),n);return{...d,choices:b.map(p=>d.choices[p]),answer:b.indexOf(d.answer)}}),n)}const L=[{category:"数的推理",level:"WARM UP",accent:"#ff5f45",prompt:"数列の「？」に入る数字は？",visual:'<div class="sequence"><span>2</span><i>→</i><span>6</span><i>→</i><span>12</span><i>→</i><span>20</span><i>→</i><b>?</b></div>',choices:["28","30","32","36"],answer:1,explanation:"差は +4, +6, +8 と2ずつ増えています。次は +10 なので 20 + 10 = 30。"},{category:"論理推理",level:"LOGIC",accent:"#5e7bf7",prompt:"必ず正しいと言えるものは？",body:"すべてのノルは青い。青いものの一部は丸い。",choices:["すべてのノルは丸い","丸いノルが必ず存在する","青くないノルが存在する","ノルは青い"],answer:3,explanation:"最初の文から「ノルならば青い」だけが必ず成立します。丸い青色とノルが同じとは限りません。"},{category:"図形推理",level:"PATTERN",accent:"#01a878",prompt:"次に来る図形はどれ？",visual:'<div class="shape-sequence"><div class="shape triangle"></div><div class="shape square"></div><div class="shape pentagon">⬟</div><div class="shape mystery">?</div></div>',choices:["● 円","⬢ 六角形","★ 星","◇ ひし形"],answer:1,explanation:"辺の数が3（三角形）、4（四角形）、5（五角形）と増えているため、次は6辺の六角形です。"},{category:"言語推理",level:"WORDS",accent:"#a264d8",prompt:"仲間はずれの言葉は？",choices:["秒","分","時間","メートル"],answer:3,explanation:"秒・分・時間は時間の単位です。メートルだけは長さの単位です。"},{category:"数的推理",level:"SEQUENCE",accent:"#ff5f45",prompt:"数列の「？」に入る数字は？",visual:'<div class="sequence compact"><span>1</span><i>·</i><span>1</span><i>·</i><span>2</span><i>·</i><span>3</span><i>·</i><span>5</span><i>·</i><span>8</span><i>·</i><b>?</b></div>',choices:["11","12","13","15"],answer:2,explanation:"直前の2つを足すフィボナッチ数列です。5 + 8 = 13。"},y(180),g(2,3),{category:"パターン認識",level:"MATRIX",accent:"#01a878",prompt:"空欄に入る記号は？",visual:'<div class="matrix"><span>○</span><span>△</span><span>□</span><span>△</span><span>□</span><span>○</span><span>□</span><span>○</span><b>?</b></div>',choices:["○","△","□","◇"],answer:1,explanation:"各行・各列に ○・△・□ が1つずつ入ります。最後の空欄は△です。"},{category:"言語推理",level:"ANALOGY",accent:"#a264d8",prompt:"同じ関係になる言葉は？",body:"「本：読む」＝「音楽：？」",choices:["書く","聴く","話す","見る"],answer:1,explanation:"本に対する主な行為が「読む」なら、音楽に対する主な行為は「聴く」です。"},{category:"複合推理",level:"FINAL",accent:"#1d1d1b",prompt:"「？」に入る数字は？",visual:'<div class="number-grid"><div><span>3</span><span>5</span><b>16</b></div><div><span>4</span><span>6</span><b>25</b></div><div><span>5</span><span>7</span><b>?</b></div></div>',choices:["30","32","36","42"],answer:2,explanation:"左の数 × 右の数 + 1 の規則です。3×5+1=16、4×6+1=25、5×7+1=36。"}],O=N(L);let l=L,h=[];try{h=JSON.parse(localStorage.getItem("mindprint-last-questions")||"[]")}catch{}const v={arrow:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',clock:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',spark:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"/></svg>',check:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>'},A=document.querySelector("#app");let s={screen:"intro",current:0,answers:Array(l.length).fill(null),seconds:480,timer:null};function $(e,r=""){A.innerHTML=`<div class="noise"></div><main class="app-shell ${r}">${e}</main>`}function f(){s.screen="intro";const e=localStorage.getItem("mindprint-best");$(`
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
        <button class="primary-btn" id="start-btn" type="button">テストをはじめる ${v.arrow}</button>
        <div class="meta-row">
          <span>${v.clock} 約8分</span><span>${v.spark} 全10問</span><span>登録不要</span>
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
  `,"intro"),document.querySelector("#start-btn").addEventListener("click",x),document.querySelector(".brand").addEventListener("click",r=>r.preventDefault())}function x(){clearInterval(s.timer),l=T(O,h),h=l.map(e=>e.id);try{localStorage.setItem("mindprint-last-questions",JSON.stringify(h))}catch{}s={screen:"quiz",current:0,answers:Array(l.length).fill(null),seconds:480,timer:null},u(),s.timer=window.setInterval(()=>{s.seconds--,q(),s.seconds<=0&&S()},1e3)}function w(e){const r=Math.floor(e/60).toString().padStart(2,"0"),n=(e%60).toString().padStart(2,"0");return`${r}:${n}`}function q(){const e=document.querySelector("#timer");e&&(e.textContent=w(Math.max(0,s.seconds)),e.classList.toggle("urgent",s.seconds<=60))}function u(){const e=l[s.current],r=s.answers[s.current],n=(s.current+1)/l.length*100;$(`
    <nav class="quiz-nav">
      <button class="brand brand-btn" id="exit-btn" type="button" aria-label="テストを終了してホームへ"><span>M</span>MINDPRINT</button>
      <div class="quiz-progress"><div><b>${String(s.current+1).padStart(2,"0")}</b> / ${String(l.length).padStart(2,"0")}</div><span><i style="width:${n}%"></i></span></div>
      <div class="timer-wrap">${v.clock}<small>TIME LEFT</small><b id="timer">${w(s.seconds)}</b></div>
    </nav>
    <section class="question-layout" style="--accent:${e.accent}">
      <aside class="question-rail">
        <span>QUESTION</span><b>${String(s.current+1).padStart(2,"0")}</b>
        <div class="rail-line"></div><small>${e.level}</small>
      </aside>
      <article class="question-card">
        <div class="question-kicker"><i></i>${e.category}</div>
        <h2>${e.prompt}</h2>
        ${e.body?`<p class="question-body">${e.body}</p>`:""}
        ${e.visual||""}
        <div class="choices" role="radiogroup" aria-label="回答の選択肢">
          ${e.choices.map((i,t)=>`<button type="button" class="choice ${r===t?"selected":""}" data-index="${t}" role="radio" aria-checked="${r===t}"><span>${String.fromCharCode(65+t)}</span><b>${i}</b><i>${v.check}</i></button>`).join("")}
        </div>
        <div class="question-actions">
          <button class="text-btn" id="prev-btn" type="button" ${s.current===0?"disabled":""}>← 前の問題</button>
          <button class="next-btn" id="next-btn" type="button" ${r===null?"disabled":""}>${s.current===l.length-1?"結果を見る":"次の問題"} ${v.arrow}</button>
        </div>
      </article>
      <aside class="question-map" aria-label="問題一覧">
        ${l.map((i,t)=>`<button type="button" data-jump="${t}" class="${t===s.current?"active":""} ${s.answers[t]!==null?"done":""}" aria-label="問題${t+1}">${String(t+1).padStart(2,"0")}</button>`).join("")}
      </aside>
    </section>
  `,"quiz"),document.querySelectorAll(".choice").forEach(i=>i.addEventListener("click",()=>{s.answers[s.current]=Number(i.dataset.index),u()})),document.querySelector("#prev-btn").addEventListener("click",()=>{s.current--,u()}),document.querySelector("#next-btn").addEventListener("click",()=>{s.current===l.length-1?S():(s.current++,u())}),document.querySelectorAll("[data-jump]").forEach(i=>i.addEventListener("click",()=>{s.current=Number(i.dataset.jump),u()})),document.querySelector("#exit-btn").addEventListener("click",()=>{clearInterval(s.timer),f()})}function C(){return s.answers.reduce((e,r,n)=>e+(r===l[n].answer?1:0),0)}function R(e){return e>=9?{iq:"130+",title:"異次元のパターンハンター",text:"複雑な情報から規則性を素早く見つける力が際立っています。未知の問題でも、構造を捉えて突破口を作れるタイプです。"}:e>=7?{iq:"115–129",title:"鋭敏なロジックビルダー",text:"論理と直感のバランスが良く、複数の手がかりを整理して答えにたどり着くのが得意です。"}:e>=5?{iq:"100–114",title:"柔軟なアイデアナビゲーター",text:"標準以上の推理力を持ち、視点を切り替えながら着実に問題を解けるタイプです。"}:e>=3?{iq:"85–99",title:"じっくり型のシンカー",text:"慎重に情報を扱うタイプです。得意分野を磨くと、さらに思考のスピードと精度が伸びていきます。"}:{iq:"〜84",title:"自由な発想のエクスプローラー",text:"定型にとらわれない発想の持ち主です。今回は問題との相性もありそう。解説を見てもう一度挑戦してみましょう。"}}function S(){clearInterval(s.timer);const e=C(),r=Number(localStorage.getItem("mindprint-best")||0);e>r&&localStorage.setItem("mindprint-best",String(e)),s.screen="result";const n=R(e),i=Math.round(e/l.length*360);$(`
    <nav class="topbar result-nav"><a class="brand" href="#"><span>M</span>MINDPRINT<sup>RESULT</sup></a><div class="nav-note">COGNITIVE<br>FIELD TEST / 01</div></nav>
    <section class="result-hero">
      <div class="result-copy">
        <div class="eyebrow"><span>RESULT</span> YOUR MINDPRINT</div>
        <p class="result-overline">YOUR THINKING TYPE IS...</p>
        <h1>${n.title}</h1>
        <p>${n.text}</p>
        <div class="score-strip"><div><small>推定IQレンジ</small><strong>${n.iq}</strong></div><div><small>正解数</small><strong>${e}<em> / ${l.length}</em></strong></div><div><small>所要時間</small><strong>${w(480-s.seconds)}</strong></div></div>
        <button class="review-jump" id="review-jump" type="button">問題を振り返る <span>↓</span></button>
      </div>
      <div class="score-orbit" style="--score-angle:${i}deg"><div><small>SCORE</small><strong>${e*10}</strong><span>/ 100</span></div></div>
    </section>
    <section class="review-section">
      <div class="review-heading"><span>02</span><div><small>ANSWER REVIEW</small><h2>思考の軌跡を<br>振り返る。</h2></div></div>
      <div class="review-tools"><p>カードを開くと、出題内容とすべての選択肢を確認できます。</p><button id="open-all-reviews" type="button">すべて開く</button></div>
      <div class="review-grid">
        ${l.map((t,a)=>{const o=s.answers[a]===t.answer;return`<article class="review-card ${o?"correct":"wrong"}" style="--accent:${t.accent}">
            <button class="review-summary" type="button" data-review="${a}" aria-expanded="false">
              <span class="review-number">Q${String(a+1).padStart(2,"0")}</span>
              <span class="review-status">${o?"CORRECT":"REVIEW"}</span>
              <strong>${t.prompt}</strong>
              <span class="review-answer">あなたの回答 <b>${s.answers[a]===null?"未回答":t.choices[s.answers[a]]}</b></span>
              <i>＋</i>
            </button>
            <div class="review-detail" id="review-detail-${a}">
              <div class="review-question">
                <small>${t.category} / ${t.level}</small>
                ${t.body?`<p class="review-body">${t.body}</p>`:""}
                ${t.visual||""}
                <div class="review-choices">
                  ${t.choices.map((d,b)=>{const p=b===t.answer,m=b===s.answers[a];return`<div class="review-choice ${p?"is-correct":""} ${m?"is-selected":""}"><span>${String.fromCharCode(65+b)}</span><b>${d}</b>${p?"<em>正解</em>":""}${m&&!p?"<em>あなたの回答</em>":""}</div>`}).join("")}
                </div>
              </div>
              <div class="review-explanation"><small>EXPLANATION</small><p>${t.explanation}</p></div>
            </div>
          </article>`}).join("")}
      </div>
      <div class="result-actions"><button class="primary-btn" id="retry-btn" type="button">もう一度挑戦する ${v.arrow}</button><button class="text-btn" id="home-btn" type="button">トップに戻る</button></div>
      <p class="result-disclaimer">この結果は簡易問題に基づく目安です。正式な知能指数の測定には、専門家による標準化検査が必要です。</p>
    </section>
  `,"result"),document.querySelector("#retry-btn").addEventListener("click",x),document.querySelector("#home-btn").addEventListener("click",f),document.querySelector("#review-jump").addEventListener("click",()=>document.querySelector(".review-section").scrollIntoView({behavior:"smooth"})),document.querySelectorAll("[data-review]").forEach(t=>t.addEventListener("click",()=>{const o=t.closest(".review-card").classList.toggle("open");t.setAttribute("aria-expanded",String(o))})),document.querySelector("#open-all-reviews").addEventListener("click",t=>{const a=[...document.querySelectorAll(".review-card")],o=a.some(d=>!d.classList.contains("open"));a.forEach(d=>{d.classList.toggle("open",o),d.querySelector(".review-summary").setAttribute("aria-expanded",String(o))}),t.currentTarget.textContent=o?"すべて閉じる":"すべて開く"}),document.querySelector(".brand").addEventListener("click",t=>{t.preventDefault(),f()}),window.scrollTo({top:0,behavior:"smooth"})}document.addEventListener("keydown",e=>{s.screen==="quiz"&&(/^[1-4]$/.test(e.key)&&(s.answers[s.current]=Number(e.key)-1,u()),e.key==="Enter"&&s.answers[s.current]!==null&&(s.current===l.length-1?S():(s.current++,u())))});f();
