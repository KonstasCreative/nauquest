document.addEventListener("DOMContentLoaded", () => {
  // 1) Sticky-text for services (unchanged)
  const services = document.querySelectorAll(".service");
  const stickyText = document.getElementById("sticky-text");
  let currentSvc = services[0];

  function loadTemplate(svc) {
    const tmpl = svc.querySelector(".sticky-template");
    if (!tmpl) return;
    const clone = tmpl.content.cloneNode(true);
    stickyText.innerHTML = "";
    stickyText.appendChild(clone);
  }

  loadTemplate(currentSvc);
  stickyText.classList.add("fade-in");

  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target === currentSvc) return;
        stickyText.classList.replace("fade-in", "fade-out");
        setTimeout(() => {
          currentSvc = entry.target;
          loadTemplate(currentSvc);
          stickyText.classList.replace("fade-out", "fade-in");
        }, 500);
      });
    },
    { root: null, rootMargin: "-20% 0px -80% 0px", threshold: 0 }
  ).observeEach(services);
});

// --------------------------------------------------------------------
// Tiny helper to observe multiple elements with one observer
IntersectionObserver.prototype.observeEach = function (nodes) {
  nodes.forEach((n) => this.observe(n));
  return this;
};
