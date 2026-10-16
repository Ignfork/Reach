/* Reach — Solana memecoin terminal (concept demo). All data is fictional. */
var RCH = (function () {
  var SUB = '₀₁₂₃₄₅₆₇₈₉';
  var B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  function rng(seed) { var a = seed >>> 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function hs(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function usd(n) { if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'; if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M'; if (n >= 1e3) return '$' + (n / 1e3).toFixed(1) + 'K'; return '$' + n.toFixed(0); }
  function pct(n) { return (n > 0 ? '▲ +' : n < 0 ? '▼ ' : '') + n.toFixed(1) + '%'; }
  function pctP(n) { return (n > 0 ? '+' : '') + n.toFixed(1) + '%'; }
  function age(m) { if (m < 60) return m + 'm'; if (m < 1440) return Math.floor(m / 60) + 'h'; return Math.floor(m / 1440) + 'd'; }
  function price(p) { if (p >= 1) return '$' + p.toFixed(2); if (p >= 0.01) return '$' + p.toFixed(4); var s = p.toFixed(14).split('.')[1]; var z = 0; while (s[z] === '0') z++; return '$0.0' + String(z).split('').map(function (d) { return SUB[+d]; }).join('') + s.slice(z, z + 4); }
  function mint(t) { var r = rng(hs(t + ':mint')); var s = ''; for (var i = 0; i < 40; i++) s += B58[Math.floor(r() * 58)]; return s + 'demo'; }
  var PAL = [['#b8ff3c', '#142010'], ['#7ef2b8', '#0d1d16'], ['#c9f27a', '#181e0e'], ['#5fd6a0', '#0c1913'], ['#e3ffa8', '#1a1f10'], ['#93b39a', '#121812']];
  function ident(t) { var r = rng(hs(t)); var p = PAL[hs(t + 'p') % PAL.length]; var g = []; for (var y = 0; y < 5; y++) { var row = []; for (var x = 0; x < 3; x++) row.push(r() > 0.48); for (var x2 = 0; x2 < 5; x2++) { var on = row[x2 < 3 ? x2 : 4 - x2]; g.push(on ? (x2 === 2 && y === 2 ? '#060807' : p[0]) : 'transparent'); } } return { cells: g, fg: p[0], bg: p[1] }; }
  function walk(t, ch) { var r = rng(hs(t + ':spark')); var v = [0], x = 0; for (var i = 1; i < 28; i++) { x += (r() - 0.5) * 1.6; v.push(x); } var lin = ch / 100 * 6; v = v.map(function (y, i) { return y + lin * (i / 27) * 3; }); var mn = Math.min.apply(null, v), mx = Math.max.apply(null, v); return v.map(function (y) { return (y - mn) / ((mx - mn) || 1); }); }
  function pts(v, w, h, pad) { return v.map(function (y, i) { return (i / (v.length - 1) * w).toFixed(1) + ',' + (pad + (1 - y) * (h - pad * 2)).toFixed(1); }).join(' '); }
  var RAW = [
    ['Moss Gremlin', 'MOSSG', 3180, 4.21e6, 412e3, 3.9e6, 4.2, 38.2, 22, true, true, 'burned', 8412, 98],
    ['Byte Frog', 'BFROG', 380, 812e3, 96e3, 2.4e6, 12.8, 214.5, 41, true, true, 'burned', 2190, 95],
    ['Lil Lantern', 'LANTRN', 8640, 11.6e6, 1.02e6, 5.1e6, -1.4, 9.7, 18, true, true, 'burned', 21033, 83],
    ['Cosmic Clam', 'CLAM', 95, 188e3, 31e3, 640e3, 27.3, 61.0, 58, false, true, 'unlocked', 611, 90],
    ['Sol Possum', 'POSUM', 20160, 27.4e6, 2.3e6, 8.8e6, 0.6, -4.1, 15, true, true, 'burned', 40512, 76],
    ['Glitch Goose', 'GOOSE', 1100, 1.94e6, 205e3, 3.2e6, -3.9, 72.4, 33, true, false, 'locked', 4402, 88],
    ['Turbo Snail', 'SNAIL', 41, 92e3, 18e3, 310e3, 44.0, 44.0, 63, false, false, 'unlocked', 214, 79],
    ['Pixel Pug', 'PPUG', 43200, 54.8e6, 4.1e6, 6.2e6, -0.8, -11.6, 12, true, true, 'burned', 66120, 70],
    ['Neon Newt', 'NEWT', 720, 640e3, 74e3, 1.1e6, 6.1, -18.3, 37, true, true, 'locked', 1870, 74],
    ['Couch Wizard', 'WIZRD', 5760, 3.3e6, 288e3, 1.9e6, 2.2, 15.9, 26, true, true, 'burned', 7310, 81],
    ['Ramen Raccoon', 'RAMEN', 210, 402e3, 52e3, 1.6e6, -6.4, 128.0, 44, true, true, 'burned', 1302, 86],
    ['Orbit Ferret', 'FERRET', 12960, 7.9e6, 640e3, 2.7e6, 1.1, -7.2, 21, true, true, 'burned', 15770, 72],
    ['Duckstack', 'DSTK', 1300, 1.2e6, 118e3, 2.2e6, 3.3, -22.8, 39, true, false, 'locked', 3051, 77],
    ['Bit Badger', 'BADGR', 86400, 88.2e6, 6.6e6, 12.4e6, 0.3, 3.4, 10, true, true, 'burned', 91400, 68],
    ['Gloomy Toad', 'GLOOM', 500, 254e3, 40e3, 980e3, -9.1, -31.5, 52, true, true, 'unlocked', 980, 66],
    ['Lunar Cabbage', 'CABBG', 4320, 2.6e6, 230e3, 1.4e6, 8.8, 26.1, 29, true, true, 'burned', 5530, 80]
  ];
  var TOKENS = RAW.map(function (r) {
    var t = { name: r[0], ticker: r[1], age: r[2], mcap: r[3], liq: r[4], vol: r[5], ch1: r[6], ch24: r[7], top10: r[8], mintRev: r[9], freezeRev: r[10], lp: r[11], holders: r[12], trend: r[13] };
    t.price = t.mcap / 1e9; t.mint = mint(t.ticker); var id = ident(t.ticker); t.cells = id.cells; t.bg = id.bg; t.sp = walk(t.ticker, t.ch24); t.spark = pts(t.sp, 80, 26, 3);
    return t;
  });
  function signals(t) {
    var L = [];
    var lv = t.liq >= 250e3 ? 'clear' : t.liq >= 50e3 ? 'watch' : 'flag';
    L.push({ k: 'Liquidity', v: usd(t.liq), st: lv, note: lv === 'clear' ? 'Pool depth can absorb ordinary-size trades.' : lv === 'watch' ? 'Moderate depth — larger orders move the price.' : 'Thin pool — small orders swing the price hard.', m: Math.max(4, Math.min(100, t.liq / 1e6 * 100)) });
    var ratio = t.liq / t.mcap * 100;
    L.push({ k: 'Liquidity / market cap', v: ratio.toFixed(1) + '%', st: ratio >= 8 ? 'clear' : ratio >= 4 ? 'watch' : 'flag', note: 'A low ratio means the quoted cap rests on a small pool.', m: Math.min(100, ratio * 5) });
    L.push({ k: 'Top 10 holders', v: t.top10 + '%', st: t.top10 < 25 ? 'clear' : t.top10 <= 45 ? 'watch' : 'flag', note: 'Share of supply in the ten largest wallets, pools excluded.', m: t.top10 });
    L.push({ k: 'Mint authority', v: t.mintRev ? 'Revoked' : 'Active', st: t.mintRev ? 'clear' : 'flag', note: t.mintRev ? 'No wallet can create new supply.' : 'A wallet can still create new tokens.', m: t.mintRev ? 100 : 10 });
    L.push({ k: 'Freeze authority', v: t.freezeRev ? 'Revoked' : 'Active', st: t.freezeRev ? 'clear' : 'flag', note: t.freezeRev ? 'Holder accounts cannot be frozen.' : 'A wallet can freeze holder token accounts.', m: t.freezeRev ? 100 : 10 });
    var lpS = t.lp === 'burned' ? 'clear' : t.lp === 'locked' ? 'watch' : 'flag';
    L.push({ k: 'LP tokens', v: t.lp === 'burned' ? 'Burned' : t.lp === 'locked' ? 'Locked' : 'Unlocked', st: lpS, note: lpS === 'clear' ? 'Pool liquidity cannot be withdrawn by the deployer.' : lpS === 'watch' ? 'Locked for now — check the unlock date on the locker.' : 'The liquidity provider can pull the pool.', m: lpS === 'clear' ? 100 : lpS === 'watch' ? 55 : 10 });
    L.push({ k: 'Pair age', v: age(t.age), st: t.age > 4320 ? 'clear' : t.age >= 360 ? 'watch' : 'flag', note: 'Newer pairs have less trading history to read.', m: Math.max(3, Math.min(100, t.age / 43.2)) });
    L.forEach(function (g) { g.stl = g.st.toUpperCase(); g.m = Math.round(g.m); });
    return L;
  }
  function find(q) { q = (q || '').trim().replace(/^\$/, ''); if (!q) return []; var lq = q.toLowerCase(); return TOKENS.filter(function (t) { return t.ticker.toLowerCase().indexOf(lq) === 0 || t.name.toLowerCase().indexOf(lq) >= 0 || t.mint === q; }); }
  function byTicker(k) { k = (k || '').replace(/^\$/, '').toUpperCase(); for (var i = 0; i < TOKENS.length; i++) if (TOKENS[i].ticker === k) return TOKENS[i]; return null; }
  var C = { g: '#b8ff3c', G: '#8e9b6c', k: '#7ef2b8', d: '#0e1a12', L: '#b8ff3c', s: '#93b39a' };
  function sprite(rows) { var out = []; rows.forEach(function (r) { for (var i = 0; i < r.length; i++) out.push(C[r[i]] || 'transparent'); }); return out; }
  var SA = sprite(['....gg......', '.....G......', '.....G......', '..kkkkkkkk..', '.kddddddddk.', '.kdLLddLLdk.', '.kdLLddLLdk.', '.kddddddddk.', '.kddLLLLddk.', '.kddddddddk.', '..kkkkkkkk..', '...ss..ss...']);
  var SB = sprite(['......gg....', '.....G......', '.....G......', '..kkkkkkkk..', '.kddddddddk.', '.kddddddddk.', '.kdLLddLLdk.', '.kddddddddk.', '.kdddLLdddk.', '.kddddddddk.', '..kkkkkkkk..', '..ss....ss..']);
  var BADGES = [['Phosphor Owl', 'Keeps one eye on new pairs, all night.'], ['Quiet Validator', 'Votes every slot. Says nothing.'], ['Mint Moth', 'Drawn to fresh launches like porch lights.'], ['Night-Shift Newt', 'Awake whenever the candles are.'], ['Signal Sprout', 'Grows a little every block.'], ['Static Heron', 'Stands very still. Sees everything.'], ['Gasless Gecko', 'Travels light, sticks to walls.'], ['Slot Sloth', 'Counts slots. Slowly. Correctly.']];
  var MOODS = [['sleepy', 22], ['calm', 38], ['steady', 55], ['busy', 71], ['bustling', 84], ['frantic', 96]];
  var GC = ['#b8ff3c', '#7ef2b8', '#93b39a', '#8e9b6c'];
  function pulse(seed, tag) { var r = rng(seed); var b = BADGES[Math.floor(r() * BADGES.length)]; var m = MOODS[Math.floor(r() * MOODS.length)]; var c1 = GC[Math.floor(r() * GC.length)], c2 = GC[Math.floor(r() * GC.length)]; var cells = []; for (var y = 0; y < 7; y++) { var row = []; for (var x = 0; x < 4; x++) { var v = r(); row.push(v < 0.42 ? 'transparent' : v < 0.8 ? c1 : c2); } for (var x2 = 0; x2 < 7; x2++) cells.push(row[x2 < 4 ? x2 : 6 - x2]); } return { name: b[0], flavor: b[1], serial: String(1000 + Math.floor(r() * 9000)), mood: m[0], level: m[1], cells: cells, tag: tag }; }
  function fr(x) { return x - Math.floor(x); }
  function ascii(t, cols, rows) { var ramp = ' .·:-=+*#%@'; var out = []; for (var y = 0; y < rows; y++) { var s = ''; var cy = (y - (rows - 1) / 2) / (rows / 2); for (var x = 0; x < cols; x++) { var c = 0.32 * Math.sin(x * 0.07 + t * 0.55) + 0.12 * Math.sin(x * 0.19 - t * 0.9); var band = Math.exp(-Math.pow(cy - c, 2) * 7); var v = band * (0.5 + 0.5 * Math.sin(x * 0.29 - t * 1.6 + y * 0.6)); var n = fr(Math.sin(x * 12.9898 + y * 78.233 + Math.floor(t * 3) * 37.719) * 43758.5453); if (n < 0.025) v += 0.45; if (n > 0.995) v = 0.95; var i = Math.max(0, Math.min(ramp.length - 1, Math.floor(v * ramp.length))); s += ramp[i]; } out.push({ t: s }); } return out; }
  return { TOKENS: TOKENS, usd: usd, pct: pct, pctP: pctP, age: age, price: price, pts: pts, signals: signals, find: find, byTicker: byTicker, SA: SA, SB: SB, pulse: pulse, hs: hs, ascii: ascii };
})();


/* ---------- app ---------- */
(function () {
  'use strict';
  var R = RCH;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var today = new Date();
  var S = {
    tab: 'trending', sortKey: 'trend', sortDir: 'desc', filter: '', fLiq: false, fMint: false, fWatch: false, loading: false,
    watch: { MOSSG: true, LANTRN: true }, sel: 'MOSSG', faq: 0,
    sol: 162.40, solCh: 2.31, pairs: 31208, vol: 1.842e9, slot: 418204117, ago: 0,
    pulse: R.pulse(R.hs(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()), 'today'), rolling: false
  };
  var t = 1.7;

  /* ---------- helpers ---------- */
  function idn(tk, lg) { return '<span class="idn' + (lg ? ' lg' : '') + '" style="background:' + tk.bg + '">' + tk.cells.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span>'; }
  function cls(n) { return n >= 0 ? 'up' : 'dn'; }
  function star(w) { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="' + (w ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>'; }
  function tok() { return R.byTicker(S.sel) || R.TOKENS[0]; }
  function goTo(id) { var el = $(id); if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }
  function pick(tk) { S.sel = tk; renderBoard(); renderSel(); }
  function toggleWatch(tk) { if (S.watch[tk]) delete S.watch[tk]; else S.watch[tk] = true; renderBoard(); renderSel(); renderWatch(); }

  /* ---------- top search ---------- */
  var tq = $('tq'), drop = $('topDrop');
  function renderTop() {
    var q = tq.value.trim();
    if (!q) { drop.hidden = true; tq.setAttribute('aria-expanded', 'false'); return; }
    var res = R.find(q).slice(0, 5);
    drop.innerHTML = res.length ? res.map(function (x) {
      return '<a class="tres" href="#signals" data-act="toppick" data-tk="' + x.ticker + '">' + idn(x) + '<span><b>$' + x.ticker + '</b> <small>' + esc(x.name) + '</small></span><small class="' + cls(x.ch24) + '">' + R.pct(x.ch24) + '</small></a>';
    }).join('') : '<div class="tnone">No match in the 16-token demo index. Try $BFROG or “goose”.</div>';
    drop.hidden = false; tq.setAttribute('aria-expanded', 'true');
  }
  tq.addEventListener('input', renderTop);
  tq.addEventListener('focus', renderTop);
  tq.addEventListener('blur', function () { setTimeout(function () { drop.hidden = true; tq.setAttribute('aria-expanded', 'false'); }, 180); });
  tq.addEventListener('keydown', function (e) { if (e.key === 'Escape') { tq.value = ''; renderTop(); tq.blur(); } });
  $('topForm').addEventListener('submit', function (e) { e.preventDefault(); var r = R.find(tq.value); if (r.length) { pick(r[0].ticker); tq.value = ''; renderTop(); goTo('signals'); } });
  try { if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) $('kbd').textContent = '⌘K'; } catch (e) {}
  document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); tq.focus(); closeNav(); } });

  /* ---------- mobile nav ---------- */
  var menuBtn = $('menuBtn'), nav = $('mnav');
  function closeNav() { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', function () { var o = !nav.classList.contains('open'); nav.classList.toggle('open', o); menuBtn.setAttribute('aria-expanded', String(o)); });

  /* ---------- hero search ---------- */
  var hq = $('hq'), hout = $('hout'), hT;
  function heroIdle() { hout.innerHTML = '<div class="muted">awaiting input_<br>Results from the demo index land here. Nothing you type leaves this page.</div>'; }
  function runHero(raw) {
    var q = (raw || '').trim(); clearTimeout(hT);
    if (!q) { heroIdle(); return; }
    hout.innerHTML = '<div class="load"><span class="spin" aria-hidden="true"></span>querying demo index for “' + esc(q) + '”…</div>';
    hT = setTimeout(function () {
      var isAddr = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(q);
      var res = R.find(q).slice(0, 4);
      if (res.length) hout.innerHTML = '<div>' + res.map(function (x) {
        return '<a class="hrow" href="#signals" data-act="pick" data-tk="' + x.ticker + '">' + idn(x) + '<span><b>$' + x.ticker + '</b> <small>' + esc(x.name) + ' · ' + R.age(x.age) + ' old</small></span><small>mc ' + R.usd(x.mcap) + '</small><span class="' + cls(x.ch24) + '">' + R.pct(x.ch24) + '</span></a>';
      }).join('') + '</div>';
      else if (isAddr) hout.innerHTML = '<div><span class="up">valid Solana address shape</span> — but it isn’t in this demo index.<br><span class="muted">A live build would read this mint straight from chain. Here, only the sample tokens resolve.</span></div>';
      else hout.innerHTML = '<div><span class="dn">no match</span> for “' + esc(q) + '” in the 16-token demo index.<br><span class="muted">Try a ticker from the board below, or a name like “frog”.</span></div>';
    }, reduced ? 0 : 480);
  }
  var heroChips = [['$BFROG', '$BFROG'], ['“goose”', 'goose'], ['mint of $CLAM', R.byTicker('CLAM').mint], ['unknown address', '7nE4qXvR2pLk9WbTzsHcY3dMfGa6uJoQ1iBNx8eKtVgP'], ['$NOPE', '$NOPE']];
  $('heroChips').innerHTML = heroChips.map(function (c, i) { return '<button class="chip" type="button" data-act="hchip" data-i="' + i + '">' + esc(c[0]) + '</button>'; }).join('');
  $('heroForm').addEventListener('submit', function (e) { e.preventDefault(); runHero(hq.value); });
  heroIdle();

  /* ---------- hero visuals ---------- */
  var asciiEl = $('ascii'); var asciiRows = [];
  for (var i = 0; i < 17; i++) { var d = document.createElement('div'); asciiEl.appendChild(d); asciiRows.push(d); }
  function drawAscii() { var rows = R.ascii(t, 104, 17); for (var i = 0; i < rows.length; i++) asciiRows[i].textContent = rows[i].t; $('ppm').textContent = 38 + Math.round(6 * Math.sin(t * 0.7)); }
  function cellsHTML(list) { return list.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join(''); }
  $('sprA').innerHTML = cellsHTML(R.SA); $('sprB').innerHTML = cellsHTML(R.SB);
  var tape = R.TOKENS.concat(R.TOKENS).map(function (x) { return '<span class="tp"><b>$' + x.ticker + '</b><span class="' + cls(x.ch24) + '">' + R.pct(x.ch24) + '</span><span style="color:#7e8c80">' + R.usd(x.mcap) + '</span></span>'; }).join('');
  $('tape').innerHTML = tape;

  /* ---------- market strip ---------- */
  function renderStrip() {
    $('solPx').textContent = '$' + S.sol.toFixed(2);
    var sc = $('solCh'); sc.textContent = R.pctP(S.solCh); sc.className = cls(S.solCh);
    $('pairs').textContent = S.pairs.toLocaleString('en-US');
    $('vol').textContent = R.usd(S.vol);
    $('slot').textContent = S.slot.toLocaleString('en-US');
  }
  function market() { var r = Math.random; S.sol = +(S.sol * (1 + (r() - 0.5) * 0.004)).toFixed(2); S.solCh = +(S.solCh + (r() - 0.5) * 0.08).toFixed(2); S.pairs += Math.round((r() - 0.4) * 30); S.vol *= 1 + (r() - 0.45) * 0.002; S.slot += 6; S.ago = 0; renderStrip(); }
  function clock() { var d = new Date(); var p = function (n) { return (n < 10 ? '0' : '') + n; }; $('clock').textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()); S.ago++; $('ago').textContent = S.ago; }

  /* ---------- board ---------- */
  var TABS = [['trending', 'Trending'], ['new', 'Just launched'], ['gainers', 'Gainers'], ['active', 'Most active']];
  var COLS = [['name', 'Token', 'l'], ['age', 'Age', ''], ['mcap', 'MCap', ''], ['liq', 'Liquidity', ''], ['vol', 'Vol 24h', ''], ['ch1', '1h', ''], ['ch24', '24h', '']];
  var SORTN = { trend: 'trend score', name: 'name', age: 'age', mcap: 'market cap', liq: 'liquidity', vol: '24h volume', ch1: '1h change', ch24: '24h change' };
  var FCH = [['fLiq', 'Liq ≥ $50K'], ['fMint', 'Mint revoked'], ['fWatch', '★ Watching']];
  var lT;
  function setTab(id) {
    var d = { trending: ['trend', 'desc'], new: ['age', 'asc'], gainers: ['ch24', 'desc'], active: ['vol', 'desc'] }[id];
    S.tab = id; S.sortKey = d[0]; S.sortDir = d[1]; S.loading = !reduced; clearTimeout(lT);
    renderBoard();
    if (!reduced) lT = setTimeout(function () { S.loading = false; renderBoard(); }, 380);
  }
  function sortBy(k) { if (S.sortKey === k) S.sortDir = S.sortDir === 'asc' ? 'desc' : 'asc'; else { S.sortKey = k; S.sortDir = (k === 'name' || k === 'age') ? 'asc' : 'desc'; } renderBoard(); }
  function list() {
    var l = R.TOKENS.slice();
    if (S.tab === 'new') l = l.filter(function (x) { return x.age < 1440; });
    if (S.tab === 'gainers') l = l.filter(function (x) { return x.ch24 > 0; });
    var fq = S.filter.trim().toLowerCase().replace(/^\$/, '');
    if (fq) l = l.filter(function (x) { return x.name.toLowerCase().indexOf(fq) >= 0 || x.ticker.toLowerCase().indexOf(fq) >= 0; });
    if (S.fLiq) l = l.filter(function (x) { return x.liq >= 50e3; });
    if (S.fMint) l = l.filter(function (x) { return x.mintRev; });
    if (S.fWatch) l = l.filter(function (x) { return S.watch[x.ticker]; });
    var k = S.sortKey, d = S.sortDir === 'asc' ? 1 : -1;
    l.sort(function (a, b) { return (k === 'name' ? a.name.localeCompare(b.name) : a[k] - b[k]) * d; });
    return l;
  }
  function rowHTML(x) {
    var w = !!S.watch[x.ticker];
    return '<div class="tr' + (S.sel === x.ticker ? ' sel' : '') + '" role="row">' +
      '<div class="c l" role="cell"><button class="star" type="button" data-act="star" data-tk="' + x.ticker + '" aria-pressed="' + w + '" aria-label="' + (w ? 'Remove $' : 'Add $') + x.ticker + (w ? ' from' : ' to') + ' watchlist">' + star(w) + '</button></div>' +
      '<div class="c l" role="cell"><button class="tok" type="button" data-act="pick" data-tk="' + x.ticker + '" aria-label="Select ' + esc(x.name) + ', $' + x.ticker + '">' + idn(x) + '<span><b>' + esc(x.name) + (x.age < 1440 ? '<em class="new">NEW</em>' : '') + '</b><small>$' + x.ticker + ' · ' + R.price(x.price) + '</small></span></button></div>' +
      '<div class="c" role="cell">' + R.age(x.age) + '</div>' +
      '<div class="c" role="cell">' + R.usd(x.mcap) + '</div>' +
      '<div class="c" role="cell">' + R.usd(x.liq) + '</div>' +
      '<div class="c" role="cell">' + R.usd(x.vol) + '</div>' +
      '<div class="c ' + cls(x.ch1) + '" role="cell">' + R.pct(x.ch1) + '</div>' +
      '<div class="c ' + cls(x.ch24) + '" role="cell">' + R.pct(x.ch24) + '</div>' +
      '<div class="c" role="cell"><svg width="80" height="26" viewBox="0 0 80 26" role="img" aria-label="' + esc(x.name) + ' 24 hour trend, ' + R.pctP(x.ch24) + ' (demo)"><polyline points="' + x.spark + '" fill="none" stroke="' + (x.ch24 >= 0 ? '#b8ff3c' : '#ff7d5c') + '" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg></div>' +
      '<div class="c" role="cell"><a class="insp" href="#signals" data-act="pick" data-tk="' + x.ticker + '">Inspect →</a></div></div>';
  }
  function renderBoard() {
    var counts = { trending: 16, new: R.TOKENS.filter(function (x) { return x.age < 1440; }).length, gainers: R.TOKENS.filter(function (x) { return x.ch24 > 0; }).length, active: 16 };
    var focusedTab = document.activeElement && document.activeElement.getAttribute('role') === 'tab';
    $('tabs').innerHTML = TABS.map(function (tb) { var on = S.tab === tb[0]; return '<button class="tab' + (on ? ' on' : '') + '" role="tab" id="tab-' + tb[0] + '" aria-selected="' + on + '" aria-controls="board-panel" tabindex="' + (on ? 0 : -1) + '" data-act="tab" data-tab="' + tb[0] + '">' + tb[1] + '<span class="ct">' + counts[tb[0]] + '</span></button>'; }).join('');
    if (focusedTab) $('tab-' + S.tab).focus();
    $('board-panel').setAttribute('aria-labelledby', 'tab-' + S.tab);
    $('board-panel').setAttribute('aria-busy', String(S.loading));
    $('fchips').innerHTML = FCH.map(function (f) { return '<button class="chip" type="button" aria-pressed="' + !!S[f[0]] + '" data-act="fchip" data-f="' + f[0] + '">' + f[1] + '</button>'; }).join('');
    $('thead').innerHTML = '<div class="c l" role="columnheader"><span class="sr">Watch</span></div>' + COLS.map(function (c) {
      var on = S.sortKey === c[0];
      return '<div class="c ' + c[2] + '" role="columnheader" aria-sort="' + (on ? (S.sortDir === 'asc' ? 'ascending' : 'descending') : 'none') + '"><button class="hb' + (on ? ' on' : '') + '" type="button" data-act="sort" data-k="' + c[0] + '">' + c[1] + ' <span aria-hidden="true">' + (on ? (S.sortDir === 'asc' ? '↑' : '↓') : '↕') + '</span></button></div>';
    }).join('') + '<div class="c" role="columnheader"><span class="hs">24h trend</span></div><div class="c" role="columnheader"><span class="sr">Actions</span></div>';
    var l = list();
    if (S.loading) {
      $('tbody').innerHTML = [62, 48, 70, 55, 66, 44].map(function (w) { var s = '<div class="c" role="cell"><div class="skel"></div></div>'; return '<div class="tr" role="row"><div class="c" role="cell"></div><div class="c l" role="cell"><div class="skel" style="width:' + w + '%"></div></div>' + s + s + s + s + s + s + s + '<div class="c" role="cell"></div></div>'; }).join('');
      $('empty').hidden = true;
    } else {
      $('tbody').innerHTML = l.map(rowHTML).join('');
      $('empty').hidden = l.length > 0;
    }
    $('bfoot').innerHTML = '<span>Showing ' + l.length + ' of 16 sample tokens · sorted by ' + SORTN[S.sortKey] + (S.sortDir === 'asc' ? ' ↑' : ' ↓') + '</span><span>DEMO DATA — values simulated, not verified, not live</span>';
  }
  $('filter').addEventListener('input', function (e) { S.filter = e.target.value; renderBoard(); });
  $('tabs').addEventListener('keydown', function (e) {
    var i = TABS.findIndex(function (x) { return x[0] === S.tab; }); var n = null;
    if (e.key === 'ArrowRight') n = TABS[(i + 1) % 4]; if (e.key === 'ArrowLeft') n = TABS[(i + 3) % 4];
    if (n) { e.preventDefault(); setTab(n[0]); $('tab-' + n[0]).focus(); }
  });

  /* ---------- selected card + signals ---------- */
  var sigSelect = $('sigSelect');
  sigSelect.innerHTML = R.TOKENS.map(function (o) { return '<option value="' + o.ticker + '">$' + o.ticker + ' — ' + esc(o.name) + '</option>'; }).join('');
  sigSelect.addEventListener('change', function (e) { pick(e.target.value); });
  function renderSel() {
    var x = tok(); var w = !!S.watch[x.ticker];
    var big = R.pts(x.sp, 280, 64, 6);
    var col = x.ch24 >= 0 ? '#b8ff3c' : '#ff7d5c';
    $('selCard').innerHTML =
      '<div class="card-h"><span>Selected</span><span>$' + x.ticker + '</span></div>' +
      '<div class="selhead">' + idn(x, true) + '<div><h3>' + esc(x.name) + '</h3><p>$' + x.ticker + ' · pair age ' + R.age(x.age) + '</p></div></div>' +
      '<div class="px">' + R.price(x.price) + ' <small class="' + cls(x.ch24) + '">' + R.pct(x.ch24) + ' 24h</small></div>' +
      '<svg class="bigsp" viewBox="0 0 280 64" preserveAspectRatio="none" role="img" aria-label="' + esc(x.name) + ' 24 hour trend (demo)"><polyline points="0,64 ' + big + ' 280,64" fill="' + (x.ch24 >= 0 ? 'rgba(184,255,60,0.08)' : 'rgba(255,125,92,0.08)') + '" stroke="none"/><polyline points="' + big + '" fill="none" stroke="' + col + '" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>' +
      '<dl class="kv"><div><dt>MCap</dt><dd>' + R.usd(x.mcap) + '</dd></div><div><dt>Liq</dt><dd>' + R.usd(x.liq) + '</dd></div><div><dt>Vol 24h</dt><dd>' + R.usd(x.vol) + '</dd></div><div><dt>Holders</dt><dd>' + x.holders.toLocaleString('en-US') + '</dd></div><div><dt>1h</dt><dd class="' + cls(x.ch1) + '">' + R.pct(x.ch1) + '</dd></div><div><dt>Top 10</dt><dd>' + x.top10 + '%</dd></div></dl>' +
      '<div class="row2"><button class="btn sm" type="button" aria-pressed="' + w + '" data-act="star" data-tk="' + x.ticker + '">' + (w ? '★ Watching' : '☆ Watch') + '</button><a class="btn sm primary" href="#signals">Signals →</a></div>';
    $('sigWho').innerHTML = idn(x, true) + '<div><h3>' + esc(x.name) + '</h3><p>$' + x.ticker + ' · ' + R.usd(x.mcap) + ' mcap · ' + x.holders.toLocaleString('en-US') + ' holders · demo</p></div>';
    sigSelect.value = x.ticker;
    $('mint').textContent = x.mint;
    $('solscan').href = 'https://solscan.io/token/' + x.mint;
    $('explorer').href = 'https://explorer.solana.com/address/' + x.mint;
    var sg = R.signals(x); var tl = { clear: 0, watch: 0, flag: 0 };
    $('sigList').innerHTML = sg.map(function (g) { tl[g.st]++; return '<li class="sg"><span class="pill ' + g.st + '">' + g.stl + '</span><div><h4>' + g.k + ' <span>' + g.v + '</span></h4><p>' + g.note + '</p></div><div class="meter ' + g.st + '" aria-hidden="true"><i style="width:' + g.m + '%"></i></div></li>'; }).join('');
    $('tally').innerHTML = '<div><b style="color:#7ef2b8">' + tl.clear + '</b><span>CLEAR</span></div><div><b style="color:#f3cd52">' + tl.watch + '</b><span>WATCH</span></div><div><b style="color:#ff7d5c">' + tl.flag + '</b><span>FLAG</span></div>';
  }
  var cT;
  function copyMint() {
    var b = $('copyBtn'); var done = function (ok) { b.textContent = ok ? 'Copied ✓' : 'Select & copy'; clearTimeout(cT); cT = setTimeout(function () { b.textContent = 'Copy'; }, 1800); };
    try { navigator.clipboard.writeText(tok().mint).then(function () { done(true); }, function () { done(false); }); } catch (e) { done(false); }
  }

  /* ---------- watchlist ---------- */
  function renderWatch() {
    var ks = Object.keys(S.watch);
    $('wcount').textContent = ks.length + ' saved';
    $('wbody').innerHTML = ks.length ? '<ul class="wl">' + ks.map(function (k) { var x = R.byTicker(k); return '<li>' + idn(x) + '<button class="pick" type="button" data-act="pick" data-tk="' + k + '"><b>$' + k + '</b><small>' + esc(x.name) + ' · ' + R.usd(x.mcap) + '</small></button><span class="' + cls(x.ch24) + '">' + R.pct(x.ch24) + '</span><button class="x" type="button" data-act="star" data-tk="' + k + '" aria-label="Remove $' + k + ' from watchlist">✕</button></li>'; }).join('') + '</ul>'
      : '<div class="wl-empty">Empty for now. Star a row on the board or run <code>watch $BFROG</code> in the terminal.</div>';
  }

  /* ---------- pulse ---------- */
  var waveEl = $('wave'); var bars = [];
  for (var j = 0; j < 32; j++) { var b = document.createElement('i'); waveEl.appendChild(b); bars.push(b); }
  function drawWave() { for (var i = 0; i < bars.length; i++) { var h = 12 + S.pulse.level * 0.8 * (0.55 + 0.45 * Math.sin(i * 0.62 + t * 2.1)) * (0.7 + 0.3 * Math.sin(i * 0.23 - t)); bars[i].style.height = Math.max(4, Math.min(100, Math.round(h))) + '%'; } }
  function renderPulse() {
    var p = S.pulse;
    $('badge').className = 'badge' + (S.rolling ? ' rolling' : '');
    $('badge').innerHTML = '<div class="glyph" aria-hidden="true">' + cellsHTML(p.cells) + '</div><div><h4>' + p.name + '</h4><p>' + p.flavor + '</p><small>#' + p.serial + ' · ' + p.tag + '</small></div>';
    $('mood').textContent = p.mood + ' · ' + p.level;
    var rb = $('rollBtn'); rb.disabled = S.rolling; rb.textContent = S.rolling ? 'Tuning…' : 'Pull a new pulse';
    drawWave();
  }
  var rT;
  function roll() {
    if (S.rolling) return;
    if (reduced) { S.pulse = R.pulse(Math.floor(Math.random() * 1e9), 're-rolled'); renderPulse(); return; }
    var n = 0; S.rolling = true; renderPulse();
    rT = setInterval(function () { n++; S.pulse = R.pulse(Math.floor(Math.random() * 1e9), n < 10 ? 'tuning…' : 're-rolled'); if (n >= 10) { clearInterval(rT); S.rolling = false; } renderPulse(); }, 75);
  }

  /* ---------- terminal ---------- */
  var tout = $('tout'), tin = $('tin'), queue = [], cur = null, typer = null, pending = [], hist = [], hIdx = 0;
  function addLine(text, k) { var d = document.createElement('div'); d.className = 'tl ' + (k || ''); d.textContent = text; tout.appendChild(d); tout.scrollTop = tout.scrollHeight; return d; }
  function typeOut(lines) {
    if (reduced) { lines.forEach(function (l) { addLine(l.text, l.cls); }); $('announce').textContent = lines.map(function (l) { return l.text; }).join('. '); return; }
    queue = queue.concat(lines); pending = pending.concat(lines);
    if (!typer) { $('termStatus').textContent = 'typing…'; typer = setInterval(tick, 26); }
  }
  function tick() {
    if (!cur) {
      if (!queue.length) { clearInterval(typer); typer = null; $('termStatus').textContent = 'ready'; $('announce').textContent = pending.map(function (l) { return l.text; }).join('. '); pending = []; return; }
      var nx = queue.shift(); cur = { text: nx.text, shown: 0, el: addLine('', nx.cls) };
    }
    cur.shown = Math.min(cur.text.length, cur.shown + 7);
    cur.el.textContent = cur.text.slice(0, cur.shown);
    tout.scrollTop = tout.scrollHeight;
    if (cur.shown >= cur.text.length) cur = null;
  }
  function pad(s, n) { s = String(s); while (s.length < n) s += ' '; return s; }
  function run(raw) {
    var cmd = (raw || '').trim(); if (!cmd) return;
    hist.push(cmd); hIdx = hist.length; tin.value = '';
    var parts = cmd.split(/\s+/); var c = parts[0].toLowerCase(); var arg = (parts[1] || '').replace(/^\$/, '').toUpperCase();
    if (c === 'clear' || c === 'cls') { clearInterval(typer); typer = null; queue = []; cur = null; pending = []; tout.innerHTML = ''; $('termStatus').textContent = 'ready'; $('announce').textContent = 'Screen cleared'; return; }
    addLine('reach@sol ~ % ' + cmd, 'cmd');
    var out = []; var P = function (text, k) { out.push({ text: text, cls: k || '' }); };
    var row = function (x, i) { return pad(i < 9 ? '0' + (i + 1) : i + 1, 4) + pad('$' + x.ticker, 9) + pad(R.usd(x.mcap), 10) + pad(R.pctP(x.ch24), 9) + R.age(x.age); };
    var head = pad('#', 4) + pad('TICKER', 9) + pad('MCAP', 10) + pad('24H', 9) + 'AGE';
    if (c === 'help' || c === '?') {
      P('commands', 'hd');
      ['  help              this list', '  trending          top 5 by trend score', '  new               pairs under 24h old', '  scan $TICKER      read on-chain signals', '  watch $TICKER     add to session watchlist', '  unwatch $TICKER   remove from watchlist', '  watchlist         show saved tokens', '  pulse             roll the daily pulse', '  clear             wipe the screen'].forEach(function (l) { P(l); });
      P('tip: ↑ / ↓ recalls history. all data is demo.', 'dim');
    } else if (c === 'trending' || c === 'top') {
      P(head, 'hd'); R.TOKENS.slice().sort(function (a, b) { return b.trend - a.trend; }).slice(0, 5).forEach(function (x, i) { P(row(x, i), x.ch24 >= 0 ? 'ok' : 'err'); });
      P('ranked by a demo trend score — popularity is not quality.', 'dim');
    } else if (c === 'new') {
      var nw = R.TOKENS.filter(function (x) { return x.age < 1440; }).sort(function (a, b) { return a.age - b.age; });
      P(head, 'hd'); nw.forEach(function (x, i) { P(row(x, i), x.ch24 >= 0 ? 'ok' : 'err'); });
      P(nw.length + ' pairs under 24h. young pairs have little history.', 'warn');
    } else if (c === 'scan' || c === 'inspect') {
      if (!arg) P('usage: scan $TICKER  (e.g. scan $CLAM)', 'warn');
      else { var x = R.byTicker(arg); if (!x) P('no token $' + arg + ' in the demo index. try `trending`.', 'err'); else {
        pick(x.ticker);
        P('scanning $' + x.ticker + ' · ' + x.name, 'hl'); P('mint  ' + x.mint.slice(0, 6) + '…' + x.mint.slice(-6) + '  (fictional)', 'dim');
        var tl = { clear: 0, watch: 0, flag: 0 };
        R.signals(x).forEach(function (g) { tl[g.st]++; var lbl = g.k.toLowerCase() + ' '; while (lbl.length < 26) lbl += '.'; P(pad('[' + g.stl + ']', 8) + lbl + ' ' + g.v, g.st === 'clear' ? 'ok' : g.st === 'watch' ? 'warn' : 'err'); });
        P('summary  ' + tl.clear + ' clear · ' + tl.watch + ' watch · ' + tl.flag + ' flag', 'hd');
        P('signals are observations, not guarantees. verify on an explorer.', 'dim');
      } }
    } else if (c === 'watch' || c === 'unwatch') {
      if (!arg) P('usage: ' + c + ' $TICKER', 'warn');
      else { var w = R.byTicker(arg); if (!w) P('no token $' + arg + ' in the demo index.', 'err'); else {
        var has = !!S.watch[w.ticker];
        if (c === 'watch') { if (has) P('$' + w.ticker + ' is already on your watchlist.', 'dim'); else { toggleWatch(w.ticker); P('★ $' + w.ticker + ' added · ' + Object.keys(S.watch).length + ' watching (session only)', 'ok'); } }
        else { if (!has) P('$' + w.ticker + ' was not on your watchlist.', 'dim'); else { toggleWatch(w.ticker); P('☆ $' + w.ticker + ' removed · ' + Object.keys(S.watch).length + ' watching', 'ok'); } }
      } }
    } else if (c === 'watchlist' || c === 'wl') {
      var ks = Object.keys(S.watch);
      if (!ks.length) P('watchlist is empty — try `watch $BFROG`', 'dim');
      else { P(head, 'hd'); ks.forEach(function (k, i) { var y = R.byTicker(k); P(row(y, i), y.ch24 >= 0 ? 'ok' : 'err'); }); }
    } else if (c === 'pulse') { roll(); P('pulse re-rolled → check the badge on the right.', 'hl'); P('decorative only. not a market signal.', 'dim'); }
    else if (c === 'gm') P('gm. the chain never sleeps; you probably should.', 'hl');
    else if (c === 'about' || c === 'reach') { P('reach — a read-only discovery terminal for solana memecoins.', 'hl'); P('no wallet, no trading, no custody. just the chain, read out loud.'); }
    else if (['buy', 'sell', 'ape', 'swap'].indexOf(c) >= 0) { P('reach does not trade. it only reads.', 'warn'); P('no wallet connection, no swaps, no orders — ever.', 'dim'); }
    else if (c === 'sudo') P('nice try. everything here is read-only anyway.', 'warn');
    else if (c === 'compare') P('compare is coming to the full terminal. for now: scan each token and read them side by side.', 'dim');
    else P('command not found: ' + parts[0] + ' — type `help`', 'err');
    typeOut(out);
  }
  var TCH = ['help', 'trending', 'new', 'scan $BFROG', 'scan $SNAIL', 'watch $RAMEN', 'pulse', 'clear'];
  $('tchips').innerHTML = TCH.map(function (c) { return '<button class="chip" type="button" data-act="tchip" data-cmd="' + c + '">' + c + '</button>'; }).join('') + '<button class="chip" type="button" data-act="rerun">↻ rerun last</button>';
  $('termForm').addEventListener('submit', function (e) { e.preventDefault(); run(tin.value); });
  tin.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' && hist.length) { e.preventDefault(); hIdx = Math.max(0, hIdx - 1); tin.value = hist[hIdx]; }
    else if (e.key === 'ArrowDown' && hist.length) { e.preventDefault(); hIdx = Math.min(hist.length, hIdx + 1); tin.value = hist[hIdx] || ''; }
    else if (e.key === 'Escape') tin.value = '';
  });

  /* ---------- FAQ ---------- */
  var FAQS = [
    ['What is Reach?', 'Reach is a discovery and research terminal for Solana memecoins. It surfaces new pairs, trending tokens and movers, reads basic on-chain signals for each mint, and keeps a watchlist — all in one fast, keyboard-friendly view.'],
    ['Does Reach trade tokens?', 'No. Reach is read-only. It never connects to a wallet, places orders, swaps tokens or holds funds. If you decide to trade, you do it elsewhere, on your own terms.'],
    ['Are the displayed metrics live?', 'Not on this page. Every token, price, volume and network figure here is fictional demo data, labelled as such. In a live build, each figure would carry its source and a timestamp, and anything stale would be marked.'],
    ['What do risk signals mean?', 'Each signal is one automated observation — pool depth, holder concentration, whether mint or freeze authority is still active, LP status, pair age. Clear means nothing unusual showed up in that check; it does not mean safe. Signals can miss coordinated wallets, off-chain deception and anything that changes after the read.'],
    ['Why won’t Reach call a token safe?', 'Because no automated check can know that. A token can pass every check and still go to zero. Reach shows what the chain says and leaves the judgement with you.'],
    ['Do I need a wallet?', 'No. There is nothing to connect and no account to create. Reach will never ask for a seed phrase or private key — if anything claiming to be Reach does, it isn’t us.']
  ];
  function renderFaq() {
    $('faqList').innerHTML = FAQS.map(function (f, i) { var o = S.faq === i;
      return '<div class="qa"><h3><button class="qb" type="button" id="faq-b' + i + '" aria-expanded="' + o + '" aria-controls="faq-p' + i + '" data-act="faq" data-i="' + i + '"><span>' + f[0] + '</span><span class="pm" aria-hidden="true">' + (o ? '−' : '+') + '</span></button></h3><div class="qp" id="faq-p' + i + '" role="region" aria-labelledby="faq-b' + i + '"' + (o ? '' : ' hidden') + '><p>' + f[1] + '</p></div></div>';
    }).join('');
  }

  /* ---------- click delegation ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]'); if (!el) return;
    var a = el.getAttribute('data-act'), tk = el.getAttribute('data-tk');
    switch (a) {
      case 'pick': pick(tk); break;
      case 'toppick': pick(tk); tq.value = ''; renderTop(); break;
      case 'star': toggleWatch(tk); break;
      case 'tab': setTab(el.getAttribute('data-tab')); break;
      case 'sort': sortBy(el.getAttribute('data-k')); break;
      case 'fchip': var f = el.getAttribute('data-f'); S[f] = !S[f]; renderBoard(); break;
      case 'reset': S.filter = ''; $('filter').value = ''; S.fLiq = S.fMint = S.fWatch = false; renderBoard(); break;
      case 'hchip': var hc = heroChips[+el.getAttribute('data-i')]; hq.value = hc[1]; runHero(hc[1]); break;
      case 'tchip': run(el.getAttribute('data-cmd')); break;
      case 'rerun': if (hist.length) run(hist[hist.length - 1]); break;
      case 'roll': roll(); break;
      case 'faq': var i = +el.getAttribute('data-i'); S.faq = S.faq === i ? -1 : i; renderFaq(); $('faq-b' + i).focus(); break;
      case 'copy': copyMint(); break;
      case 'navclose': closeNav(); break;
      case 'navtab': closeNav(); setTab(el.getAttribute('data-tab')); break;
    }
  });

  /* ---------- boot ---------- */
  renderStrip(); renderBoard(); renderSel(); renderWatch(); renderPulse(); renderFaq(); drawAscii(); clock();
  if (!reduced) setInterval(function () { if (document.hidden) return; t += 0.13; drawAscii(); drawWave(); }, 130);
  setInterval(market, 2400);
  setInterval(clock, 1000);
  typeOut([
    { text: 'reach terminal v0.9 · demo build', cls: 'hl' },
    { text: 'feed: simulated · 16 fictional tokens · nothing here is live', cls: 'dim' },
    { text: 'type `help`, or tap a command below.', cls: '' }
  ]);
})();
