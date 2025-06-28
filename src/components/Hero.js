import React from 'react';
import { theme, createHeroGlassEffect, createSpringTransition } from '../theme/theme.js';

const Hero = () => {
  // Inline styles using our theme system for maximum performance
  const heroContainerStyle = {
    // Full viewport height with centered content
    display: 'table',
    height: '100vh',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    
    // Background with tree.png and heavy bokeh blur
    background: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%),
      url('/img/tree.png')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    
    // Add blur overlay for bokeh effect
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `url('/img/tree.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: theme.colors.glass.blur.heavy,
      opacity: 0.3,
      zIndex: 1,
    },
  };

  const heroContentWrapperStyle = {
    display: 'table-cell',
    verticalAlign: 'middle',
    position: 'relative',
    zIndex: 2,
    padding: `${theme.spacing[32]} ${theme.spacing[16]}`,
  };

  const heroGlassCardStyle = {
    // Frosted glass effect using our theme
    ...createHeroGlassEffect(),
    
    // Content positioning and spacing
    maxWidth: '600px',
    margin: '0 auto',
    padding: `${theme.spacing[48]} ${theme.spacing[32]}`,
    
    // Smooth animations
    ...createSpringTransition('all', 'slow'),
    
    // Hover effect for extra sexiness
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: theme.shadows.heavy,
    },
  };

  const heroTitleStyle = {
    // Using theme typography for the main title
    ...theme.typography.heroDisplay,
    color: theme.colors.light.textPrimary,
    marginBottom: theme.spacing[16],
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    
    // Responsive scaling
    '@media (max-width: 768px)': {
      fontSize: '36px',
    },
    '@media (max-width: 480px)': {
      fontSize: '28px',
    },
  };

  const heroNameStyle = {
    // Special styling for the name
    fontWeight: 800,
    background: `linear-gradient(135deg, #000000 0%, #ff69b4 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
  };

  const heroSubtitleStyle = {
    // Using theme typography for subtitle
    ...theme.typography.title1,
    color: theme.colors.light.textSecondary,
    marginBottom: theme.spacing[32],
    fontWeight: 400,
    letterSpacing: '0.5px',
    
    // Responsive scaling
    '@media (max-width: 768px)': {
      fontSize: '22px',
    },
    '@media (max-width: 480px)': {
      fontSize: '18px',
    },
  };

  const socialContainerStyle = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing[16],
    flexWrap: 'wrap',
  };

  const socialItemStyle = {
    display: 'inline-block',
  };

  const socialLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    border: `2px solid ${theme.colors.light.primary}`,
    borderRadius: theme.radius.pill,
    color: theme.colors.light.primary,
    fontSize: '24px',
    textDecoration: 'none',
    
    // Smooth glass-like transition effects
    ...createSpringTransition('all', 'fast'),
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    
    // Hover states for maximum sexiness
    '&:hover': {
      background: theme.colors.light.primary,
      color: '#ffffff',
      transform: 'translateY(-2px) scale(1.1)',
      boxShadow: theme.shadows.medium,
      border: `2px solid ${theme.colors.light.primary}`,
    },
    
    // Focus states for accessibility
    '&:focus': {
      outline: `2px solid ${theme.colors.light.brand}`,
      outlineOffset: '2px',
    },
    
    // Active state
    '&:active': {
      transform: 'translateY(0) scale(1.05)',
    },
  };

  return (
    <div id="top" style={heroContainerStyle}>
      {/* Background blur overlay for bokeh effect */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url('/img/tree.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: theme.colors.glass.blur.heavy,
          opacity: 0.2,
          zIndex: 1,
        }}
      />
      
      <div style={heroContentWrapperStyle}>
        {/* Frosted glass content card */}
        <div style={heroGlassCardStyle}>
          <h1 style={heroTitleStyle}>
            I am <span style={heroNameStyle}>Shuyi Sun</span>
          </h1>
          
          <p style={heroSubtitleStyle}>
            Researcher, Designer, Developer
          </p>
          
          {/* Social media links with glass effects */}
          <ul style={socialContainerStyle}>
            <li style={socialItemStyle}>
              <a 
                href="https://instagram.com/zeusspade" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                style={socialLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.colors.light.primary;
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'translateY(-2px) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = theme.colors.light.primary;
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <i className="fa fa-instagram"></i>
              </a>
            </li>
            <li style={socialItemStyle}>
              <a 
                href="https://github.com/ssun83" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                style={socialLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.colors.light.primary;
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'translateY(-2px) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = theme.colors.light.primary;
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <i className="fa fa-github"></i>
              </a>
            </li>
            <li style={socialItemStyle}>
              <a 
                href="https://www.linkedin.com/in/shuyi-sun-432b54162/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                style={socialLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.colors.light.primary;
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'translateY(-2px) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = theme.colors.light.primary;
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <i className="fa fa-linkedin"></i>
              </a>
            </li>
            <li style={socialItemStyle}>
              <a 
                href="mailto:xxianya@gmail.com?Subject=Hello" 
                target="_top"
                aria-label="Send Email"
                style={socialLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.colors.light.primary;
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'translateY(-2px) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = theme.colors.light.primary;
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <i className="fa fa-envelope"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero; 