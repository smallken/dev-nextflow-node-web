import { createTheme, MantineColorsTuple, rem } from '@mantine/core';
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit';

// Define the primary color palette - Green series
const greenColor: MantineColorsTuple = [
  '#e5fff1',
  '#d2fae5',
  '#a8f2cb',
  '#7aeaaf',
  '#54e397',
  '#3bdf88',
  '#2bdd80',
  '#1ac46d',
  '#08ae5f',
  '#00974f'
];

// Define the main brand color - Gold/Yellow
const brandYellow = '#F2AE00';

// Define VIP level colors
export const vipColors = {
  0: '#4dabf7', // Blue
  1: '#51cf66', // Green
  2: '#FF922B', // Orange
  3: '#FF6B6B', // Red
  4: '#da77f2', // Purple
  5: '#F2AE00', // Gold/Yellow
  6: '#495057', // Dark Gray
  7: '#1098ad', // Cyan
  8: '#f06595', // Pink
  9: '#FA5252'  // Bright Red
};

// Export common color variables for component use
export const colors = {
  primary: brandYellow,        // Main brand/accent color - Gold/Yellow
  secondary: '#40c057',        // Secondary accent color - Green
  accent: '#F06595',           // Auxiliary accent color - Pink
  success: '#51cf66',          // Success
  warning: '#FF922B',          // Warning
  error: '#FF6B6B',            // Error
  info: '#4dabf7',             // Information
  background: '#f8f9fa',       // Background
  profileBg: '#e5fff1',        // Profile background
  card: '#FFFFFF',             // Card background
  text: '#212529',             // Main text
  textSecondary: '#868e96',    // Secondary text
  border: '#dee2e6',           // Border
  divider: '#e9ecef',          // Divider
  hover: '#f1f3f5'             // Hover background
};

// Export unified component styles
export const styles = {
  // Unified badge style
  vipBadge: (level: number) => ({
    background: vipColors[level as keyof typeof vipColors] || vipColors[0],
    color: 'white',
    fontFamily: '"Pixel", monospace'
  }),
  // Unified button styles
  primaryButton: {
    background: colors.primary,
    color: 'white',
    '&:hover': {
      background: '#e09d00'
    }
  },
  secondaryButton: {
    background: colors.secondary,
    color: 'white',
    '&:hover': {
      background: '#37b24d'
    }
  },
  // Unified card style
  card: {
    background: colors.card,
    borderRadius: rem(8),
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  // Unified modal style
  modal: {
    header: { 
      background: colors.background, 
      display: 'flex', 
      justifyContent: 'center' 
    },
    title: { 
      width: '100%', 
      textAlign: 'center',
      fontFamily: '"Pixel", monospace',
      fontWeight: 700
    },
    body: { padding: '0 !important' },
    content: { 
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      maxHeight: '70vh', 
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    overlay: { opacity: 0.35 }
  }
};

// Mantine theme configuration
export const theme = createTheme({
  colors: {
    myColor: greenColor,
  },
  primaryColor: 'myColor',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  components: {
    Badge: {
      styles: {
        root: {
          fontFamily: '"Pixel", monospace'
        }
      }
    },
    Button: {
      styles: {
        root: {
          fontWeight: 600
        }
      }
    },
    Text: {
      styles: {
        root: {
          color: colors.text
        }
      }
    }
  }
});

// RainbowKit theme configuration
const brandColor = colors.primary; // Use the unified main brand color

// Custom RainbowKit theme for light mode
export const customLightTheme = lightTheme({
  accentColor: brandColor,
  accentColorForeground: 'white',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});

// Custom RainbowKit theme for dark mode
export const customDarkTheme = darkTheme({
  accentColor: brandColor,
  accentColorForeground: 'white',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});
