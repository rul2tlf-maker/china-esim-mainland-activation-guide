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
    targets: [".ring-a", ".ring-b", ".ring-c"],
    rotate: 360,
    duration: 18000,
    easing: "linear",
    loop: true
  });

  anime({
    targets: ".signal-dot",
    scale: [0.9, 1.25],
    opacity: [0.7, 1],
    duration: 1700,
    direction: "alternate",
    easing: "easeInOutSine",
    loop: true
  });

  anime({
    targets: ".hero-pills li",
    translateY: [16, 0],
    opacity: [0, 1],
    delay: anime.stagger(80, { start: 420 }),
    duration: 700,
    easing: "easeOutQuad"
  });

  anime({
    targets: ".path-line span",
    width: ["0%", "100%"],
    duration: 1500,
    delay: 650,
    easing: "easeInOutQuart"
  });
} else {
  document.querySelectorAll(".reveal").forEach((node) => {
    node.style.opacity = "1";
    node.style.transform = "none";
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

    observer.unobserve(entry.target);
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

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
    duration: 1500,
    delay: 500,
    easing: "easeOutCubic",
    update: () => {
      node.textContent = target % 1 === 0 ? String(Math.round(state.value)) : state.value.toFixed(1);
    }
  });
});
