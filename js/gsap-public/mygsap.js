gsap.to("#habibi", { duration: 1.5, delay: 1.5, text: "Habibi" });

gsap.from("#skill", { duration: 1.5, delay: 1.5, x: -200, opacity: 0, ease: "back" });

gsap.from(".imghabibi", {
  duration: 0.4,
  delay: 1,
  scale: 0.01,
  opacity: 0,
  ease: "back.out(1, 0.3)",
});
