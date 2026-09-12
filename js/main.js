document.addEventListener('DOMContentLoaded', function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Interactive oscilloscope (home) ---------- */
  var scope = document.querySelector('.scope');
  if (scope) {
    var W = 340, H = 190, MID = 97;
    var ch1 = scope.querySelector('.trace.ch1');
    var ch2 = scope.querySelector('.trace.ch2');
    var fOut = scope.querySelector('[data-f]');
    var aOut = scope.querySelector('[data-a]');
    var state = { cycles: 3, amp: 52, live: false };

    function square(cycles, amp) {
      var seg = W / (cycles * 2), d = 'M0 ' + (MID + amp), x = 0, hi = false;
      for (var i = 0; i < cycles * 2; i++) {
        x += seg; hi = !hi;
        d += ' V' + (hi ? MID - amp : MID + amp) + ' H' + x.toFixed(1);
      }
      return d;
    }
    function sine(cycles, amp) {
      var d = '', n = 120;
      for (var i = 0; i <= n; i++) {
        var x = (W / n) * i;
        var y = MID + amp * 0.85 * Math.sin((x / W) * cycles * Math.PI * 2);
        d += (i === 0 ? 'M' : ' L') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      return d;
    }
    function render() {
      ch1.setAttribute('d', square(state.cycles, state.amp));
      ch2.setAttribute('d', sine(state.cycles, state.amp));
      if (fOut) fOut.textContent = (state.cycles * 0.5).toFixed(1) + ' kHz';
      if (aOut) aOut.textContent = (state.amp / 26).toFixed(2) + ' V';
    }

    render();

    if (!reduced) {
      [ch1, ch2].forEach(function (p, i) {
        var len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            p.classList.add('drawing');
            p.style.transitionDelay = (0.3 + i * 0.5) + 's';
            p.style.strokeDashoffset = '0';
          });
        });
      });
    }

    function goLive() {
      if (state.live) return;
      state.live = true;
      [ch1, ch2].forEach(function (p) {
        p.classList.remove('drawing');
        p.style.transitionDelay = '';
        p.style.strokeDasharray = '';
        p.style.strokeDashoffset = '';
      });
    }

    scope.addEventListener('pointermove', function (e) {
      var r = scope.getBoundingClientRect();
      var nx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      var ny = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      goLive();
      state.cycles = 1 + Math.round(nx * 7);
      state.amp = 12 + (1 - ny) * 62;
      render();
    });

    scope.querySelectorAll('.ch-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var on = b.getAttribute('aria-pressed') !== 'true';
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        var tr = scope.querySelector('.trace.' + b.dataset.ch);
        if (tr) tr.classList.toggle('off', !on);
      });
    });
  }

  /* ---------- Project filters + expanders ---------- */
  var chips = document.querySelectorAll('.chip[data-filter]');
  var projs = document.querySelectorAll('.proj[data-cat]');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      c.setAttribute('aria-pressed', 'true');
      var f = c.dataset.filter;
      projs.forEach(function (p) {
        p.classList.toggle('hide', !(f === 'all' || p.dataset.cat === f));
      });
    });
  });
  document.querySelectorAll('.proj-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      var card = b.closest('.proj');
      var open = card.classList.toggle('open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.querySelector('span').textContent = open ? 'Less' : 'More';
    });
  });

  /* ---------- Leadership tabs ---------- */
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.panel');
  function activate(id) {
    tabs.forEach(function (t) { t.setAttribute('aria-selected', t.dataset.panel === id ? 'true' : 'false'); });
    panels.forEach(function (p) { p.classList.toggle('active', p.id === id); });
    if (history.replaceState) history.replaceState(null, '', '#' + id);
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { activate(t.dataset.panel); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        var n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        tabs[n].focus(); activate(tabs[n].dataset.panel);
      }
    });
  });
  if (tabs.length) {
    var want = location.hash.replace('#', '');
    var ok = Array.prototype.some.call(panels, function (p) { return p.id === want; });
    activate(ok ? want : tabs[0].dataset.panel);
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll('.copy-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.dataset.copy;
      var done = function () { b.classList.add('done'); b.textContent = 'Copied'; setTimeout(function () { b.classList.remove('done'); b.textContent = 'Copy'; }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done);
      else { var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); done(); }
    });
  });
});
