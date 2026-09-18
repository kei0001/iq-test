export function rotationGraphic(angle = 0) {
  return `<svg class="rotation-diagram" viewBox="0 0 100 100" role="img" aria-label="元の図形を時計回りに${angle}度回転した図"><rect x="2" y="2" width="96" height="96" fill="none" stroke="#888" stroke-dasharray="3 3"/><g transform="rotate(${angle} 50 50)"><path d="M20 20H36V64H72V80H20Z" fill="#1c1c1a"/><circle cx="76" cy="24" r="7" fill="#ff5f45"/></g><path d="M46 50h8M50 46v8" stroke="#5e7bf7" stroke-width="2"/></svg>`;
}

export function rotationQuestion(angle) {
  return {
    category: '空間認識', level: 'ROTATION', accent: '#f4b942',
    prompt: `時計回りに${angle}度回転した図は？`,
    body: `点線の正方形の中心（青い＋）を軸に、黒い図形と赤い点を一緒に時計回りに${angle}度回します。鏡映（裏返し）はしません。枠と青い＋は動かしません。`,
    visual: `<div class="rotation-stage">${rotationGraphic(0)}</div>`,
    choices: [0, 90, 180, 270].map(rotationGraphic), answer: angle / 90,
    explanation: `${angle}度は${angle / 90}回の90度回転です。黒い図形の向きと赤い点の位置が一緒に変わります。${angle === 180 ? '180度回転は中心に関する点対称移動で、赤い点は右上から左下へ移ります。' : angle === 90 ? '赤い点は右上から右下へ移ります。' : '赤い点は右上から左上へ移ります。'}線対称の鏡映ではありません。`,
    rotation: angle
  };
}

export function pinQuestion(unit, difference) {
  const hundred = 2 * unit;
  const ten = hundred - difference;
  const sum = hundred + ten + unit;
  const value = hundred * 100 + ten * 10 + unit;
  return {
    category: '論理推理', level: 'DEDUCTION', accent: '#5e7bf7',
    prompt: 'すべての条件を満たす暗証番号は？',
    body: `3桁の数。百の位は一の位の2倍。十の位は百の位より${difference}小さい。3つの数字の合計は${sum}。`,
    choices: [value, value + 10, value + 1, value - 100].map(String), answer: 0,
    explanation: `${value}なら、${hundred}＝${unit}×2、${ten}＝${hundred}−${difference}、${hundred}＋${ten}＋${unit}＝${sum}。すべての条件を満たします。`,
    constraints: { difference, sum }
  };
}

function textQuestion(body, choices, answer, explanation) {
  return { body, choices, answer, explanation, visual: '' };
}

export function buildPools(base) {
  const variants = [
    [textQuestion('3 → 7 → 13 → 21 → ？', ['29', '30', '31', '33'], 2, '差が4、6、8と2ずつ増えるので、次は21＋10＝31。'), textQuestion('1 → 4 → 9 → 16 → ？', ['20', '24', '25', '32'], 2, '1²、2²、3²、4²に続く5²＝25です。')],
    [textQuestion('すべてのミルは赤い。赤いものはすべて軽い。必ず正しいのは？', ['すべての軽いものはミル', 'すべてのミルは軽い', '赤いものはすべてミル', 'ミルは重い'], 1, 'ミル→赤い→軽いと条件をたどれるので、ミルなら必ず軽いと言えます。'), textQuestion('AはBより背が高く、BはCより背が高い。必ず正しいのは？', ['Cが最も高い', 'Bが最も高い', 'AはCより高い', 'AとCは同じ高さ'], 2, 'A＞B＞CなのでAはCより高くなります。')],
    [textQuestion('○ → △ → □ → ○ → △ → ？', ['○', '△', '□', '◇'], 2, '○・△・□の3つの繰り返しなので、次は□です。'), textQuestion('↑ → → → ↓ → ← → ？（矢印の向きは、上・右・下・左の順です）', ['↑', '→', '↓', '←'], 0, '矢印が毎回時計回りに90度回るので、左の次は上向きです。')],
    [textQuestion('次のうち、長さの単位ではないものは？', ['センチメートル', 'キロメートル', 'ミリメートル', 'キログラム'], 3, 'キログラムは質量の単位で、残り3つは長さの単位です。'), textQuestion('次のうち、平面図形ではないものは？', ['三角形', '円', '立方体', '正方形'], 2, '立方体は立体です。残りは平面図形です。')],
    [textQuestion('2 → 3 → 5 → 8 → 13 → ？', ['18', '20', '21', '26'], 2, '直前の2項を足します。8＋13＝21。'), textQuestion('3 → 6 → 12 → 24 → ？', ['30', '36', '42', '48'], 3, '毎回2倍するので24×2＝48。')],
    [rotationQuestion(90), rotationQuestion(270)],
    [pinQuestion(3, 2), pinQuestion(4, 3)],
    [textQuestion('各行・各列にA・B・Cを1つずつ入れます。上段 A B C ／ 中段 C A B ／ 下段 B C ？', ['A', 'B', 'C', 'D'], 0, '下段も右列も足りない文字はAです。'), textQuestion('各行・各列に1・2・3を1つずつ入れます。上段 2 3 1 ／ 中段 1 2 3 ／ 下段 3 1 ？', ['1', '2', '3', '4'], 1, '下段も右列も足りない数字は2です。')],
    [textQuestion('「鳥：翼」＝「魚：？」（移動に使う器官の関係）', ['うろこ', 'えら', 'ひれ', '目'], 2, '鳥が翼を使って飛ぶように、魚はひれを使って泳ぎます。'), textQuestion('「温度：温度計」＝「時間：？」（測る対象と道具の関係）', ['時計', '定規', 'はかり', '方位磁針'], 0, '温度を測るのは温度計、時間を測るのは時計です。')],
    [textQuestion('各組で「左×中央＋2＝右」。2・4・10 ／ 3・5・17 ／ 4・6・？', ['24', '25', '26', '28'], 2, '指定の規則から4×6＋2＝26。'), textQuestion('各組で「左＋中央×2＝右」。2・3・8 ／ 4・5・14 ／ 6・7・？', ['19', '20', '21', '26'], 1, '指定の規則から6＋7×2＝20。')]
  ];
  return base.map((q, group) => [q, ...variants[group].map(v => ({ ...q, ...v }))].map((v, index) => ({ ...v, id: `${group}-${index}` })));
}

function shuffled(values, random) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createQuiz(pools, previous = [], random = Math.random) {
  const seen = new Set(Array.isArray(previous) ? previous : []);
  return shuffled(pools.map(pool => {
    const fresh = pool.filter(q => !seen.has(q.id));
    const candidates = fresh.length ? fresh : pool;
    const q = candidates[Math.floor(random() * candidates.length)];
    const order = shuffled(q.choices.map((_, i) => i), random);
    return { ...q, choices: order.map(i => q.choices[i]), answer: order.indexOf(q.answer) };
  }), random);
}
