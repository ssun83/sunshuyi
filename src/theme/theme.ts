/**
 * Core theme definitions following Apple HIG with custom typography system
 * Contains both light and dark themes, plus reusable design tokens
 * Integrated with existing site color scheme
 */
export const AppTheme = {
    // Typography Scale - Display (Artico Font)
    typography: {
        // Hero Display - For main landing pages and key marketing messages
        heroDisplay: {
            fontFamily: '"Artico Expanded", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '48px',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            lineHeight: 1.1,
        },

        // Primary Display - For section headers
        primaryDisplay: {
            fontFamily: '"Artico", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '40px',
            fontWeight: 700,
            letterSpacing: '-0.4px',
            lineHeight: 1.15,
        },

        // Secondary Display - For featured content
        secondaryDisplay: {
            fontFamily: '"Artico", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '32px',
            fontWeight: 600,
            letterSpacing: '-0.3px',
            lineHeight: 1.2,
        },

        // Core UI Typography - SF Pro
        largeTitle: {
            fontFamily: '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '34px',
            fontWeight: 700,
            letterSpacing: '0.37px',
            lineHeight: 1.2,
        },

        title1: {
            fontFamily: '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '28px',
            fontWeight: 600,
            letterSpacing: '0.36px',
            lineHeight: 1.3,
        },

        title2: {
            fontFamily: '"SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '22px',
            fontWeight: 600,
            letterSpacing: '0.35px',
            lineHeight: 1.3,
        },

        body: {
            fontFamily: '"SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '17px',
            fontWeight: 400,
            letterSpacing: '-0.41px',
            lineHeight: 1.5,
        },

        bodyStrong: {
            fontFamily: '"SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '17px',
            fontWeight: 600,
            letterSpacing: '-0.41px',
            lineHeight: 1.5,
        },

        // Adding caption style for smaller text elements
        caption: {
            fontFamily: '"SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            letterSpacing: '-0.08px',
            lineHeight: 1.38, // Apple's typical caption line height
        },

        // Button style for interactive elements
        button: {
            fontFamily: '"SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '0.4px',
            lineHeight: 1.2,
        },
    },

    // Spacing - 8pt Grid System
    spacing: {
        2: '2px',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        32: '32px',
        40: '40px',
        48: '48px',
        64: '64px',
    },

    // Colors - Updated to match existing site theme
    colors: {
        // Light theme - matching existing site colors
        light: {
            primary: '#2d2c28', // Main dark brown from existing site
            background: 'transparent',
            surface: 'rgba(255, 255, 255, 0.85)', // Existing section backgrounds
            textPrimary: '#2d2c28', // Dark text color
            textSecondary: 'rgba(45, 44, 40, 0.7)', // Secondary text
            divider: 'rgba(45, 44, 40, 0.1)',
            brand: 'rgba(160, 145, 130, 0.8)', // Existing brand color
        },
        // Dark theme - for header when scrolled
        dark: {
            primary: '#FFFFFF',
            background: 'rgba(0, 0, 0, 0.6)', // Existing scrolled header bg
            surface: 'rgba(0, 0, 0, 0.3)',
            textPrimary: '#FFFFFF',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            divider: 'rgba(255, 255, 255, 0.1)',
            brand: 'rgba(160, 145, 130, 0.9)',
        },
        // Glassmorphism effects - enhanced for sexy frosted glass
        glass: {
            // Frosted glass backgrounds
            frosted: {
                light: 'rgba(255, 255, 255, 0.25)',
                dark: 'rgba(0, 0, 0, 0.25)',
                hero: 'rgba(255, 255, 255, 0.15)', // For hero overlay
                header: 'rgba(0, 0, 0, 0.3)', // For scrolled header
            },
            // Blur and backdrop effects
            blur: {
                light: 'blur(20px)',
                heavy: 'blur(40px)', // For bokeh effect
                subtle: 'blur(10px)',
            },
            // Border colors for glass elements
            border: {
                light: 'rgba(255, 255, 255, 0.2)',
                dark: 'rgba(255, 255, 255, 0.1)',
            },
            // Glow effects
            glow: {
                primary: '#9D5FFF',
                secondary: '#FF71CE',
                gunmetal: '#7F8487',
                gold: '#BFA065',
            },
        },
    },

    // Border Radius
    radius: {
        small: '4px',
        medium: '8px',
        large: '12px',
        xl: '16px',
        pill: '9999px',
    },

    // Enhanced animations for smooth, sexy transitions
    animations: {
        // Spring-based transitions following Apple's design
        spring: {
            gentle: 'cubic-bezier(0.16, 1, 0.3, 1)', // Gentle ease out
            bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy
            smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth ease
        },
        duration: {
            fast: '0.2s',
            normal: '0.3s',
            slow: '0.5s',
            glacial: '1s',
        },
    },

    // Shadows for depth and glassmorphism
    shadows: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        glassDark: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        subtle: '0 2px 10px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 20px rgba(0, 0, 0, 0.15)',
        heavy: '0 10px 40px rgba(0, 0, 0, 0.3)',
    },

    // Add styled components section
    styledComponents: {
        QuipText: `
            /* Using typography.body as base style */
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 17px;
            font-weight: 300;
            font-style: italic;
            text-align: center;
            white-space: nowrap;
            max-width: none;
            margin: 8px auto 4px;
            opacity: 0.8;
            letter-spacing: +0.05em;
            color: rgba(45, 44, 40, 0.7);
            
            /* Add fallback handling */
            @supports not (font-variation-settings: normal) {
                font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif !important;
            }
        `,
    },
};

export type Theme = typeof AppTheme; 