'use client';

import { useEffect, useRef } from 'react';

export function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animated 3D-like shapes
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;

      // Clear canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw rotating cubes/shapes
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Cube 1 - Blue
      drawRotatingCube(ctx, centerX - 150, centerY, time, '#3b82f6', 80);

      // Cube 2 - Cyan
      drawRotatingCube(ctx, centerX + 150, centerY, time + 2, '#06b6d4', 80);

      // Cube 3 - Purple
      drawRotatingCube(ctx, centerX, centerY - 120, time + 4, '#a855f7', 60);

      // Floating particles
      drawParticles(ctx, canvas.width, canvas.height, time);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
    />
  );
}

function drawRotatingCube(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  time: number,
  color: string,
  size: number
) {
  const rotX = time;
  const rotY = time * 0.7;
  const rotZ = time * 0.5;

  // Define cube vertices
  const vertices = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ];

  // Rotate vertices
  const rotated = vertices.map((v) => rotateVertex(v, rotX, rotY, rotZ));

  // Project to 2D
  const projected = rotated.map((v) => [
    x + v[0] * size,
    y + v[1] * size,
  ]);

  // Draw edges
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.6;

  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];

  edges.forEach(([start, end]) => {
    ctx.beginPath();
    ctx.moveTo(projected[start][0], projected[start][1]);
    ctx.lineTo(projected[end][0], projected[end][1]);
    ctx.stroke();
  });

  ctx.globalAlpha = 1;
}

function rotateVertex(
  v: number[],
  rotX: number,
  rotY: number,
  rotZ: number
): number[] {
  let [x, y, z] = v;

  // Rotate around X
  let y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
  let z1 = y * Math.sin(rotX) + z * Math.cos(rotX);
  y = y1;
  z = z1;

  // Rotate around Y
  let x2 = x * Math.cos(rotY) + z * Math.sin(rotY);
  z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
  x = x2;
  z = z1;

  // Rotate around Z
  let x3 = x * Math.cos(rotZ) - y * Math.sin(rotZ);
  y1 = x * Math.sin(rotZ) + y * Math.cos(rotZ);
  x = x3;
  y = y1;

  return [x, y, z];
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';

  for (let i = 0; i < 20; i++) {
    const x = (Math.sin(time + i) * width) / 2 + width / 2;
    const y = (Math.cos(time * 0.7 + i) * height) / 2 + height / 2;
    const size = Math.sin(time + i * 0.5) * 2 + 3;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}
