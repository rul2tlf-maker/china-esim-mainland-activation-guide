const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && window.anime) {
  anime({
    targets: ".hero-copy > *",
    translateY: [26, 0],
    opacity: [0, 1],
    delay: anime.stagger(90),
    duration: 900,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".radar-sweep",
    rotate: 360,
    duration: 5000,
    easing: "linear",
    loop: true
  });

  anime({
    targets: ".radar-pulse",
    scale: [0.9, 1.3],
    opacity: [0.7, 1],
    duration: 1600,
    direction: "alternate",
    easing: "easeInOutSine",
    loop: true
  });

  anime({
    targets: [".node-a", ".node-b", ".node-c"],
    scale: [0.85, 1.2],
    opacity: [0.5, 1],
    direction: "alternate",
    delay: anime.stagger(180),
    duration: 1500,
    easing: "easeInOutSine",
    loop: true
  });

  anime({
    targets: ".hero-pills li",
    translateY: [16, 0],
    opacity: [0, 1],
    delay: anime.stagger(70, { start: 420 }),
    duration: 680,
    easing: "easeOutQuad"
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    if (!reduceMotion && window.anime) {
      anime({
        targets: entry.target,
        translateY: [24, 0],
        opacity: [0, 1],
        duration: 760,
        easing: "easeOutExpo"
      });
    } else {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "none";
    }

    if (entry.target.classList.contains("advantage-compare")) {
      entry.target.querySelectorAll(".bar-row").forEach((row, index) => {
        const fill = row.querySelector(".bar-track span");
        const width = row.dataset.width || "0";
        if (!fill) {
          return;
        }
        anime({
          targets: fill,
          width: [`0%`, `${width}%`],
          delay: 180 + index * 120,
          duration: 1100,
          easing: "easeOutCubic"
        });
      });
    }

    observer.unobserve(entry.target);
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal, .advantage-compare").forEach((node) => observer.observe(node));

document.querySelectorAll(".count").forEach((node) => {
  const target = Number(node.dataset.count || "0");

  if (reduceMotion || !window.anime) {
    node.textContent = target % 1 === 0 ? String(target) : target.toFixed(1);
    return;
  }

  const state = { value: 0 };
  anime({
    targets: state,
    value: target,
    round: target % 1 === 0 ? 1 : 10,
    duration: 1450,
    delay: 520,
    easing: "easeOutCubic",
    update: () => {
      node.textContent = target % 1 === 0 ? String(Math.round(state.value)) : state.value.toFixed(1);
    }
  });
});
