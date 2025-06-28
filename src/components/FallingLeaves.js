import React from 'react';
import { motion } from 'framer-motion';

const leafImages = [
  'img/leaves/leaf1.png',
  'img/leaves/leaf2.png',
];

const generateLeaf = (index) => {
  const style = {
    position: 'absolute',
    top: '-50px',
    left: `${Math.random() * 100}vw`,
    width: `${Math.random() * 20 + 20}px`,
    height: 'auto',
  };

  const leafSrc = leafImages[Math.floor(Math.random() * leafImages.length)];
  const duration = Math.random() * 8 + 12; // Slower, more gentle fall
  const delay = Math.random() * 15;
  const initialRotation = Math.random() * 360;
  const sway = Math.random() * 100 - 50; // Horizontal movement

  return {
    id: `leaf-${index}`,
    style,
    src: leafSrc,
    animate: {
      y: '100vh',
      x: [0, sway, -sway, 0],
      rotate: [initialRotation, initialRotation + 180, initialRotation + 360, initialRotation + 540],
      transition: {
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      },
    },
    initial: {
      y: '-10vh', // Start above the viewport
      x: 0,
      rotate: initialRotation,
    }
  };
};

const FallingLeaves = ({ count = 20 }) => {
  const leaves = React.useMemo(() => Array.from({ length: count }, (_, i) => generateLeaf(i)), [count]);

  return (
    <div className="leaves-container">
      {leaves.map(leaf => (
        <motion.img
          key={leaf.id}
          src={leaf.src}
          alt="Falling leaf"
          style={leaf.style}
          initial={leaf.initial}
          animate={leaf.animate}
        />
      ))}
    </div>
  );
};

export default FallingLeaves; 