import React, { useState, useEffect } from 'react';
import { theme, createHeroGlassEffect, createSpringTransition } from '../theme/theme.js';
import { useTheme } from './ThemeContext';

const Hero = () => {
  // Get theme context for background switching and button state
  const { toggleTheme, getCurrentConfig, isCatTheme } = useTheme();
  const currentConfig = getCurrentConfig();

  // Animation state management for sexy entrance effects
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [pawButtonHovered, setPawButtonHovered] = useState(false);
  const [pawButtonPressed, setPawButtonPressed] = useState(false);

  // Trigger our beautiful staggered animation sequence
  useEffect(() => {
    // Start the animation sequence after a brief moment
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Staggered animation phases for maximum visual impact
      const phases = [1, 2, 3, 4];
      phases.forEach((phase, index) => {
        setTimeout(() => {
          setAnimationPhase(phase);
        }, index * 200); // 200ms stagger between each element
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Inline styles using our theme system for maximum performance
  const heroContainerStyle = {
    // Full viewport height with centered content
    display: 'table',
    height: '100vh',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    
    // Dynamic background switching - instant change, no animation
    backgroundImage: `url('${process.env.PUBLIC_URL}/${currentConfig.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  };

  // Paw Print Button Styles - The star of the show!
  const pawButtonStyle = {
    position: 'absolute',
    bottom: theme.spacing[24],
    right: theme.spacing[24],
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    zIndex: 10,
    
    // Beautiful glassmorphic background
    background: isCatTheme 
      ? 'linear-gradient(135deg, rgba(255, 182, 193, 0.3), rgba(255, 105, 180, 0.4))'
      : 'linear-gradient(135deg, rgba(34, 139, 34, 0.3), rgba(50, 205, 50, 0.4))',
    backdropFilter: 'blur(12px)',
    boxShadow: pawButtonHovered 
      ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      : '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    
    // Sexy transform animations
    transform: pawButtonPressed 
      ? 'scale(0.95) translateY(1px)' 
      : pawButtonHovered 
        ? 'scale(1.1) translateY(-2px)' 
        : animationPhase >= 4 
          ? 'scale(1) translateY(0)' 
          : 'scale(0.8) translateY(20px)',
    
    opacity: animationPhase >= 4 ? 1 : 0,
    
    // Smooth spring transitions for maximum sexiness
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    
    // Focus ring for accessibility
    '&:focus': {
      outline: `3px solid ${isCatTheme ? '#ff69b4' : '#32cd32'}`,
      outlineOffset: '2px',
    },
  };

  const pawIconStyle = {
    fontSize: '28px',
    color: isCatTheme ? '#ff69b4' : '#2d5a2d',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    transform: pawButtonHovered ? 'rotate(15deg) scale(1.1)' : 'rotate(0deg) scale(1)',
    filter: pawButtonHovered ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none',
  };

  // Handle paw button click with sexy feedback
  const handlePawButtonClick = () => {
    setPawButtonPressed(true);
    setTimeout(() => setPawButtonPressed(false), 150);
    
    // Toggle theme with beautiful transition
    toggleTheme();
  };

  const heroContentWrapperStyle = {
    display: 'table-cell',
    verticalAlign: 'middle',
    position: 'relative',
    zIndex: 2,
    padding: `${theme.spacing[32]} ${theme.spacing[16]}`,
    
    // Mobile responsive adjustments
    '@media (max-width: 480px)': {
      padding: `${theme.spacing[24]} ${theme.spacing[12]}`,
    },
  };

  const heroGlassCardStyle = {
    // Frosted glass effect using our theme
    ...createHeroGlassEffect(),
    
    // Content positioning and spacing
    maxWidth: '600px',
    margin: '0 auto',
    padding: `${theme.spacing[48]} ${theme.spacing[32]}`,
    
    // Beautiful entrance animation - starts from below and scales up
    transform: isLoaded 
      ? 'translateY(0) scale(1)' 
      : 'translateY(40px) scale(0.95)',
    opacity: isLoaded ? 1 : 0,
    
    // Smooth spring-like animations for maximum sexiness
    transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    
    // Hover effect for extra sexiness
    '&:hover': {
      transform: isLoaded 
        ? 'translateY(-4px) scale(1.02)' 
        : 'translateY(40px) scale(0.95)',
      boxShadow: theme.shadows.heavy,
    },
    
    // Mobile responsive adjustments
    '@media (max-width: 768px)': {
      padding: `${theme.spacing[40]} ${theme.spacing[24]}`,
      maxWidth: '90%',
    },
    '@media (max-width: 480px)': {
      padding: `${theme.spacing[32]} ${theme.spacing[20]}`,
      maxWidth: '95%',
      // Ensure adequate spacing for PhD icon
      paddingBottom: theme.spacing[64],
    },
  };

  const heroTitleStyle = {
    // Using theme typography for the main title
    ...theme.typography.heroDisplay,
    color: theme.colors.light.textPrimary,
    marginBottom: theme.spacing[16],
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    
    // Sexy slide-in animation from the left with fade
    transform: animationPhase >= 1 
      ? 'translateX(0) translateY(0)' 
      : 'translateX(-30px) translateY(10px)',
    opacity: animationPhase >= 1 ? 1 : 0,
    transition: 'all 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    
    // Responsive scaling with better mobile handling
    '@media (max-width: 768px)': {
      fontSize: '36px',
      lineHeight: '1.2',
      marginBottom: theme.spacing[20],
    },
    '@media (max-width: 480px)': {
      fontSize: '28px',
      lineHeight: '1.3',
      marginBottom: theme.spacing[16],
      // Ensure text doesn't get cut off
      wordBreak: 'keep-all',
      whiteSpace: 'nowrap',
      overflow: 'visible',
    },
  };

  const heroNameStyle = {
    // Special styling for the name with extra animation delay
    fontWeight: 800,
    background: 'linear-gradient(135deg, #000000 0%, #ff69b4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
    
    // Delayed animation for the name to pop in after title
    transform: animationPhase >= 2 
      ? 'scale(1) translateY(0)' 
      : 'scale(0.8) translateY(5px)',
    opacity: animationPhase >= 2 ? 1 : 0.3,
    transition: 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.2), opacity 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.2)',
    
    // Mobile responsive adjustments to prevent cut-off
    '@media (max-width: 480px)': {
      // Ensure the name doesn't get cut off on small screens
      fontSize: 'inherit',
      lineHeight: 'inherit',
      wordBreak: 'keep-all',
      whiteSpace: 'nowrap',
    },
  };

  const heroSubtitleStyle = {
    // Using theme typography for subtitle
    ...theme.typography.title1,
    color: theme.colors.light.textSecondary,
    marginBottom: theme.spacing[32],
    fontWeight: 400,
    letterSpacing: '0.5px',
    
    // Elegant slide-up animation with fade
    transform: animationPhase >= 2 
      ? 'translateY(0)' 
      : 'translateY(20px)',
    opacity: animationPhase >= 2 ? 1 : 0,
    transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
    
    // Responsive scaling
    '@media (max-width: 768px)': {
      fontSize: '22px',
      marginBottom: theme.spacing[24],
    },
    '@media (max-width: 480px)': {
      fontSize: '18px',
      marginBottom: theme.spacing[20],
      lineHeight: '1.4',
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
    
    // Beautiful fade-in and slide-up animation for the entire container
    transform: animationPhase >= 3 
      ? 'translateY(0)' 
      : 'translateY(30px)',
    opacity: animationPhase >= 3 ? 1 : 0,
    transition: 'all 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.15)',
    
    // Mobile responsive adjustments
    '@media (max-width: 480px)': {
      gap: theme.spacing[12],
      marginBottom: theme.spacing[16],
    },
  };

  const socialItemStyle = {
    display: 'inline-block',
    
    // Individual staggered animations for each social link
    transform: animationPhase >= 4 
      ? 'scale(1) translateY(0)' 
      : 'scale(0.8) translateY(10px)',
    opacity: animationPhase >= 4 ? 1 : 0,
    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.4)',
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
    
    // Smooth glass-like transition effects with enhanced spring
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
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
    
    // Mobile responsive adjustments
    '@media (max-width: 480px)': {
      width: '50px',
      height: '50px',
      fontSize: '20px',
    },
  };

  // PhD Icon with subtle bounce animation - Enhanced mobile spacing
  const phdIconStyle = {
    position: 'absolute',
    bottom: theme.spacing[24],
    left: theme.spacing[24], // Moved to left to make room for paw button
    width: '48px',
    height: '48px',
    opacity: animationPhase >= 3 ? 0.8 : 0,
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
    
    // Sexy bounce-in animation
    transform: animationPhase >= 3 
      ? 'scale(1) translateY(0)' 
      : 'scale(0.5) translateY(15px)',
    transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.6)',
    
    // Mobile-specific spacing and sizing
    '@media (max-width: 768px)': {
      bottom: theme.spacing[32], // More spacing on mobile
      left: theme.spacing[32],
      width: '40px',
      height: '40px',
    },
    '@media (max-width: 480px)': {
      bottom: theme.spacing[40], // Even more spacing on small mobile
      left: theme.spacing[24],
      width: '36px',
      height: '36px',
    },
  };

  return (
    <div id="top" style={heroContainerStyle}>
      {/* Gradient overlay - separate from background for consistent sizing */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      
      <div style={heroContentWrapperStyle} className="hero-content-wrapper">
        {/* Frosted glass content card */}
        <div style={{...heroGlassCardStyle, position: 'relative'}} className="hero-glass-card">
          <h1 style={heroTitleStyle} className="hero-title">
            I am <span style={heroNameStyle} className="hero-name">Shuyi Sun</span>
          </h1>
          
          <p style={heroSubtitleStyle} className="hero-subtitle">
            Researcher, Designer, Developer
          </p>
          
          {/* PhD Icon positioned at bottom left */}
          <img 
            src={`${process.env.PUBLIC_URL}/img/phd-icon.png`}
            alt="PhD Icon"
            style={phdIconStyle}
            className="phd-icon"
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.8';
              e.target.style.transform = 'scale(1)';
            }}
          />
          
          {/* Social media links with glass effects */}
          <ul style={socialContainerStyle} className="hero-social-container">
            <li style={socialItemStyle}>
              <a 
                href="https://instagram.com/zeusspade" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                style={socialLinkStyle}
                className="hero-social-link"
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
                className="hero-social-link"
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
                className="hero-social-link"
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
                className="hero-social-link"
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

      {/* 🐾 SEXY PAW PRINT BUTTON - The main attraction! */}
      <button
        onClick={handlePawButtonClick}
        onMouseEnter={() => setPawButtonHovered(true)}
        onMouseLeave={() => setPawButtonHovered(false)}
        onMouseDown={() => setPawButtonPressed(true)}
        onMouseUp={() => setPawButtonPressed(false)}
        style={pawButtonStyle}
        aria-label={`Switch to ${isCatTheme ? 'nature' : 'cat'} theme`}
        title={`Currently: ${currentConfig.name}. Click to switch!`}
      >
        {/* Beautiful Font Awesome paw print icon */}
        <i className="fa fa-paw" style={pawIconStyle}></i>
      </button>
    </div>
  );
};

export default Hero; 