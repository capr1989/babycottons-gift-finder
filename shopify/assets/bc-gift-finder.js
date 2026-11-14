(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (!root || !root.document) return;
  function mount(scope) {
    scope.querySelectorAll('[data-bc-gift-finder]').forEach(function (el) {
      if (el.dataset.bcReady) return;
      el.dataset.bcReady = 'true';
      const form = el.querySelector('form');
      const status = el.querySelector('[data-bc-status]');
      const grid = el.querySelector('[data-bc-results]');
      let data;
      try {
        data = JSON.parse(el.querySelector('[data-bc-data]').textContent);
        data.sizeMap = JSON.parse(JSON.parse(el.querySelector('[data-bc-size-map]').textContent));
        api.validateMap(data.sizeMap);
        if (data.currency !== 'USD') throw new Error('Unsupported currency');
      } catch (error) {
        status.textContent = el.dataset.configError;
        return;
      }
      let frame;
      function announce(message) {
        root.cancelAnimationFrame(frame);
        status.textContent = '';
        frame = root.requestAnimationFrame(function () { status.textContent = message; });
      }
      function render(matches) {
        grid.replaceChildren();
        matches.forEach(function (match) {
          const card = document.createElement('li');
          card.className = 'bc-gift-finder__card';
          const link = document.createElement('a');
          link.href = api.variantUrl(match.product.url, match.variant.id);
          if (match.product.image) {
            const img = document.createElement('img');
            img.src = match.product.image;
            img.alt = match.product.alt || '';
            img.loading = 'lazy';
            img.width = 600;
            img.height = 600;
            link.append(img);
          }
          const heading = document.createElement('h3');
          heading.className = 'Heading';
          heading.textContent = match.product.title;
          const price = document.createElement('p');
          price.className = 'bc-gift-finder__price';
          price.textContent = match.variant.formattedPrice;
          const size = document.createElement('p');
          size.className = 'bc-gift-finder__variant';
          size.textContent = match.variant.title === 'Default Title' ? '' : match.variant.title;
          const availability = document.createElement('span');
          availability.className = 'bc-gift-finder__availability';
          availability.textContent = el.dataset.available;
          link.append(heading, price, size, availability);
          card.append(link);
          grid.append(card);
        });
        announce(matches.length ? el.dataset.results.replace('[count]', String(matches.length)) : el.dataset.empty);
      }
      form.hidden = false;
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const values = new root.FormData(form);
        render(api.find(data.products, {
          budget: values.get('budget'), age: values.get('age'), category: values.get('category')
        }, data.sizeMap));
      });
      form.addEventListener('reset', function () {
        grid.replaceChildren();
        announce(el.dataset.initial);
      });
      announce(el.dataset.initial);
    });
  }
  if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', function () { mount(root.document); });
  else mount(root.document);
  root.document.addEventListener('shopify:section:load', function (event) { mount(event.target); });
})(typeof window === 'undefined' ? null : window, function () {
  'use strict';
  const ages = ['newborn', '0-3', '3-12', '1-5', '5-10'];
  const categories = ['pajamas', 'clothing', 'blankets', 'accessories', 'sets'];
  const budgets = { '25-50': [2500, 5000], '50-75': [5000, 7500], '75-100': [7500, 10000], '100+': [10000, Infinity] };
  function normalize(value) { return String(value || '').trim().toLowerCase().replace(/\s+/g, ' '); }
  function validateMap(map) {
    if (!map || typeof map !== 'object' || Array.isArray(map)) throw new Error('Invalid size map');
    Object.values(map).forEach(function (list) {
      if (!Array.isArray(list) || list.some(function (age) { return !ages.includes(age); })) throw new Error('Invalid age');
    });
  }
  function ageMatches(product, variant, age, map) {
    if (product.sizeless) return (product.approvedAges || []).includes(age);
    if (!variant.size) return false;
    const size = normalize(variant.size);
    if (!Object.prototype.hasOwnProperty.call(map, size)) return false;
    return Array.isArray(map[size]) && map[size].includes(age);
  }
  function category(product) {
    if (categories.includes(product.category)) return product.category;
    const tags = (product.tags || []).map(normalize);
    const explicit = [
      ['sets', 'regalo-sets'], ['pajamas', 'regalo-pijamas'], ['clothing', 'regalo-ropita'],
      ['blankets', 'regalo-mantas'], ['accessories', 'regalo-accesorios']
    ].filter(function (entry) { return tags.includes(entry[1]); });
    if (explicit.length > 1) return '';
    if (explicit.length === 1) return explicit[0][0];
    const mapping = [
      ['sets', ['set de regalo']],
      ['blankets', ['manta']],
      ['clothing', ['underwear']],
      ['accessories', ['accesorios']],
      ['pajamas', ['pj bebe', 'pj grande', 'pj camison', 'pj short', 'pijama']],
      ['clothing', ['ropa']]
    ];
    const found = mapping.find(function (entry) { return entry[1].some(function (tag) { return tags.includes(tag); }); });
    return found ? found[0] : '';
  }
  function find(products, filters, map) {
    const band = budgets[filters.budget];
    if (!band || !ages.includes(filters.age) || !['surprise'].concat(categories).includes(filters.category)) return [];
    validateMap(map);
    const seen = new Set();
    return (Array.isArray(products) ? products : []).slice(0, 50).reduce(function (results, product) {
      if (seen.has(product.id) || !(product.tags || []).includes('gift_shop')) return results;
      seen.add(product.id);
      const kind = category(product);
      if (!kind || (filters.category !== 'surprise' && filters.category !== kind)) return results;
      const candidates = (product.variants || []).filter(function (variant) {
        return variant.available === true && Number.isSafeInteger(variant.price) && variant.price >= band[0] && variant.price < band[1] && ageMatches(product, variant, filters.age, map);
      }).sort(function (a, b) { return a.price - b.price; });
      if (candidates.length) results.push({ product: product, variant: candidates[0] });
      return results;
    }, []);
  }
  function variantUrl(url, id) {
    if (typeof url !== 'string' || !/^\/(?!\/)/.test(url) || !/^\d+$/.test(String(id))) return '#';
    return url + (url.includes('?') ? '&' : '?') + 'variant=' + encodeURIComponent(String(id));
  }
  return { find: find, category: category, ageMatches: ageMatches, validateMap: validateMap, variantUrl: variantUrl };
});
