const { anime } = window;

anime({
  targets: ".hero-content",
  opacity: [0, 1],
  translateY: [28, 0],
  duration: 1200,
  easing: "easeOutCubic"
});

anime({
  targets: ".image-card img",
  scale: [1.08, 1],
  duration: 1600,
  delay: anime.stagger(120),
  easing: "easeOutCubic"
});

anime({
  targets: ".step-item, .text-card, .panel-inner",
  opacity: [0, 1],
  translateY: [24, 0],
  delay: anime.stagger(90),
  duration: 900,
  easing: "easeOutQuad"
});

document.querySelectorAll(".image-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    anime({
      targets: card.querySelector("img"),
      scale: 1.04,
      duration: 420,
      easing: "easeOutQuad"
    });
  });

  card.addEventListener("mouseleave", () => {
    anime({
      targets: card.querySelector("img"),
      scale: 1,
      duration: 420,
      easing: "easeOutQuad"
    });
  });
});
