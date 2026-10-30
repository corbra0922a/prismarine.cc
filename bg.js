const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
const LINK = 140;
let dots = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const count = Math.min(90, Math.floor((innerWidth * innerHeight) / 16000));
  dots = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
  }));
}

// Dots wrap around a margin past each edge so they drift off-screen and re-enter from the other side
function wrap(v, max) {
  if (v < -LINK) return max + LINK;
  if (v > max + LINK) return -LINK;
  return v;
}

function frame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const d of dots) {
    d.x = wrap(d.x + d.vx, canvas.width);
    d.y = wrap(d.y + d.vy, canvas.height);
  }
  // Each pair gets a line whose opacity fades with distance
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
      if (dist < LINK) {
        ctx.strokeStyle = `rgba(127, 209, 196, ${0.25 * (1 - dist / LINK)})`;
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }
  ctx.fillStyle = "rgba(127, 209, 196, 0.6)";
  for (const d of dots) {
    ctx.beginPath();
    ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(frame);
}

addEventListener("resize", resize);
resize();
frame();
