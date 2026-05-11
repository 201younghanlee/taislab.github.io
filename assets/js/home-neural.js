(function () {
  const canvas = document.getElementById("home-neural-canvas");
  if (!canvas) return;

  const hero = canvas.closest(".home-hero");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = { x: 0, y: 0, active: false };
  let nodes = [];
  let dpr = 1;
  let width = 0;
  let height = 0;
  let animationFrame = null;

  function resize() {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }

    const rect = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedNodes();
    draw(0);
  }

  function seedNodes() {
    const area = width * height;
    const count = Math.max(42, Math.min(110, Math.round(area / 15500)));
    nodes = Array.from({ length: count }, (_, index) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.035 + Math.random() * 0.08;
      const depth = 0.55 + Math.random() * 0.75;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed * depth,
        vy: Math.sin(angle) * speed * depth,
        radius: 1.1 + Math.random() * 2.3 * depth,
        phase: Math.random() * Math.PI * 2,
        pulse: index % 6 === 0,
        depth,
      };
    });
  }

  function moveNodes(time) {
    nodes.forEach((node) => {
      const sway = Math.sin(time / 1800 + node.phase) * 0.045 * node.depth;
      node.x += node.vx + Math.cos(node.phase) * sway;
      node.y += node.vy + Math.sin(node.phase) * sway;

      if (pointer.active) {
        const dx = node.x - pointer.x;
        const dy = node.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        if (distance < 190) {
          const force = (190 - distance) / 190;
          node.x += (dx / distance) * force * 0.55;
          node.y += (dy / distance) * force * 0.55;
        }
      }

      if (node.x < -30) node.x = width + 30;
      if (node.x > width + 30) node.x = -30;
      if (node.y < -30) node.y = height + 30;
      if (node.y > height + 30) node.y = -30;
    });
  }

  function draw(time) {
    if (!reduceMotion) moveNodes(time);
    ctx.clearRect(0, 0, width, height);

    const linkDistance = width < 600 ? 112 : 165;
    const signal = (time / 4200) % 1;

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > linkDistance) continue;

        const strength = 1 - distance / linkDistance;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(105, 226, 255, ${0.07 + strength * 0.24})`;
        ctx.lineWidth = 0.35 + strength * 0.85;
        ctx.stroke();

        if ((i + j) % 17 === 0) {
          const travel = (signal + ((i % 5) * 0.13)) % 1;
          const x = a.x + (b.x - a.x) * travel;
          const y = a.y + (b.y - a.y) * travel;
          ctx.beginPath();
          ctx.arc(x, y, 1.3 + strength * 2.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.18 + strength * 0.48})`;
          ctx.fill();
        }
      }
    }

    nodes.forEach((node) => {
      const shimmer = node.pulse ? (Math.sin(time / 980 + node.phase) + 1) / 2 : 0.28;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + shimmer * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(126, 238, 255, ${0.18 + shimmer * 0.36})`;
      ctx.fill();
    });

    if (!reduceMotion) animationFrame = window.requestAnimationFrame(draw);
  }

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  });

  hero.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  window.addEventListener("resize", resize);
  resize();
})();
