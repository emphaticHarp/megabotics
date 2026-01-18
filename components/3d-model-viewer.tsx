'use client';

import { useEffect, useRef } from 'react';

interface Model3DViewerProps {
  type: 'robot' | 'drone' | 'automation' | 'inspection';
  className?: string;
}

export function Model3DViewer({ type, className = '' }: Model3DViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId: number;
    let rotation = 0;

    const animate = () => {
      rotation += 0.02;

      // Clear canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw different 3D shapes based on type
      switch (type) {
        case 'robot':
          drawRobot(ctx, centerX, centerY, rotation);
          break;
        case 'drone':
          drawDrone(ctx, centerX, centerY, rotation);
          break;
        case 'automation':
          drawAutomation(ctx, centerX, centerY, rotation);
          break;
        case 'inspection':
          drawInspectionRobot(ctx, centerX, centerY, rotation);
          break;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full rounded-xl ${className}`}
    />
  );
}

function drawRobot(ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Body
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(-30, -40, 60, 80);

  // Head
  ctx.fillStyle = '#1e40af';
  ctx.beginPath();
  ctx.arc(0, -50, 20, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(-8, -55, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(8, -55, 4, 0, Math.PI * 2);
  ctx.fill();

  // Arms
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-30, -20);
  ctx.lineTo(-60, -10);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(30, -20);
  ctx.lineTo(60, -10);
  ctx.stroke();

  // Legs
  ctx.beginPath();
  ctx.moveTo(-15, 40);
  ctx.lineTo(-15, 70);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(15, 40);
  ctx.lineTo(15, 70);
  ctx.stroke();

  ctx.restore();
}

function drawDrone(ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Body
  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  ctx.arc(0, 0, 15, 0, Math.PI * 2);
  ctx.fill();

  // Propellers
  ctx.strokeStyle = '#0891b2';
  ctx.lineWidth = 3;
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + rotation;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * 50, Math.sin(angle) * 50);
    ctx.stroke();

    // Propeller blades
    ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * 50, Math.sin(angle) * 50, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Camera
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(-5, 10, 10, 8);

  ctx.restore();
}

function drawAutomation(ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation * 0.5);

  // Conveyor belt
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(0, 0, 60, 30, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Boxes on conveyor
  for (let i = 0; i < 3; i++) {
    const boxX = Math.cos((rotation + i * Math.PI * 0.66) * 0.5) * 50;
    const boxY = Math.sin((rotation + i * Math.PI * 0.66) * 0.5) * 25;
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(boxX - 12, boxY - 12, 24, 24);
  }

  // Robotic arm
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-40, -40);
  ctx.lineTo(-20, -50 + Math.sin(rotation) * 10);
  ctx.lineTo(0, -40 + Math.sin(rotation * 1.5) * 15);
  ctx.stroke();

  // End effector
  ctx.fillStyle = '#e879f9';
  ctx.beginPath();
  ctx.arc(0, -40 + Math.sin(rotation * 1.5) * 15, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawInspectionRobot(ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Main body (cylindrical)
  ctx.fillStyle = '#1e40af';
  ctx.fillRect(-25, -35, 50, 70);

  // Wheels
  ctx.fillStyle = '#1e3a8a';
  ctx.beginPath();
  ctx.arc(-20, 35, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(20, 35, 12, 0, Math.PI * 2);
  ctx.fill();

  // Camera/Sensor head
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.arc(0, -40, 15, 0, Math.PI * 2);
  ctx.fill();

  // Lens
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(0, -40, 8, 0, Math.PI * 2);
  ctx.fill();

  // Articulated arm
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(25, -10);
  ctx.quadraticCurveTo(40, -20 + Math.sin(rotation) * 10, 45, -5);
  ctx.stroke();

  // Gripper
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(45, -5);
  ctx.lineTo(50, -10);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(45, -5);
  ctx.lineTo(50, 0);
  ctx.stroke();

  ctx.restore();
}
