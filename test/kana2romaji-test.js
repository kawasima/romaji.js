var assert = require('assert');
var kana2romaji = require('../src/kana2romaji');

console.log('Checking module');
assert.ok(kana2romaji);

console.log('Testing kana2romaji');
assert.equal(kana2romaji.kana2romaji("ハットリ ハンゾウ"), "hattori hanzo");
assert.equal(kana2romaji.kana2romaji("シンバシ"), "shimbashi");
assert.equal(kana2romaji.kana2romaji("オオコウチ"), "okochi");
assert.equal(kana2romaji.kana2romaji("ジェームスディーン"), "jiemusudein");
assert.equal(kana2romaji.kana2romaji("マンギョンボンゴウ"), "mangyombongo");
assert.equal(kana2romaji.kana2romaji("ミャニュフェスチョ"), "myanyufuesucho");
