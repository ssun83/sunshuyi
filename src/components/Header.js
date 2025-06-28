import React from 'react';
import { theme, createHeaderGlassEffect, createSpringTransition } from '../theme/theme.js';

const Header = ({ scrolled, scrollToSection }) => {
  // Dynamic styles based on scroll state
  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1000,
    padding: scrolled ? `${theme.spacing[12]} 0` : `${theme.spacing[20]} 0`,
    
    // Smooth transitions using our theme
    ...createSpringTransition('all', 'normal'),
    
    // Conditional styling based on scroll state
    ...(scrolled ? {
      // Frosted glass effect when scrolled
      ...createHeaderGlassEffect(),
      borderBottom: `1px solid ${theme.colors.glass.border.dark}`,
    } : {
      // Transparent when at top
      background: 'transparent',
      backdropFilter: 'none',
    }),
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${theme.spacing[24]}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const brandStyle = {
    // Using theme typography for the brand
    ...theme.typography.title2,
    fontWeight: 700,
    color: scrolled ? theme.colors.dark.textPrimary : '#FFFFFF', // White when at top, white when scrolled
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '1px',
    
    // Add text shadow when not scrolled for distinction against background
    textShadow: scrolled ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.7), 0 1px 3px rgba(0, 0, 0, 0.5)',
    
    // Smooth transitions
    ...createSpringTransition('all', 'fast'),
    
    '&:hover': {
      color: scrolled ? theme.colors.dark.brand : 'rgba(255, 255, 255, 0.9)',
    },
    
    '&:focus': {
      outline: `2px solid ${theme.colors.light.brand}`,
      outlineOffset: '2px',
    },
  };

  const navMenuStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[8],
    listStyle: 'none',
    margin: 0,
    padding: 0,
    
    // Mobile responsiveness
    '@media (max-width: 768px)': {
      display: 'none', // Hide on mobile - could implement hamburger menu later
    },
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
    color: scrolled ? theme.colors.dark.textPrimary : '#FFFFFF', // White when at top, white when scrolled
    padding: `${theme.spacing[12]} ${theme.spacing[16]}`,
    borderRadius: theme.radius.medium,
    textDecoration: 'none',
    
    // Add text shadow when not scrolled for distinction against background
    textShadow: scrolled ? 'none' : '0 2px 6px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.4)',
    
    // Smooth transitions with our spring animations
    ...createSpringTransition('all', 'fast'),
    
    // Hover effect with subtle glass background
    '&:hover': {
      color: scrolled ? theme.colors.dark.textPrimary : 'rgba(255, 255, 255, 0.9)',
      background: scrolled 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      transform: 'translateY(-1px)',
    },
    
    '&:focus': {
      outline: `2px solid ${theme.colors.light.brand}`,
      outlineOffset: '2px',
    },
    
    '&:active': {
      transform: 'translateY(0)',
    },
  };

  // Mobile menu toggle button style
  const mobileToggleStyle = {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    flexDirection: 'column',
    gap: '4px',
    padding: theme.spacing[8],
    
    '@media (max-width: 768px)': {
      display: 'flex',
    },
  };

  const hamburgerBarStyle = {
    width: '24px',
    height: '2px',
    backgroundColor: scrolled ? theme.colors.dark.textPrimary : '#FFFFFF', // White when at top
    borderRadius: '1px',
    // Add subtle shadow for distinction when not scrolled
    boxShadow: scrolled ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.5)',
    ...createSpringTransition('all', 'fast'),
  };

  return (
    <header id="header">
      <nav style={navbarStyle}>
        <div style={containerStyle}>
          {/* Brand/Logo */}
          <button 
            style={brandStyle}
            onClick={() => scrollToSection('top')}
            onMouseEnter={(e) => {
              e.target.style.color = scrolled ? theme.colors.dark.brand : theme.colors.light.brand;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = scrolled ? theme.colors.dark.textPrimary : theme.colors.light.primary;
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
                  e.target.style.background = scrolled 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.15)';
                  e.target.style.backdropFilter = 'blur(10px)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateY(0)';
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
                  e.target.style.background = scrolled 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.15)';
                  e.target.style.backdropFilter = 'blur(10px)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateY(0)';
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
                  e.target.style.background = scrolled 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.15)';
                  e.target.style.backdropFilter = 'blur(10px)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateY(0)';
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
                  e.target.style.background = scrolled 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.15)';
                  e.target.style.backdropFilter = 'blur(10px)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateY(0)';
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
                  e.target.style.background = scrolled 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.15)';
                  e.target.style.backdropFilter = 'blur(10px)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.backdropFilter = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Menu Toggle - Future Enhancement */}
          <button 
            style={mobileToggleStyle}
            aria-label="Toggle mobile menu"
            onClick={() => {
              // TODO: Implement mobile menu toggle
              console.log('Mobile menu toggle clicked');
            }}
          >
            <div style={hamburgerBarStyle}></div>
            <div style={hamburgerBarStyle}></div>
            <div style={hamburgerBarStyle}></div>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header; 