import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const leafImages = [
  'img/leaves/leaf1.png',
  'img/leaves/leaf2.png',
];

// Custom hook to track mouse position and velocity
const useMouse = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const mouseVel = useRef({ x: 0, y: 0 });
  const prevMousePos = useRef({ x: 0, y: 0 });
  const lastTimestamp = useRef(Date.now());
  const timeoutId = useRef(null); // To reset velocity when mouse stops

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      const dt = Math.max(now - lastTimestamp.current, 1); // prevent division by zero

      const newX = e.clientX;
      const newY = e.clientY;

      const dx = newX - prevMousePos.current.x;
      const dy = newY - prevMousePos.current.y;

      mousePos.current = { x: newX, y: newY };
      mouseVel.current = { x: dx / dt, y: dy / dt };
      prevMousePos.current = { x: newX, y: newY };
      lastTimestamp.current = now;

      // Clear previous timeout
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      // Set a new timeout to reset velocity if mouse doesn't move
      timeoutId.current = setTimeout(() => {
        mouseVel.current = { x: 0, y: 0 };
      }, 50); // A short delay like 50ms should be enough
    };

    const handleMouseLeave = () => {
      mouseVel.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return { mousePos, mouseVel };
};

const Leaf = ({ mouse }) => {
  const x = useMotionValue(Math.random() * window.innerWidth);
  const y = useMotionValue(Math.random() * -window.innerHeight - 50);
  const size = useRef(Math.random() * 20 + 20);
  const mass = useRef(size.current * 0.1); // Larger leaves are heavier
  const velocity = useRef({ x: Math.random() * 2 - 1, y: Math.random() * 0.5 + 0.5 });
  const rotation = useMotionValue(Math.random() * 360);
  const rotationSpeed = useRef(Math.random() * 2 - 1);

  const springConfig = { damping: 20, stiffness: 100, mass: mass.current };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const leafSrc = leafImages[Math.floor(Math.random() * leafImages.length)];

  useEffect(() => {
    let animationFrame;

    const update = () => {
      // Apply gravity
      velocity.current.y += 0.01;

      // Wind from mouse
      const { mousePos, mouseVel } = mouse;
      const dx = x.get() - mousePos.current.x;
      const dy = y.get() - mousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) { // Interaction radius
        const force = 1 - dist / 150;
        const windStrength = 0.8; // How much the mouse "blows" the leaves
        velocity.current.x += mouseVel.current.x * force * windStrength;
        velocity.current.y += mouseVel.current.y * force * windStrength;
      }

      // Air resistance / damping
      velocity.current.x *= 0.96;
      velocity.current.y *= 0.96;

      // Update position
      x.set(x.get() + velocity.current.x);
      y.set(y.get() + velocity.current.y);
      rotation.set(rotation.get() + rotationSpeed.current);

      // Reset leaf if it goes off-screen
      if (y.get() > window.innerHeight + 50) {
        y.set(Math.random() * -100 - 50);
        x.set(Math.random() * window.innerWidth);
        velocity.current = { x: Math.random() * 2 - 1, y: Math.random() * 0.5 + 0.5 };
      }
      if (x.get() > window.innerWidth + 50) {
        x.set(-50);
      } else if (x.get() < -50) {
        x.set(window.innerWidth + 50);
      }

      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [x, y, rotation, mouse]);

  return (
    <motion.img
      src={leafSrc}
      alt="Falling leaf"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${size.current}px`,
        height: 'auto',
        x: springX,
        y: springY,
        rotate: rotation,
      }}
    />
  );
};

const FallingLeaves = ({ count = 25 }) => {
  const mouse = useMouse();
  const leaves = React.useMemo(() => Array.from({ length: count }, (_, i) => <Leaf key={i} mouse={mouse} />), [count, mouse]);

  return (
    <div className="leaves-container" style={{ pointerEvents: 'none' }}>
      {leaves}
    </div>
  );
};

export default FallingLeaves;