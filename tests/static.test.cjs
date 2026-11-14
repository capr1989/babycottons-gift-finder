'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const root = path.join(__dirname, '..', 'shopify');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
new vm.Script(read('assets/bc-gift-finder.js'));
const section = read('sections/bc-gift-finder.liquid');
const schema = JSON.parse(section.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
const template = JSON.parse(read('templates/page.gift-finder.json'));
assert.equal(schema.max_blocks, 50);
assert(schema.settings.length <= 50);
assert.equal(new Set(schema.settings.map(s => s.id)).size, schema.settings.length);
const ids = new Set(schema.settings.map(s => s.id));
for (const match of section.matchAll(/section\.settings\.([a-z_]+)/g)) assert(ids.has(match[1]), match[1]);
for (const type of ['budget', 'age', 'category']) assert(section.includes(`name="${type}"`));
assert(section.includes("candidate.tags contains 'gift_shop'"));
assert(section.includes("replace: '<', '\\u003c'"));
assert(section.includes('role="status"'));
assert(section.includes('<noscript>'));
assert.equal(template.sections.main.type, 'bc-gift-finder');
assert.deepEqual(template.sections.main.block_order, Object.keys(template.sections.main.blocks));
for (const file of ['sections/bc-gift-finder.liquid', 'snippets/bc-gift-data.liquid']) {
  const stack = [];
  for (const match of read(file).matchAll(/{%-?\s*(\w+)[\s\S]*?-?%}/g)) {
    const token = match[1];
    if (['if', 'unless', 'for', 'capture', 'schema', 'doc'].includes(token)) stack.push(token);
    if (token.startsWith('end')) assert.equal(stack.pop(), token.slice(3), file + ': ' + token);
  }
  assert.equal(stack.length, 0, file);
}
const css = read('assets/bc-gift-finder.css');
for (const rule of css.matchAll(/([^{}]+)\{/g)) {
  const selector = rule[1].trim();
  assert(selector.startsWith('.bc-gift-finder') || selector.startsWith('@media'), selector);
}
const rgb = hex => hex.match(/\w\w/g).map(x => parseInt(x, 16) / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4);
const luminance = hex => rgb(hex).reduce((a, x, i) => a + x * [.2126, .7152, .0722][i], 0);
assert.equal(schema.settings.find(s => s.id === 'ink').default, '#a7c2c5');
assert.equal(schema.settings.find(s => s.id === 'surface').default, '#ffffff');
assert(css.includes('--bc-control:#567477'));
assert((luminance('ffffff') + .05) / (luminance('567477') + .05) >= 3);
console.log('PASS JS syntax, section schema, template, settings wiring, Liquid block balance, CSS scope, requested colors, control contrast and JSON escaping');
console.log('NOTE requested text color on white contrast: ' + ((luminance('ffffff') + .05) / (luminance('a7c2c5') + .05)).toFixed(2) + ':1; below WCAG AA text minimum');

