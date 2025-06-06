const burger = document.getElementById("burger");
const menu = document.getElementById("navmenu");

burger.addEventListener("click", function () {
  const isOpen = burger.classList.toggle("open");
  if (isOpen) {
    menu.style.transform = "translateY(0)";
    document.body.style.overflow = "hidden";
  } else {
    menu.style.transform = "translateY(100%)";
    document.body.style.overflow = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".list-image-menu ul li");
  let activeImg = null;

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const nextImg = document.querySelector(
        `#menuImg-container img[data-id="${item.id}"]`
      );

      if (!nextImg || nextImg === activeImg) return;

      nextImg.classList.add("show");

      if (activeImg) {
        activeImg.classList.remove("show");
      }

      activeImg = nextImg;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 2) Generic blur-on-scroll factory
  function blurOnScroll(
    selector,
    { maxBlur = 10, triggerAt = 0.2, minOpacity = 0, maxOpacity = 1 } = {}
  ) {
    const el = document.querySelector(selector);
    if (!el) return;

    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);
    const obs = new IntersectionObserver(
      ([entry]) => {
        const r = entry.intersectionRatio;
        if (r < triggerAt) {
          el.style.filter = `blur(${maxBlur}px)`;
          el.style.opacity = minOpacity;
        } else {
          const norm = (r - triggerAt) / (1 - triggerAt);
          const blurPx = maxBlur * (1 - norm);
          el.style.filter = `blur(${blurPx}px)`;
          el.style.opacity = minOpacity + (maxOpacity - minOpacity) * norm;
        }
      },
      { root: null, threshold: thresholds }
    );

    obs.observe(el);
  }

  // 3) Hook up your blur effects
  blurOnScroll(".moto-text", {
    maxBlur: 4,
    triggerAt: 0.2,
    minOpacity: 0,
    maxOpacity: 1,
  });
  // blurOnScroll(".footer-container", {
  //   maxBlur: 4,
  //   triggerAt: 0.1,
  //   minOpacity: 1,
  //   maxOpacity: 1,
  // });
  blurOnScroll(".about-container p", {
    maxBlur: 4,
    triggerAt: 0.2,
    minOpacity: 0,
    maxOpacity: 1,
  });
  blurOnScroll(".services-container h2", {
    maxBlur: 4,
    triggerAt: 0.2,
    minOpacity: 0,
    maxOpacity: 1,
  });
  blurOnScroll(".contact-container h2", {
    maxBlur: 4,
    triggerAt: 0.2,
    minOpacity: 0,
    maxOpacity: 1,
  });
});

// --------------------------------------------------------------------
// Tiny helper to observe multiple elements with one observer
IntersectionObserver.prototype.observeEach = function (nodes) {
  nodes.forEach((n) => this.observe(n));
  return this;
};
