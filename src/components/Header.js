import React, { useState, useEffect, useRef } from 'react';
import { theme, createHeaderGlassEffect, createSpringTransition } from '../theme/theme.js';

const Header = ({ navbarAnimated, scrollY, scrollToSection }) => {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);

  // Mobile detection with window resize handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [mobileMenuOpen]);

  // Close mobile menu when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Calculate dynamic values based on scroll position for ebb and flow effects
  const scrollRatio = Math.min(scrollY / 500, 1); // Normalize scroll to 0-1 over first 500px
  const scrollWave = Math.sin(scrollY * 0.005) * 0.1; // Create a subtle wave effect
  
  // Dynamic blur intensity - starts at base blur and gets more intense with scroll
  const dynamicBlur = navbarAnimated 
    ? `blur(${10 + scrollRatio * 5 + Math.abs(scrollWave) * 3}px)` 
    : 'blur(0px)';
  
  // Dynamic opacity - subtle breathing effect with scroll
  const dynamicOpacity = navbarAnimated 
    ? Math.min(0.85 + scrollRatio * 0.15 + scrollWave * 0.05, 1)
    : 0;
  
  // Dynamic background intensity - gets more opaque with scroll
  const dynamicBgOpacity = 0.3 + scrollRatio * 0.2 + Math.abs(scrollWave) * 0.1;
  
  // Dynamic scale - very subtle breathing effect
  const dynamicScale = 1 + scrollWave * 0.002;

  // Close mobile menu when clicking nav items
  const handleMobileNavClick = (section) => {
    setMobileMenuOpen(false);
    scrollToSection(section);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Dynamic styles based on animation state and scroll position
  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1000,
    padding: `${theme.spacing[12]} 0`,
    
    // Smooth transitions for all dynamic properties
    transition: navbarAnimated 
      ? 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)' // Smooth follow transition when animated
      : 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.175)', // Initial entrance animation
    
    // Dynamic glass effect with scroll-responsive properties
    background: `rgba(0, 0, 0, ${dynamicBgOpacity})`,
    backdropFilter: dynamicBlur,
    WebkitBackdropFilter: dynamicBlur,
    borderBottom: `1px solid rgba(255, 255, 255, ${0.1 + scrollRatio * 0.1})`,
    boxShadow: `0 8px 32px 0 rgba(0, 0, 0, ${0.2 + scrollRatio * 0.15})`,
    
    // Animation states with dynamic effects
    opacity: dynamicOpacity,
    
    // Subtle transform animation with breathing effect
    transform: navbarAnimated 
      ? `translateY(0) scale(${dynamicScale})` 
      : 'translateY(-10px) scale(1)',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${theme.spacing[24]}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  // Dynamic text properties that respond to scroll
  const textOpacity = Math.min(0.9 + scrollRatio * 0.1, 1);
  const textGlow = scrollRatio > 0.3 ? `0 0 8px rgba(255, 255, 255, ${scrollRatio * 0.2})` : 'none';

  const brandStyle = {
    // Using theme typography for the brand
    ...theme.typography.title2,
    fontWeight: 700,
    color: theme.colors.dark.textPrimary,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '1px',
    
    // Ensure it stays on one line on mobile
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    
    // Mobile specific width constraints
    maxWidth: isMobile ? 'calc(100vw - 120px)' : '100%',
    
    // Dynamic text effects based on scroll
    opacity: navbarAnimated ? textOpacity : 0,
    textShadow: textGlow,
    
    // Entrance animation for the brand text with dynamic follow
    transform: navbarAnimated 
      ? `translateX(${scrollWave * 2}px)` // Subtle horizontal sway
      : 'translateX(-20px)',
    transition: navbarAnimated
      ? 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)' // Smooth follow
      : 'all 1.0s cubic-bezier(0.175, 0.885, 0.32, 1.1)', // Initial entrance
    
    '&:hover': {
      color: theme.colors.dark.brand,
    },
    
    '&:focus': {
      outline: `2px solid ${theme.colors.light.brand}`,
      outlineOffset: '2px',
    },
  };

  const navMenuStyle = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: theme.spacing[8],
    listStyle: 'none',
    margin: 0,
    padding: 0,
    
    // Dynamic effects for nav menu
    opacity: navbarAnimated ? textOpacity : 0,
    filter: scrollRatio > 0.2 ? `drop-shadow(0 0 4px rgba(255, 255, 255, ${scrollRatio * 0.1}))` : 'none',
    
    // Entrance animation for the nav menu with subtle counter-sway
    transform: navbarAnimated 
      ? `translateX(${-scrollWave * 1.5}px)` // Subtle counter-sway to brand
      : 'translateX(20px)',
    transition: navbarAnimated
      ? 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)' // Smooth follow
      : 'all 1.1s cubic-bezier(0.175, 0.885, 0.32, 1.15)', // Initial entrance
  };

  const navItemStyle = {
    display: 'inline-block',
  };

  const navLinkStyle = {
    // Using theme typography for nav links
    ...theme.typography.button,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: theme.colors.dark.textPrimary,
    padding: `${theme.spacing[12]} ${theme.spacing[16]}`,
    borderRadius: theme.radius.medium,
    textDecoration: 'none',
    
    // Dynamic text shadow based on scroll
    textShadow: textGlow,
    
    // Smooth transitions with our spring animations
    ...createSpringTransition('all', 'fast'),
    
    // Enhanced hover effect with scroll-responsive backdrop
    '&:hover': {
      color: theme.colors.dark.textPrimary,
      background: `rgba(255, 255, 255, ${0.1 + scrollRatio * 0.05})`,
      backdropFilter: `blur(${15 + scrollRatio * 5}px)`,
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 12px rgba(255, 255, 255, ${0.1 + scrollRatio * 0.1})`,
    },
    
    '&:focus': {
      outline: `2px solid ${theme.colors.light.brand}`,
      outlineOffset: '2px',
    },
    
    '&:active': {
      transform: 'translateY(0)',
    },
  };

  // Mobile menu toggle button style with dynamic effects
  const mobileToggleStyle = {
    display: isMobile ? 'flex' : 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    flexDirection: 'column',
    gap: '4px',
    padding: theme.spacing[8],
    borderRadius: '8px',
    
    // Dynamic entrance animation for mobile toggle
    opacity: navbarAnimated ? textOpacity : 0,
    transition: navbarAnimated
      ? 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)'
      : 'opacity 1.0s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
  };

  const hamburgerBarStyle = {
    width: '24px',
    height: '2px',
    backgroundColor: theme.colors.dark.textPrimary,
    borderRadius: '1px',
    // Dynamic glow effect for hamburger bars
    boxShadow: textGlow,
    ...createSpringTransition('all', 'fast'),
    
    // Animation for active state
    transform: mobileMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
  };

  const hamburgerBarMiddleStyle = {
    ...hamburgerBarStyle,
    opacity: mobileMenuOpen ? 0 : 1,
    transform: mobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
  };

  const hamburgerBarBottomStyle = {
    ...hamburgerBarStyle,
    transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'rotate(0deg) translateY(0px)',
  };

  const hamburgerBarTopStyle = {
    ...hamburgerBarStyle,
    transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'rotate(0deg) translateY(0px)',
  };

  // Mobile snackbar dropdown styles
  const mobileSnackbarStyle = {
    display: isMobile ? 'block' : 'none',
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    background: `rgba(0, 0, 0, ${0.95 + scrollRatio * 0.05})`,
    backdropFilter: `blur(${25 + scrollRatio * 5}px) saturate(180%)`,
    WebkitBackdropFilter: `blur(${25 + scrollRatio * 5}px) saturate(180%)`,
    borderTop: `1px solid rgba(255, 255, 255, ${0.1 + scrollRatio * 0.05})`,
    borderBottom: `1px solid rgba(255, 255, 255, ${0.05 + scrollRatio * 0.03})`,
    boxShadow: `0 10px 40px rgba(0, 0, 0, ${0.6 + scrollRatio * 0.2}), 0 0 0 1px rgba(255, 255, 255, 0.05)`,
    zIndex: 999,
    overflow: 'hidden',
    
    // Beautiful snackbar animation
    opacity: mobileMenuOpen ? 1 : 0,
    transform: mobileMenuOpen ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
    visibility: mobileMenuOpen ? 'visible' : 'hidden',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  const mobileMenuListStyle = {
    listStyle: 'none',
    margin: 0,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const mobileMenuItemStyle = {
    opacity: mobileMenuOpen ? 1 : 0,
    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  const mobileMenuButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.9)',
    padding: '16px 20px',
    borderRadius: '12px',
    textDecoration: 'none',
    display: 'block',
    width: '100%',
    textAlign: 'left',
    fontFamily: 'SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '16px',
    fontWeight: '500',
    letterSpacing: '0.4px',
    lineHeight: '1.2',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    
    // Beautiful glassmorphology hover effect
    '&:hover': {
      background: `rgba(255, 255, 255, ${0.1 + scrollRatio * 0.05})`,
      backdropFilter: `blur(${10 + scrollRatio * 3}px)`,
      transform: 'translateX(8px)',
      color: '#ff69b4',
      boxShadow: `0 4px 16px rgba(255, 105, 180, ${0.2 + scrollRatio * 0.1})`,
    },
    
    '&:focus': {
      outline: '2px solid #ff69b4',
      outlineOffset: '2px',
    },
  };

  return (
    <header id="header" ref={headerRef}>
      <nav style={navbarStyle}>
        <div style={containerStyle}>
          {/* Brand/Logo */}
          <button 
            style={brandStyle}
            onClick={() => scrollToSection('top')}
            onMouseEnter={(e) => {
              e.target.style.color = theme.colors.dark.brand;
              e.target.style.textShadow = `${textGlow}, 0 0 12px ${theme.colors.dark.brand}40`;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = theme.colors.dark.textPrimary;
              e.target.style.textShadow = textGlow;
            }}
            aria-label="Go to top of page"
          >
            SHUYI SUN
          </button>
          
          {/* Navigation Menu */}
          <ul style={navMenuStyle}>
            <li style={navItemStyle}>
              <button 
                onClick={() => scrollToSection('top')}
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = `rgba(255, 255, 255, ${0.15 + scrollRatio * 0.05})`;
                  e.target.style.backdropFilter = `blur(${15 + scrollRatio * 5}px)`;
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = `0 4px 12px rgba(255, 255, 255, ${0.15 + scrollRatio * 0.1})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Home
              </button>
            </li>
            <li style={navItemStyle}>
              <button 
                onClick={() => scrollToSection('about')}
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = `rgba(255, 255, 255, ${0.15 + scrollRatio * 0.05})`;
                  e.target.style.backdropFilter = `blur(${15 + scrollRatio * 5}px)`;
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = `0 4px 12px rgba(255, 255, 255, ${0.15 + scrollRatio * 0.1})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                About
              </button>
            </li>
            <li style={navItemStyle}>
              <button 
                onClick={() => scrollToSection('service')}
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = `rgba(255, 255, 255, ${0.15 + scrollRatio * 0.05})`;
                  e.target.style.backdropFilter = `blur(${15 + scrollRatio * 5}px)`;
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = `0 4px 12px rgba(255, 255, 255, ${0.15 + scrollRatio * 0.1})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Resume
              </button>
            </li>
            <li style={navItemStyle}>
              <button 
                onClick={() => scrollToSection('portfolio')}
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = `rgba(255, 255, 255, ${0.15 + scrollRatio * 0.05})`;
                  e.target.style.backdropFilter = `blur(${15 + scrollRatio * 5}px)`;
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = `0 4px 12px rgba(255, 255, 255, ${0.15 + scrollRatio * 0.1})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Portfolio
              </button>
            </li>
            <li style={navItemStyle}>
              <button 
                onClick={() => scrollToSection('contact')}
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = `rgba(255, 255, 255, ${0.15 + scrollRatio * 0.05})`;
                  e.target.style.backdropFilter = `blur(${15 + scrollRatio * 5}px)`;
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = `0 4px 12px rgba(255, 255, 255, ${0.15 + scrollRatio * 0.1})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Menu Toggle - Beautiful Snackbar */}
          <button 
            style={mobileToggleStyle}
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            onClick={toggleMobileMenu}
            onMouseEnter={(e) => {
              e.target.style.background = `rgba(255, 255, 255, ${0.1 + scrollRatio * 0.05})`;
              e.target.style.backdropFilter = `blur(${10 + scrollRatio * 3}px)`;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.backdropFilter = 'none';
            }}
          >
            <div style={hamburgerBarTopStyle}></div>
            <div style={hamburgerBarMiddleStyle}></div>
            <div style={hamburgerBarBottomStyle}></div>
          </button>
        </div>
        
        {/* Mobile Overlay - Click to close */}
        {isMobile && mobileMenuOpen && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              zIndex: 998,
              opacity: mobileMenuOpen ? 1 : 0,
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Mobile Snackbar Dropdown - Beautiful Glassmorphology */}
        <div 
          style={mobileSnackbarStyle}
          id="mobile-navigation-menu"
          role="menu"
          aria-hidden={!mobileMenuOpen}
        >
          <ul style={mobileMenuListStyle}>
            <li style={{...mobileMenuItemStyle, transitionDelay: '0.1s'}} role="none">
              <button 
                onClick={() => handleMobileNavClick('top')}
                style={mobileMenuButtonStyle}
                role="menuitem"
                tabIndex={mobileMenuOpen ? 0 : -1}
                onMouseEnter={(e) => {
                  e.target.style.background = `rgba(255, 255, 255, ${0.1 + scrollRatio * 0.05})`;
                  e.target.style.backdropFilter = `blur(${10 + scrollRatio * 3}px)`;
                  e.target.style.transform = 'translateX(8px)';
                  e.target.style.color = '#ff69b4';
                  e.target.style.boxShadow = `0 4px 16px rgba(255, 105, 180, ${0.2 + scrollRatio * 0.1})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'none';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateX(0)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Home
              </button>
            </li>
            <li style={{...mobileMenuItemStyle, transitionDelay: '0.2s'}} role="none">
              <button 
                onClick={() => handleMobileNavClick('about')}
                style={mobileMenuButtonStyle}
                role="menuitem"
                tabIndex={mobileMenuOpen ? 0 : -1}
                onMouseEnter={(e) => {
                  e.target.style.background = `rgba(255, 255, 255, ${0.1 + scrollRatio * 0.05})`;
                  e.target.style.backdropFilter = `blur(${10 + scrollRatio * 3}px)`;
                  e.target.style.transform = 'translateX(8px)';
                  e.target.style.color = '#ff69b4';
                  e.target.style.boxShadow = `0 4px 16px rgba(255, 105, 180, ${0.2 + scrollRatio * 0.1})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'none';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateX(0)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                About
              </button>
            </li>
            <li style={{...mobileMenuItemStyle, transitionDelay: '0.3s'}} role="none">
              <button 
                onClick={() => handleMobileNavClick('service')}
                style={mobileMenuButtonStyle}
                role="menuitem"
                tabIndex={mobileMenuOpen ? 0 : -1}
                onMouseEnter={(e) => {
                  e.target.style.background = `rgba(255, 255, 255, ${0.1 + scrollRatio * 0.05})`;
                  e.target.style.backdropFilter = `blur(${10 + scrollRatio * 3}px)`;
                  e.target.style.transform = 'translateX(8px)';
                  e.target.style.color = '#ff69b4';
                  e.target.style.boxShadow = `0 4px 16px rgba(255, 105, 180, ${0.2 + scrollRatio * 0.1})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'none';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateX(0)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Resume
              </button>
            </li>
            <li style={{...mobileMenuItemStyle, transitionDelay: '0.4s'}} role="none">
              <button 
                onClick={() => handleMobileNavClick('portfolio')}
                style={mobileMenuButtonStyle}
                role="menuitem"
                tabIndex={mobileMenuOpen ? 0 : -1}
                onMouseEnter={(e) => {
                  e.target.style.background = `rgba(255, 255, 255, ${0.1 + scrollRatio * 0.05})`;
                  e.target.style.backdropFilter = `blur(${10 + scrollRatio * 3}px)`;
                  e.target.style.transform = 'translateX(8px)';
                  e.target.style.color = '#ff69b4';
                  e.target.style.boxShadow = `0 4px 16px rgba(255, 105, 180, ${0.2 + scrollRatio * 0.1})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'none';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateX(0)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Portfolio
              </button>
            </li>
            <li style={{...mobileMenuItemStyle, transitionDelay: '0.5s'}} role="none">
              <button 
                onClick={() => handleMobileNavClick('contact')}
                style={mobileMenuButtonStyle}
                role="menuitem"
                tabIndex={mobileMenuOpen ? 0 : -1}
                onMouseEnter={(e) => {
                  e.target.style.background = `rgba(255, 255, 255, ${0.1 + scrollRatio * 0.05})`;
                  e.target.style.backdropFilter = `blur(${10 + scrollRatio * 3}px)`;
                  e.target.style.transform = 'translateX(8px)';
                  e.target.style.color = '#ff69b4';
                  e.target.style.boxShadow = `0 4px 16px rgba(255, 105, 180, ${0.2 + scrollRatio * 0.1})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'none';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateX(0)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header; 