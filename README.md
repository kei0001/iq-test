# MINDPRINT — IQ CHALLENGE

ブラウザで楽しめる、全10問のインタラクティブIQチャレンジです。

## Features

- 数列・論理・図形・言語・空間認識の30問から毎回10問（前回の問題を避け、出題順・選択肢をシャッフル）
- 8分タイマーと進捗表示
- 推定IQレンジと思考タイプの結果表示
- 全問題の回答解説
- 自己ベストのローカル保存
- PC・スマートフォン対応

> このテストは娯楽・自己理解を目的とした簡易テストです。正式なIQ検査ではありません。

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Problem validation

```bash
node --test scripts/questions.test.mjs
```

暗証番号の唯一解、回転図形、出題バランス、選択肢の並べ替え後の採点を検証します。
収益化の検討メモは `PRODUCT_NOTES.md` を参照。
