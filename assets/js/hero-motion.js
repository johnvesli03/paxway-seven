(() => {
  const hero = document.querySelector(".hero.hero-motion");
  if (!hero) return;

  // Optional debug (remove later)
  // console.log("hero-motion.js loaded");

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduce) return;

  const baseInner = hero.querySelector(".hero-bg--base .hero-bg-inner");
  const glowInner = hero.querySelector(".hero-bg--glow .hero-bg-inner");
  if (!baseInner || !glowInner) return;

  let tx = 0, ty = 0, cx = 0, cy = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function setTarget(x, y){
    const r = hero.getBoundingClientRect();
    const nx = ((x - r.left) / r.width) * 2 - 1;
    const ny = ((y - r.top)  / r.height) * 2 - 1;
    tx = clamp(nx, -1, 1);
    ty = clamp(ny, -1, 1);
  }

  hero.addEventListener("mousemove", (e) => setTarget(e.clientX, e.clientY), { passive: true });
  hero.addEventListener("touchmove", (e) => {
    const t = e.touches && e.touches[0];
    if (t) setTarget(t.clientX, t.clientY);
  }, { passive: true });

  function loop(){
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;

    baseInner.style.setProperty("--mx", `${(cx * 10).toFixed(2)}px`);
    baseInner.style.setProperty("--my", `${(cy * 7).toFixed(2)}px`);

    glowInner.style.setProperty("--mx", `${(cx * 18).toFixed(2)}px`);
    glowInner.style.setProperty("--my", `${(cy * 12).toFixed(2)}px`);

    requestAnimationFrame(loop);
  }

  loop();
})();
