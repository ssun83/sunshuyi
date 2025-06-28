import React, { useState, useRef, useEffect } from 'react';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for right, -1 for left
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const galleryRef = useRef(null);
  const mouseAreaRef = useRef(null);
  const animationRef = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const resumeTimeoutRef = useRef(null);
  const portfolioSectionRef = useRef(null); // Add ref for the portfolio section

  // Project data with actual local images and enhanced details
  const portfolioItems = [
    {
      id: 1,
      image: "/img/projects/project1.png",
      title: "Advanced Analytics Platform",
      description: "A comprehensive data visualization platform built with modern web technologies, featuring real-time analytics and interactive dashboards.",
      tech: ["React", "D3.js", "Node.js", "PostgreSQL"],
      category: "Web Application"
    },
    {
      id: 2,
      image: "/img/projects/project2.png",
      title: "Mobile Fitness Companion",
      description: "Cross-platform mobile application for fitness tracking with AI-powered workout recommendations and social features.",
      tech: ["React Native", "Firebase", "TensorFlow", "Redux"],
      category: "Mobile App"
    },
    {
      id: 3,
      image: "/img/projects/project3.png",
      title: "E-Commerce Redesign",
      description: "Complete UX/UI overhaul of an enterprise e-commerce platform, focusing on conversion optimization and user experience.",
      tech: ["Figma", "React", "Stripe API", "AWS"],
      category: "UX/UI Design"
    },
    {
      id: 4,
      image: "/img/projects/project4.png",
      title: "AI Content Generator",
      description: "Intelligent content creation tool leveraging machine learning to generate high-quality written content for various industries.",
      tech: ["Python", "OpenAI API", "FastAPI", "Docker"],
      category: "AI/ML"
    },
    {
      id: 5,
      image: "/img/projects/project5.png",
      title: "Blockchain Voting System",
      description: "Secure, transparent voting platform built on blockchain technology ensuring election integrity and voter privacy.",
      tech: ["Solidity", "Web3.js", "Ethereum", "IPFS"],
      category: "Blockchain"
    },
    {
      id: 6,
      image: "/img/projects/project6.png",
      title: "Smart Home IoT Dashboard",
      description: "Unified control center for IoT devices with energy monitoring, automation rules, and predictive maintenance.",
      tech: ["Vue.js", "MQTT", "InfluxDB", "Grafana"],
      category: "IoT"
    },
    {
      id: 7,
      image: "/img/projects/project7.png",
      title: "Educational VR Experience",
      description: "Immersive virtual reality application for educational institutions, transforming traditional learning into interactive experiences.",
      tech: ["Unity", "C#", "Oculus SDK", "Blender"],
      category: "VR/AR"
    },
    {
      id: 8,
      image: "/img/projects/project8.png",
      title: "Financial Trading Bot",
      description: "Automated trading system with advanced algorithms for cryptocurrency markets, featuring risk management and portfolio optimization.",
      tech: ["Python", "TensorFlow", "Binance API", "Redis"],
      category: "FinTech"
    }
  ];

  // Create infinite array by tripling the items for seamless loop
  const infiniteItems = [...portfolioItems, ...portfolioItems, ...portfolioItems];

  // Handle project click to show details
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setIsAutoScrolling(false); // Pause auto-scroll when modal opens
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      setIsAutoScrolling(true); // Resume auto-scroll when modal closes
    }, 300);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Track page scroll position to control gallery direction
  useEffect(() => {
    const handlePageScroll = () => {
      if (!portfolioSectionRef.current) return;
      
      const portfolioSection = portfolioSectionRef.current;
      const rect = portfolioSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate the center point of the portfolio section relative to viewport
      const sectionCenter = sectionTop + (sectionHeight / 2);
      const viewportCenter = viewportHeight / 2;
      
      // Change direction based on whether we've scrolled past the section's center
      // When section center is above viewport center, scroll right
      // When section center is below viewport center, scroll left
      if (sectionCenter < viewportCenter) {
        setScrollDirection(1); // Scroll right
      } else {
        setScrollDirection(-1); // Scroll left
      }
    };

    // Set initial direction
    handlePageScroll();
    
    window.addEventListener('scroll', handlePageScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handlePageScroll);
    };
  }, []);

  // Auto-scroll with simplified logic (removed problematic direction reversal)
  useEffect(() => {
    const autoScroll = () => {
      if (!galleryRef.current || !isAutoScrolling || isModalOpen) {
        animationRef.current = requestAnimationFrame(autoScroll);
        return;
      }

      const gallery = galleryRef.current;
      const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
      const scrollSpeed = 0.8;

      // Apply scrolling based on current direction
      gallery.scrollLeft += scrollSpeed * scrollDirection;

      // Reset scroll position for infinite loop
      if (gallery.scrollLeft >= maxScrollLeft) {
        gallery.scrollLeft = gallery.scrollLeft - (maxScrollLeft / 3);
      } else if (gallery.scrollLeft <= 0) {
        gallery.scrollLeft = maxScrollLeft / 3;
      }

      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollDirection, isAutoScrolling, isModalOpen]);

  // Handle manual scroll with improved logic and smaller capture area
  useEffect(() => {
    const handleWheelScroll = (e) => {
      if (galleryRef.current && !isModalOpen) {
        e.preventDefault();
        
        // Clear any existing resume timeout
        if (resumeTimeoutRef.current) {
          clearTimeout(resumeTimeoutRef.current);
        }
        
        // Temporarily pause auto-scroll for manual control
        setIsAutoScrolling(false);
        lastScrollTime.current = Date.now();
        
        // Apply manual scroll with reduced sensitivity
        const scrollAmount = e.deltaY * 0.3;
        galleryRef.current.scrollLeft += scrollAmount;
        
        // Influence direction based on manual scroll
        if (e.deltaY > 0) {
          setScrollDirection(1); // Scrolling right
        } else if (e.deltaY < 0) {
          setScrollDirection(-1); // Scrolling left
        }
        
        // Resume auto-scroll after shorter delay
        resumeTimeoutRef.current = setTimeout(() => {
          setIsAutoScrolling(true);
        }, 800); // Reduced from 1500ms to 800ms
      }
    };

    const mouseArea = mouseAreaRef.current;
    if (mouseArea) {
      mouseArea.addEventListener('wheel', handleWheelScroll, { passive: false });
      return () => {
        mouseArea.removeEventListener('wheel', handleWheelScroll);
        if (resumeTimeoutRef.current) {
          clearTimeout(resumeTimeoutRef.current);
        }
      };
    }
  }, [isModalOpen]);

  return (
    <>
      <div id="portfolio" className="portfolio-section" ref={portfolioSectionRef}>
        {/* Section Header - Floating above the gallery */}
        <div className="portfolio-header">
          <h3 className="portfolio-title">My Works</h3>
          <p className="portfolio-subtitle">A curated selection of projects showcasing innovation and craftsmanship</p>
        </div>

        {/* Edge-to-Edge Infinite Flowing Gallery */}
        <div className="portfolio-gallery-container">
          <div 
            className="portfolio-gallery infinite-scroll" 
            ref={galleryRef}
          >
            {infiniteItems.map((project, index) => (
              <div 
                key={`${project.id}-${Math.floor(index / portfolioItems.length)}`}
                className="portfolio-item portrait-aspect"
                onClick={() => handleProjectClick(project)}
                style={{ 
                  '--animation-delay': `${(index % portfolioItems.length) * 0.1}s`,
                  '--item-index': index 
                }}
              >
                <div className="portfolio-item-inner">
                  <div className="portfolio-image-container">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="portfolio-image"
                      loading="lazy"
                    />
                    <div className="portfolio-overlay">
                      <div className="portfolio-overlay-content">
                        <h4 className="overlay-title">{project.title}</h4>
                        <span className="overlay-category">{project.category}</span>
                        <div className="overlay-cta">Click to explore</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Smaller Mouse Control Area */}
          <div className="mouse-control-area" ref={mouseAreaRef}></div>

          {/* Flow Direction Indicator */}
          <div className="flow-indicator">
            <div className={`flow-arrow ${scrollDirection === 1 ? 'right' : 'left'}`}>
              {scrollDirection === 1 ? '→' : '←'}
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div 
          className={`portfolio-modal ${isModalOpen ? 'modal-open' : 'modal-closing'}`}
          onClick={closeModal}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close" 
              onClick={closeModal}
              aria-label="Close project details"
            >
              ×
            </button>
            
            <div className="modal-body">
              <div className="modal-image-section">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="modal-image"
                />
              </div>
              
              <div className="modal-details-section">
                <div className="modal-header">
                  <span className="modal-category">{selectedProject.category}</span>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                </div>
                
                <p className="modal-description">{selectedProject.description}</p>
                
                <div className="modal-tech-stack">
                  <h4>Technologies Used</h4>
                  <div className="tech-tags">
                    {selectedProject.tech.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button className="btn-primary">View Live Project</button>
                  <button className="btn-secondary">View Source Code</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio; 