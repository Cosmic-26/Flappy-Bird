(() => {
  const canvas = document.querySelector('canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  const title = document.querySelector('[data-game-title]');
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ffcf5a';
  const number = Number(document.body.dataset.game || 1);
  const gameName = title?.textContent || `Game ${number}`;
  const mode = number % 3;
  const objective = ['Dodge the red meteors', 'Collect the green sparks', 'Hit the moving target'][mode];
  let width = 0, height = 0, score = 0, running = false, player, objects, last = 0, animation;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function reset() {
    score = 0; player = { x: width * .18, y: height * .5, size: Math.max(15, width * .035), vy: 0 };
    objects = []; running = true; last = performance.now(); cancelAnimationFrame(animation); animation = requestAnimationFrame(frame);
  }
  function act() { if (!running) reset(); player.vy = -height * .0085; player.y = Math.max(25, player.y - height * .08); }
  function spawn() { objects.push({ x: width + 20, y: height * (.18 + Math.random() * .64), size: Math.max(13, width * .025), speed: width * (.00022 + (number % 5) * .000025), good: mode === 1 }); }
  function frame(now) {
    const delta = Math.min(now - last, 40); last = now;
    context.clearRect(0, 0, width, height);
    const gradient = context.createLinearGradient(0, 0, width, height); gradient.addColorStop(0, '#263b48'); gradient.addColorStop(1, '#101820'); context.fillStyle = gradient; context.fillRect(0, 0, width, height);
    context.globalAlpha = .16;
    for (let i = 0; i < 9; i++) { context.fillStyle = accent; context.fillRect((i * 137 + score * 2) % width, (i * 61) % height, 2, 2); }
    context.globalAlpha = 1;
    player.vy += height * .00042 * delta; player.y += player.vy * delta;
    if (objects.length === 0 || objects[objects.length - 1].x < width * .58) spawn();
    objects.forEach(object => { object.x -= object.speed * delta; });
    objects = objects.filter(object => object.x > -40);
    context.fillStyle = accent; context.beginPath(); context.arc(player.x, player.y, player.size, 0, Math.PI * 2); context.fill();
    objects.forEach(object => { context.fillStyle = object.good ? '#70e1a0' : '#f06d5d'; context.beginPath(); context.arc(object.x, object.y, object.size, 0, Math.PI * 2); context.fill(); });
    objects.forEach(object => { if (Math.hypot(player.x - object.x, player.y - object.y) < player.size + object.size) { if (mode === 0 && !object.good) return finish(); score += object.good ? 3 : -2; object.x = -100; } });
    const hit = player.y < -player.size || player.y > height + player.size;
    if (hit) { running = false; drawMessage('ROUND OVER', 'Tap or press Space to try again'); return; }
    score += delta * .01; drawHud(); animation = requestAnimationFrame(frame);
  }
  function finish() { running = false; drawMessage('ROUND OVER', 'Tap or press Space to try again'); }
  function drawHud() { context.fillStyle = '#fff'; context.font = '700 15px Arial'; context.fillText(`${gameName}  ·  ${Math.floor(score)}`, 18, 28); context.fillStyle = '#a8b0b2'; context.font = '12px Arial'; context.fillText(objective, 18, 47); }
  function drawMessage(label, sublabel) { drawHud(); context.textAlign = 'center'; context.fillStyle = '#fff'; context.font = '400 30px Georgia'; context.fillText(label, width / 2, height / 2 - 8); context.fillStyle = '#a8b0b2'; context.font = '13px Arial'; context.fillText(sublabel, width / 2, height / 2 + 22); context.textAlign = 'start'; }
  window.addEventListener('resize', () => { resize(); if (!running) { drawMessage(gameName.toUpperCase(), 'Tap or press Space to begin'); } });
  window.addEventListener('keydown', event => { if (event.code === 'Space' || event.code === 'Enter' || event.code.startsWith('Arrow')) { event.preventDefault(); act(); } });
  canvas.addEventListener('pointerdown', act);
  resize(); drawMessage(gameName.toUpperCase(), 'Tap or press Space to begin');
})();
