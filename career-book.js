(function () {
  var book = document.getElementById('careerBook');
  if (!book) return;

  function open()  { book.classList.add('open'); }

  // 1) auto-open when the notebook scrolls into view, after a short pause
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          io.disconnect();
          setTimeout(open, 1000);
        }
      });
    }, { threshold: 0.45 });
    io.observe(book);
  } else {
    open(); // very old browsers: just show it open
  }

  // 2) hover also opens it (nice on desktop)
  book.addEventListener('mouseenter', open);

  // sticky tabs switch which item is shown on both pages
  var stickies = book.querySelectorAll('.sticky');
  var panels   = book.querySelectorAll('.ov, .dt');
  var current  = 'argonne';
  var busy      = false;
  var reduce    = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function swap(name) {
    stickies.forEach(function (t) { t.classList.toggle('active', t.dataset.item === name); });
    panels.forEach(function (p) {
      var on = p.dataset.item === name;
      p.classList.toggle('hidden', !on);
      if (on) { p.classList.remove('enter'); void p.offsetWidth; p.classList.add('enter'); }
    });
    current = name;
  }

  function goTo(name) {
    if (name === current) return;
    // if the book isn't open yet, or motion is reduced, just swap
    if (!book.classList.contains('open') || reduce) { open(); swap(name); return; }
    if (busy) return;
    busy = true;
    book.classList.add('turning');           // the blank sheet sweeps across
    setTimeout(function () { swap(name); }, 190);   // swap while it's hidden behind the sheet
    setTimeout(function () { book.classList.remove('turning'); busy = false; }, 520);
  }

  stickies.forEach(function (s) {
    s.addEventListener('click', function () { open(); goTo(s.dataset.item); });
  });

  // internship cards act as entry points into the notebook (their tabs still live there)
  function openTo(name) {
    open();
    goTo(name);
    book.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  document.querySelectorAll('.icard').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); openTo(el.dataset.item); });
  });

  // project sticky notes scroll down to their matching detail card instead
  // (projects no longer have their own notebook tab)
  document.querySelectorAll('.pnote').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector('.pcard[data-item="' + el.dataset.item + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
})();
