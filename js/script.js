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

const header = document.querySelector("header");

let scrollTimer;

window.addEventListener("scroll", () => {

  clearTimeout(scrollTimer);

  if (
    window.scrollY <= 20 ||
    document.body.classList.contains("is-menu-open")
  ) {
    header.classList.remove("is-scrolling");
    return;
  }

  header.classList.add("is-scrolling");

  scrollTimer = setTimeout(() => {
    header.classList.remove("is-scrolling");
  }, 180);

}, { passive: true });

/* FV SLIDER */
(() => {

    const fv = document.querySelector(".first-view");

    if (!fv) return;

    const slides = fv.querySelectorAll(".fv-slide");
    const dots = fv.querySelectorAll(".fv-dot");

    /* ---------- 設定 ---------- */

    const INTERVAL = 6500; // 画像切り替え間隔

    let current = 0;
    let timer = null;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    /* ---------- スライド切り替え ---------- */

    function showSlide(index) {

        if (index === current) return;

        slides[current].classList.remove("is-active");
        dots[current]?.classList.remove("is-active");
        dots[current]?.setAttribute("aria-pressed", "false");

        slides[index].classList.add("is-active");
        dots[index]?.classList.add("is-active");
        dots[index]?.setAttribute("aria-pressed", "true");

        current = index;
    }

    /* ---------- 次のスライド ---------- */

    function nextSlide() {

        const next = (current + 1) % slides.length;

        showSlide(next);
    }

    /* ---------- 自動再生 ---------- */

    function startSlider() {

        if (
            slides.length <= 1 ||
            reduceMotion.matches ||
            document.hidden
        ) return;

        timer = setInterval(nextSlide, INTERVAL);
    }

    function stopSlider() {
        clearInterval(timer);
        timer = null;
    }

    /* ---------- インジケーター操作 ---------- */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            stopSlider();
            showSlide(index);
            startSlider();

        });

    });

    /* ---------- タブ非表示時は一時停止 ---------- */

    document.addEventListener("visibilitychange", () => {

        stopSlider();
        startSlider();

    });

    /* ---------- 初期化 ---------- */

    startSlider();

})();