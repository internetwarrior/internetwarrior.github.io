import React, { useEffect, useRef } from 'react';

function RainEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    const mp = 80;
    const particles = [];

    for (let i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        l: Math.random() * 10 + 10,
        xs: -2 + Math.random() * 2,
        ys: 8 + Math.random() * 4,
      });
    }

    function update() {
      for (let i = 0; i < mp; i++) {
        const p = particles[i];

        p.x += p.xs;
        p.y += p.ys;

        if (p.y > H) {
          p.y = -20;
          p.x = Math.random() * W;
        }

        if (p.x > W || p.x < 0) {
          p.x = Math.random() * W;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(173,216,230,0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let i = 0; i < mp; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.xs, p.y + p.l);
      }

      ctx.stroke();
      update();
    }

    const interval = setInterval(draw, 30);

    return () => clearInterval(interval);
  }, []);

  return <canvas className=' bg-transparent' ref={canvasRef} />;
}

export default RainEffect;
