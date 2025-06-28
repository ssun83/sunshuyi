import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  // State to track navbar background animation (initial entrance)
  const [navbarAnimated, setNavbarAnimated] = useState(false);
  // State to track scroll position for dynamic effects
  const [scrollY, setScrollY] = useState(0);

  // Handle navbar entrance animation on page load
  useEffect(() => {
    // Start the navbar background animation after a brief delay for a smooth entrance
    const timer = setTimeout(() => {
      setNavbarAnimated(true);
    }, 300); // 300ms delay before starting the animation

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events for dynamic navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add smooth scroll listener with throttling for performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    
    // Cleanup function to remove event listener
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  // Smooth scroll function for navigation links
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="App">
      {/* Header with navigation - now has dynamic scroll effects */}
      <Header 
        navbarAnimated={navbarAnimated} 
        scrollY={scrollY}
        scrollToSection={scrollToSection} 
      />
      
      {/* Hero section */}
      <Hero />
      
      {/* About section */}
      <About />
      
      {/* Resume/Skills section */}
      <Resume />
      
      {/* Portfolio section */}
      <Portfolio />
      
      {/* Contact section */}
      <Contact />
    </div>
  );
}

export default App;
