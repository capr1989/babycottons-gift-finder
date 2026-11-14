'use strict';
const assert = require('node:assert/strict');
const { find, category, variantUrl, validateMap } = require('../shopify/assets/bc-gift-finder.js');
let passed = 0;
function test(name, fn) { fn(); passed++; console.log('PASS ' + name); }
const map = { nb: ['newborn'], '3m': ['0-3'], '6m': ['3-12'], '12m': ['1-5'], '6t': ['5-10'] };
function product(overrides = {}) { return { id: '1', tags: ['gift_shop', 'pj bebe'], url: '/products/gift', variants: [{ id: '123', available: true, price: 3000, size: '3m' }], ...overrides }; }
const filters = { budget: '25-50', age: '0-3', category: 'pajamas' };
test('budget lower inclusive, upper exclusive at each boundary', () => {
  for (const [price, expected] of [[2499, null], [2500, '25-50'], [4999, '25-50'], [5000, '50-75'], [7499, '50-75'], [7500, '75-100'], [9999, '75-100'], [10000, '100+'], [990000, '100+']]) {
    const p = product({ variants: [{ id: '123', available: true, price, size: '3m' }] });
    for (const budget of ['25-50', '50-75', '75-100', '100+']) assert.equal(find([p], { ...filters, budget }, map).length, Number(budget === expected));
  }
});
test('all five age groups use exact normalized variant size', () => {
  for (const [size, age] of Object.entries({ NB: 'newborn', ' 3M ': '0-3', '6m': '3-12', '12m': '1-5', '6t': '5-10' })) {
    assert.equal(find([product({ variants: [{ id: '123', available: true, price: 3000, size }] })], { ...filters, age }, map).length, 1);
  }
});
test('wrong age excluded', () => assert.equal(find([product()], { ...filters, age: '5-10' }, map).length, 0));
test('wrong category excluded', () => assert.equal(find([product()], { ...filters, category: 'blankets' }, map).length, 0));
test('surprise respects age and price', () => assert.equal(find([product()], { ...filters, category: 'surprise' }, map).length, 1));
test('unknown category excluded even in surprise', () => assert.equal(find([product({ tags: ['gift_shop'] })], { ...filters, category: 'surprise' }, map).length, 0));
test('all sold-out variants excluded', () => assert.equal(find([product({ variants: [{ id: '123', available: false, price: 3000, size: '3m' }] })], filters, map).length, 0));
test('age, price and availability must match on same variant', () => assert.equal(find([product({ variants: [{ id: '123', available: true, price: 9000, size: '3m' }, { id: '124', available: true, price: 3000, size: '6t' }, { id: '125', available: false, price: 3000, size: '3m' }] })], filters, map).length, 0));
test('lowest priced qualifying variant chosen', () => {
  const p = product({ variants: [{ id: '123', available: true, price: 4000, size: '3m' }, { id: '124', available: true, price: 3000, size: '3m' }] });
  assert.equal(find([p], filters, map)[0].variant.id, '124');
});
test('sizeless product requires explicit age approval', () => {
  const p = product({ sizeless: true, approvedAges: [], variants: [{ id: '123', available: true, price: 3000, size: '' }] });
  assert.equal(find([p], filters, map).length, 0);
  assert.equal(find([{ ...p, approvedAges: ['0-3'] }], filters, map).length, 1);
});
test('numeric jewelry size never guessed as age', () => assert.equal(find([product({ variants: [{ id: '123', available: true, price: 3000, size: '6' }] })], filters, map).length, 0));
test('ambiguous SO and premature DO are not guessed', () => {
  for (const size of ['So', 'DO (prematuro)', 'TU', 'ONE SIZE']) assert.equal(find([product({ variants: [{ id: '123', available: true, price: 3000, size }] })], filters, map).length, 0);
});
test('requires exact gift_shop eligibility', () => {
  for (const tag of ['gift_shops', 'guia-regalos', 'GIFT_SHOP']) assert.equal(find([product({ tags: [tag, 'pj bebe'] })], filters, map).length, 0);
});
test('deduplicates product', () => assert.equal(find([product(), product()], filters, map).length, 1));
test('empty input has no results', () => assert.deepEqual(find([], filters, map), []));
test('invalid filters fail closed', () => {
  for (const patch of [{ age: '' }, { budget: '' }, { category: '' }, { budget: '__proto__' }]) assert.deepEqual(find([product()], { ...filters, ...patch }, map), []);
});
test('invalid size map rejected', () => {
  for (const value of [null, [], { nb: 'newborn' }, { nb: ['invalid'] }]) assert.throws(() => validateMap(value));
});
test('at most first 50 curated products considered', () => assert.equal(find(Array.from({ length: 60 }, (_, i) => product({ id: String(i) })), filters, map).length, 50));
test('category priority distinguishes accessories and underwear from broad pajama tags', () => {
  assert.equal(category(product({ tags: ['pj bebe', 'accesorios'] })), 'accessories');
  assert.equal(category(product({ tags: ['pj grande', 'underwear'] })), 'clothing');
});
test('explicit category override supported', () => assert.equal(category(product({ category: 'sets' })), 'sets'));
test('specific gift tags override legacy broad tags; conflicting explicit tags excluded', () => {
  assert.equal(category(product({ tags: ['gift_shop', 'regalo-mantas', 'accesorios'] })), 'blankets');
  assert.equal(category(product({ tags: ['gift_shop', 'manta', 'accesorios'] })), 'blankets');
  assert.equal(category(product({ tags: ['gift_shop', 'regalo-mantas', 'regalo-pijamas'] })), '');
});
test('variant links preserve variant ID without numeric rounding', () => assert.equal(variantUrl('/products/gift', '47715234447592'), '/products/gift?variant=47715234447592'));
test('localized product paths and query retained', () => assert.equal(variantUrl('/es/products/gift?a=1', '123'), '/es/products/gift?a=1&variant=123'));
test('unsafe URLs and malformed variant IDs fail closed', () => {
  for (const url of ['javascript:alert(1)', '//evil.example', 'https://evil.example']) assert.equal(variantUrl(url, '123'), '#');
  assert.equal(variantUrl('/products/gift', '123x'), '#');
});
test('current pillow prices never fit requested budgets', () => assert.equal(find([product({ variants: [{ id: '123', available: true, price: 2000, size: '3m' }] })], filters, map).length, 0));
console.log(`${passed} tests passed`);
