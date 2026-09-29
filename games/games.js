(() => {
  const canvas = document.querySelector('canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  const title = document.querySelector('[data-game-title]');
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ffcf5a';
  const number = Number(document.body.dataset.game || 1);
  const names = ['Neon Drift', 'Orbital Dash', 'Cinder Run', 'Moon Miner', 'Pixel Current', 'Star Hopper', 'Echo Valley', 'Crystal Dodge', 'Solar Sprint', 'Cloud Circuit'];
  const gameName = title?.textContent || names[(number - 1) % names.length];
  let width = 0, height = 0, score = 0, running = false, player, hazards, last = 0, animation;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function reset() {
    score = 0; player = { x: width * .16, y: height * .5, size: Math.max(15, width * .035), vy: 0 };
    hazards = []; running = true; last = performance.now(); cancelAnimationFrame(animation); animation = requestAnimationFrame(frame);
  }
  function boost() { if (!running) reset(); player.vy = -height * .0085; }
  function spawn() { hazards.push({ x: width + 20, y: height * (.18 + Math.random() * .64), size: Math.max(13, width * .025), speed: width * (.00022 + (number % 5) * .000025) }); }
  function frame(now) {
    const delta = Math.min(now - last, 40); last = now;
    context.clearRect(0, 0, width, height);
    const gradient = context.createLinearGradient(0, 0, width, height); gradient.addColorStop(0, '#263b48'); gradient.addColorStop(1, '#101820'); context.fillStyle = gradient; context.fillRect(0, 0, width, height);
    context.globalAlpha = .16;
    for (let i = 0; i < 9; i++) { context.fillStyle = accent; context.fillRect((i * 137 + score * 2) % width, (i * 61) % height, 2, 2); }
    context.globalAlpha = 1;
    player.vy += height * .00042 * delta; player.y += player.vy * delta;
    if (hazards.length === 0 || hazards[hazards.length - 1].x < width * .58) spawn();
    hazards.forEach(hazard => { hazard.x -= hazard.speed * delta; });
    hazards = hazards.filter(hazard => hazard.x > -40);
    context.fillStyle = accent; context.beginPath(); context.arc(player.x, player.y, player.size, 0, Math.PI * 2); context.fill();
    hazards.forEach(hazard => { context.fillStyle = '#f06d5d'; context.beginPath(); context.arc(hazard.x, hazard.y, hazard.size, 0, Math.PI * 2); context.fill(); });
    const hit = player.y < -player.size || player.y > height + player.size || hazards.some(hazard => Math.hypot(player.x - hazard.x, player.y - hazard.y) < player.size + hazard.size);
    if (hit) { running = false; drawMessage('ROUND OVER', 'Tap or press Space to try again'); return; }
    score += delta * .01; drawHud(); animation = requestAnimationFrame(frame);
  }
  function drawHud() { context.fillStyle = '#fff'; context.font = '700 15px Arial'; context.fillText(`${gameName}  ·  ${Math.floor(score)}`, 18, 28); }
  function drawMessage(label, sublabel) { drawHud(); context.textAlign = 'center'; context.fillStyle = '#fff'; context.font = '400 30px Georgia'; context.fillText(label, width / 2, height / 2 - 8); context.fillStyle = '#a8b0b2'; context.font = '13px Arial'; context.fillText(sublabel, width / 2, height / 2 + 22); context.textAlign = 'start'; }
  window.addEventListener('resize', () => { resize(); if (!running) { drawMessage(gameName.toUpperCase(), 'Tap or press Space to begin'); } });
  window.addEventListener('keydown', event => { if (event.code === 'Space' || event.code === 'Enter') { event.preventDefault(); boost(); } });
  canvas.addEventListener('pointerdown', boost);
  resize(); drawMessage(gameName.toUpperCase(), 'Tap or press Space to begin');
})();
