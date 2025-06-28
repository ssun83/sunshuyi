import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from './ThemeContext';

// Custom hook to track mouse position and velocity, independent of scroll
const useMouse = () => {
  const mousePos = useRef({ x: 0, y: 0 }); // Position in document coordinates
  const mouseVel = useRef({ x: 0, y: 0 }); // Velocity in viewport coordinates
  const prevClientMousePos = useRef({ x: 0, y: 0 });
  const lastTimestamp = useRef(Date.now());
  const timeoutId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      const dt = Math.max(now - lastTimestamp.current, 1);

      const clientX = e.clientX;
      const clientY = e.clientY;

      // Velocity is calculated from viewport coordinates to ignore scroll
      const dx = clientX - prevClientMousePos.current.x;
      const dy = clientY - prevClientMousePos.current.y;
      mouseVel.current = { x: dx / dt, y: dy / dt };

      // Position is stored in document coordinates for accurate interaction
      mousePos.current = { x: clientX, y: clientY + window.scrollY };

      prevClientMousePos.current = { x: clientX, y: clientY };
      lastTimestamp.current = now;

      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => {
        mouseVel.current = { x: 0, y: 0 };
      }, 50);
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

const Leaf = ({ mouse, pageHeight, itemIndex, currentConfig }) => {
  const x = useMotionValue(Math.random() * window.innerWidth);
  const y = useMotionValue(Math.random() * -window.innerHeight - 50);
  const size = useRef(Math.random() * 20 + 20);
  const mass = useRef(size.current * 0.1);
  const velocity = useRef({ x: Math.random() * 2 - 1, y: Math.random() * 0.5 + 0.5 });
  const rotation = useMotionValue(Math.random() * 360);
  const rotationSpeed = useRef(Math.random() * 2 - 1);

  // Enhanced spring config for smoother theme transitions
  const springConfig = { damping: 25, stiffness: 120, mass: mass.current };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Get the current falling object image from theme config
  const fallingObjectSrc = currentConfig.fallInObjects[itemIndex % currentConfig.fallInObjects.length];

  useEffect(() => {
    let animationFrame;

    const update = () => {
      // Slightly different gravity for paws vs leaves for variety
      const gravityStrength = currentConfig.name.includes('Cat') ? 0.008 : 0.01;
      velocity.current.y += gravityStrength;

      const { mousePos, mouseVel } = mouse;
      const dx = x.get() - mousePos.current.x;
      const dy = y.get() - mousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Enhanced interaction radius and responsiveness
      if (dist < 150) {
        const force = 1 - dist / 150;
        const windStrength = currentConfig.name.includes('Cat') ? 0.9 : 0.8; // Paws are more responsive
        velocity.current.x += mouseVel.current.x * force * windStrength;
        velocity.current.y += mouseVel.current.y * force * windStrength;
      }

      // Enhanced damping for smoother movement
      velocity.current.x *= 0.97;
      velocity.current.y *= 0.97;

      x.set(x.get() + velocity.current.x);
      y.set(y.get() + velocity.current.y);
      rotation.set(rotation.get() + rotationSpeed.current);

      const bottomBoundary = pageHeight > 0 ? pageHeight : window.innerHeight;
      if (y.get() > bottomBoundary + 50) {
        y.set(Math.random() * -200 - 50); // Reset to top of document
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
  }, [x, y, rotation, mouse, pageHeight, currentConfig]);

  return (
    <motion.img
      src={`${process.env.PUBLIC_URL}/${fallingObjectSrc}`}
      alt={currentConfig.name.includes('Cat') ? "Falling paw" : "Falling leaf"}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${size.current}px`,
        height: 'auto',
        x: springX,
        y: springY,
        rotate: rotation,
        // Add beautiful transition when switching between themes
        opacity: 1,
        filter: currentConfig.name.includes('Cat') ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
      }}
      // Beautiful entrance animation when theme switches
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.175, 0.885, 0.32, 1.275] // Sexy spring curve
      }}
    />
  );
};

const FallingLeaves = ({ count = 25 }) => {
  const mouse = useMouse();
  const [pageHeight, setPageHeight] = useState(0);
  
  // Get theme context for dynamic switching
  const { getCurrentConfig } = useTheme();
  const currentConfig = getCurrentConfig();

  useEffect(() => {
    const updateHeight = () => {
      setPageHeight(document.documentElement.scrollHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Generate falling objects with theme-aware randomization
  const fallingObjects = React.useMemo(() => (
    Array.from({ length: count }, (_, i) => 
      <Leaf 
        key={`${currentConfig.name}-${i}`} // Key changes with theme for smooth transitions
        mouse={mouse} 
        pageHeight={pageHeight}
        itemIndex={i}
        currentConfig={currentConfig}
      />
    )
  ), [count, mouse, pageHeight, currentConfig]);

  return (
    <div
      className="falling-objects-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: pageHeight > 0 ? `${pageHeight}px` : '100vh',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
        // Beautiful theme transition effects
        transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
    >
      {fallingObjects}
    </div>
  );
};

export default FallingLeaves;