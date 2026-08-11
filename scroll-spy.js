const sections = document.querySelectorAll('main.content > section[id]');
const navLinks = document.querySelectorAll('.sidebar__nav-link');

function setActive(id) {
  navLinks.forEach(function (link) {
    const isActive = link.getAttribute('href') === '#' + id;
    link.classList.toggle('sidebar__nav-link--active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// a section counts as "current" once it crosses this thin band
// roughly 40-45% down the viewport, not the whole viewport
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

sections.forEach(function (section) {
  observer.observe(section);
});
