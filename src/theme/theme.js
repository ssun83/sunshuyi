/**
 * React-compatible theme file
 * Exports the theme for use in JavaScript components
 */
import { AppTheme } from './theme.ts';

// Export the theme for use in React components
export const theme = AppTheme;

// Helper function to get theme values with fallbacks
export const getThemeValue = (path, fallback = '') => {
  const keys = path.split('.');
  let current = theme;
  
  for (const key of keys) {
    if (current[key] === undefined) {
      return fallback;
    }
    current = current[key];
  }
  
  return current;
};

// CSS-in-JS style helpers for components
export const createGlassEffect = (variant = 'light') => ({
  background: variant === 'light' 
    ? theme.colors.glass.frosted.light 
    : theme.colors.glass.frosted.dark,
  backdropFilter: theme.colors.glass.blur.light,
  WebkitBackdropFilter: theme.colors.glass.blur.light, // Safari support
  border: `1px solid ${theme.colors.glass.border.light}`,
  borderRadius: theme.radius.large,
  boxShadow: theme.shadows.glass,
});

export const createHeroGlassEffect = () => ({
  background: theme.colors.glass.frosted.hero,
  backdropFilter: theme.colors.glass.blur.light,
  WebkitBackdropFilter: theme.colors.glass.blur.light,
  border: `1px solid ${theme.colors.glass.border.light}`,
  borderRadius: theme.radius.xl,
  boxShadow: theme.shadows.glass,
});

export const createHeaderGlassEffect = () => ({
  background: theme.colors.glass.frosted.header,
  backdropFilter: theme.colors.glass.blur.subtle,
  WebkitBackdropFilter: theme.colors.glass.blur.subtle,
  border: `1px solid ${theme.colors.glass.border.dark}`,
  boxShadow: theme.shadows.glassDark,
});

// Animation helpers
export const createSpringTransition = (property = 'all', duration = 'normal') => ({
  transition: `${property} ${theme.animations.duration[duration]} ${theme.animations.spring.smooth}`,
});

export default theme; 