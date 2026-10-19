const targets = document.querySelectorAll(".js-scroll-anim");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-animated");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.9,
  }
);

targets.forEach((target) => {
  observer.observe(target);
});

const hamburger = document.querySelector(".hamburger");
const globalNav = document.querySelector(".global-nav");

hamburger.addEventListener("click", () => {
  const isOpen = hamburger.classList.toggle("is-open");

  globalNav.classList.toggle("is-open", isOpen);

  hamburger.setAttribute(
    "aria-expanded",
    isOpen
  );

  hamburger.setAttribute(
    "aria-label",
    isOpen ? "メニューを閉じる" : "メニューを開く"
  );

  document.body.classList.toggle("is-menu-open", isOpen);
});