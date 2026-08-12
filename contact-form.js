(function () {
  // submit via fetch so the page shows a thank-you note instead of redirecting.
  var form = document.getElementById('cform');
  var ok   = document.getElementById('ok');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    if (form.action.indexOf('YOUR_FORM_ID') > -1) return; // not configured yet — let it behave normally
    e.preventDefault();
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (r.ok) { form.reset(); ok.style.display = 'block'; }
        else { form.submit(); }   // fall back to normal post on error
      })
      .catch(function () { form.submit(); });
  });
})();
