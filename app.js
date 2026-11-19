/* ORBIT — Web3 Landing Template
   All interactivity lives here. Zero dependencies.
   Edit the CONFIG object to rebrand: project name, token, APR, allocations. */

'use strict';

var CONFIG = {
  projectName: 'ORBIT',
  tokenSymbol: 'ORB',
  tokenSupply: '1,000,000,000',
  baseApr: 12.4,          // percent, illustrative
  lockBoostPerMonth: 0.15, // extra APR per month beyond month 1
  lockBoostCap: 3.0,       // max extra APR
  allocations: {
    community: 'Community rewards — 400M ORB (40%). Emitted over 8 years to providers and stakers. No pre-mine for insiders.',
    ecosystem: 'Ecosystem fund — 250M ORB (25%). Grants, hackathons and integrations, released by DAO vote only.',
    team: 'Team — 150M ORB (15%). 1-year cliff, then linear vesting over 3 more years. Fully on-chain and public.',
    investors: 'Investors — 120M ORB (12%). 6-month cliff, then linear vesting over 18 months.',
    liquidity: 'Liquidity — 80M ORB (8%). Seeded across DEXs at launch; unused funds return to the DAO treasury.'
  }
};

/* ---------- Theme toggle (persisted) ---------- */
(function theme() {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var saved = null;
  try { saved = window.localStorage.getItem('orbit-theme'); } catch (e) { /* storage unavailable */ }
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  }
  function syncIcon() {
    btn.textContent = root.getAttribute('data-theme') === 'light' ? '☀' : '☾';
  }
  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { window.localStorage.setItem('orbit-theme', next); } catch (e) { /* storage unavailable */ }
    syncIcon();
  });
  syncIcon();
})();

/* ---------- Mobile menu ---------- */
(function menu() {
  var btn = document.getElementById('menuBtn');
  var links = document.getElementById('navLinks');
  btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? '✕' : '☰';
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = '☰';
    }
  });
})();

/* ---------- Copy contract address ---------- */
(function copyAddress() {
  var btn = document.getElementById('copyBtn');
  var addr = document.getElementById('contractAddr').textContent.trim();
  var feedback = document.getElementById('copyFeedback');
  btn.addEventListener('click', function () {
    function done() {
      feedback.textContent = 'Copied ✓';
      setTimeout(function () { feedback.textContent = ''; }, 2000);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = addr;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { feedback.textContent = 'Copy failed'; }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(addr).then(done, fallback);
    } else {
      fallback();
    }
  });
})();

/* ---------- Animated stat counters ---------- */
(function counters() {
  var els = document.querySelectorAll('.count');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.textContent = Number(el.dataset.target).toLocaleString('en-US'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      io.unobserve(el);
      var target = Number(el.dataset.target);
      var start = null;
      var duration = 1200;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-US');
        if (p < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  els.forEach(function (el) { io.observe(el); });
})();

/* ---------- Tokenomics allocation details ---------- */
(function allocations() {
  var note = document.getElementById('allocNote');
  var items = document.querySelectorAll('.alloc-item');
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      note.textContent = CONFIG.allocations[item.dataset.alloc] || '';
    });
  });
})();

/* ---------- Staking calculator ---------- */
(function calculator() {
  var amount = document.getElementById('stakeAmount');
  var months = document.getElementById('stakeMonths');
  var amountOut = document.getElementById('stakeOutput');
  var monthsOut = document.getElementById('monthsOutput');
  var rewardEl = document.getElementById('rewardResult');
  var aprEl = document.getElementById('aprResult');
  var totalEl = document.getElementById('totalResult');

  function fmt(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  function update() {
    var stake = Number(amount.value);
    var m = Number(months.value);
    var boost = Math.min((m - 1) * CONFIG.lockBoostPerMonth, CONFIG.lockBoostCap);
    var apr = CONFIG.baseApr + boost;
    var rewards = stake * (apr / 100) * (m / 12);
    amountOut.textContent = fmt(stake) + ' ' + CONFIG.tokenSymbol;
    monthsOut.textContent = m + (m === 1 ? ' month' : ' months');
    rewardEl.textContent = fmt(rewards) + ' ' + CONFIG.tokenSymbol;
    aprEl.textContent = apr.toFixed(2) + '%';
    totalEl.textContent = fmt(stake + rewards) + ' ' + CONFIG.tokenSymbol;
  }

  amount.addEventListener('input', update);
  months.addEventListener('input', update);
  update();
})();

/* ---------- Scroll reveal ---------- */
(function reveal() {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();
