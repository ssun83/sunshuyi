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
      image: `${process.env.PUBLIC_URL}/img/projects/biocosme.png`,
      title: "BioCosMe: Lip-based Biosensors",
      description: "Lip-based cosmetics with colorimetric biosensors for salivary analysis using deep learning. Features CNN model for pH detection through color variation with mobile app integration.",
      tech: ["React Native", "TensorFlow", "CNN", "Colorimetric Sensors", "Deep Learning"],
      category: "Beauty Technology",
      doi: "https://doi.org/10.1145/3675095.3676610"
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/img/projects/chromalipsense.png`,
      title: "ChromaLipSense: Metabolic Monitoring Lipstick",
      description: "Innovative lipstick design that seamlessly embeds colorimetric biosensors for pH detection. Features DIY fabrication process using skin-safe materials and color detection system.",
      tech: ["Biosensors", "DIY Fabrication", "Colorimetric Analysis", "Mobile App"],
      category: "Biosensors",
      doi: "https://doi.org/10.1080/14606925.2025.2516592"
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/img/projects/pawh.png`,
      title: "pawH: Pet Health Monitoring Toys",
      description: "Colorimetric pH-sensing toys for non-invasive pet health monitoring. Uses pets' natural play behaviors to analyze saliva pH through color changes with spectrometer analysis.",
      tech: ["Colorimetric Sensors", "Spectrometer", "Mobile App", "Pet-Safe Materials"],
      category: "Animal-Computer Interaction",
      doi: "https://doi.org/10.1145/3715336.3735768"
    },
    {
      id: 4,
      image: `${process.env.PUBLIC_URL}/img/projects/glucat.png`,
      title: "GluCAT: Feline Glucose Monitoring",
      description: "IoT hub for electrochemical glucose biosensing in feline urine. Features biosensing litter box with potentiostat and Wi-Fi connectivity for comprehensive diabetes monitoring.",
      tech: ["Electrochemical Biosensors", "IoT", "Wi-Fi", "Potentiostat", "Database"],
      category: "IoT/Smart Home",
      doi: "https://doi.org/10.1145/3623509.3635250"
    },
    {
      id: 5,
      image: `${process.env.PUBLIC_URL}/img/projects/circat.png`,
      title: "cirCAT: Smart Home for Cats",
      description: "Comprehensive smart home system designed for cats and caregivers. Integrates smart devices like litter boxes, scales, feeders for holistic health monitoring and early detection.",
      tech: ["IoT Devices", "Smart Sensors", "Data Visualization", "Mobile App"],
      category: "Animal-Computer Interaction",
      doi: "https://doi.org/10.1145/3637882.3637901"
    },
    {
      id: 6,
      image: `${process.env.PUBLIC_URL}/img/projects/purrtentio.png`,
      title: "PURRtentio: Smart Litter Box",
      description: "Electrochemical biosensor-equipped litter box for continuous monitoring of analytes in feline urine. Features DIY three-electrode biosensor with rinsing mechanism for extended sensor life.",
      tech: ["Electrochemical Biosensors", "Microcontroller", "ToF Sensor", "Mobile App"],
      category: "Biosensors",
      doi: "https://doi.org/10.1145/3637882.3637887"
    },
    {
      id: 7,
      image: `${process.env.PUBLIC_URL}/img/projects/biosparks.png`,
      title: "BioSparks: Biosensor Jewelry",
      description: "Electrochemical sweat biosensors crafted with traditional jewelry techniques. Features modular, repurposing design with interchangeable electrodes for glucose level detection.",
      tech: ["Electrochemical Biosensors", "Wearable Design", "Jewelry Techniques", "Glucose Detection"],
      category: "Wearable Technology",
      doi: "https://doi.org/10.1145/3594739.3610787"
    },
    {
      id: 8,
      image: `${process.env.PUBLIC_URL}/img/projects/wooflex.png`,
      title: "WOOFlex: Canine Exercise Aid",
      description: "Wearable device to aid canine flexibility exercises with IMU sensors for joint angle measurement. Provides real-time visual and audio feedback for safe exercise ranges.",
      tech: ["IMU Sensors", "Web Application", "Real-time Feedback", "Wearable Design"],
      category: "Animal-Computer Interaction",
      doi: "https://doi.org/10.1145/3493842.3493903"
    },
    {
      id: 9,
      image: `${process.env.PUBLIC_URL}/img/projects/gemini.png`,
      title: "GemiN' I: Seamless Skin Interfaces",
      description: "Beauty Technology that embeds sensors in facial gems to detect facial muscle movements, enabling discrete communication with smart home devices through unconscious behaviors like frowning.",
      tech: ["Facial Sensors", "Smart Home Integration", "Beauty Technology", "Gesture Recognition"],
      category: "Beauty Technology",
      doi: "https://doi.org/10.1145/3458709.3458997"
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
                  <button 
                    className="btn-primary"
                    onClick={() => window.open(selectedProject.doi, '_blank')}
                  >
                    View Paper
                  </button>
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