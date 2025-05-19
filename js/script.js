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

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
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
