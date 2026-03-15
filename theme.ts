import { createTheme, MantineColorsTuple, rem } from '@mantine/core';
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit';

// Define the primary color palette - Purple series (NextFlow style)
const purpleColor: MantineColorsTuple = [
  '#f5f3ff',
  '#ede9fe',
  '#ddd6fe',
  '#c4b5fd',
  '#a78bfa',
  '#8b5cf6',
  '#7c3aed',
  '#6d28d9',
  '#5b21b6',
  '#4c1d95'
];

// Define the main brand color - Purple (NextFlow style)
const brandPurple = '#8b5cf6';

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

// Export common color variables for component use (NextFlow Light Theme)
export const colors = {
  primary: brandPurple,        // Main brand/accent color - Purple
  primaryHover: '#7c3aed',     // Primary hover state
  primaryLight: '#a78bfa',     // Light purple
  secondary: '#6366f1',        // Secondary accent color - Indigo
  accent: '#06b6d4',           // Cyan accent
  accentEmerald: '#10b981',    // Emerald accent
  accentRose: '#f43f5e',       // Rose accent
  success: '#51cf66',          // Success
  warning: '#FF922B',          // Warning
  error: '#FF6B6B',            // Error
  info: '#4dabf7',             // Information
  background: '#ffffff',       // Main background - White
  backgroundSecondary: '#f8fafc', // Secondary background
  backgroundCard: '#ffffff',   // Card background
  profileBg: '#f8fafc',        // Profile background
  card: '#ffffff',             // Card background
  text: '#0f172a',             // Main text - Dark
  textSecondary: '#64748b',    // Secondary text - Gray
  textMuted: '#94a3b8',        // Muted text
  border: '#e2e8f0',           // Border
  divider: '#f1f5f9',          // Divider
  hover: '#f8fafc'             // Hover background
};

// Export unified component styles (NextFlow Light Theme)
export const styles = {
  // Unified badge style
  vipBadge: (level: number) => ({
    background: vipColors[level as keyof typeof vipColors] || vipColors[0],
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600
  }),
  // Unified button styles
  primaryButton: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
    color: 'white',
    border: 'none',
    '&:hover': {
      background: `linear-gradient(135deg, ${colors.primaryHover} 0%, #6d28d9 100%)`,
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
    }
  },
  secondaryButton: {
    background: 'transparent',
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
    '&:hover': {
      background: `${colors.primary}10`
    }
  },
  // Unified card style (Light theme)
  card: {
    background: colors.card,
    borderRadius: rem(16),
    border: `1px solid ${colors.border}`,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      borderColor: colors.primaryLight,
      boxShadow: '0 4px 20px rgba(139, 92, 246, 0.1)'
    }
  },
  // Unified modal style
  modal: {
    header: {
      background: colors.background,
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'center'
    },
    title: {
      width: '100%',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      color: colors.text
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
      background: colors.background
    },
    overlay: { opacity: 0.4 }
  }
};

// Mantine theme configuration (NextFlow Light Theme)
export const theme = createTheme({
  colors: {
    myColor: purpleColor,
    gray: [
      '#f8fafc',
      '#f1f5f9',
      '#e2e8f0',
      '#cbd5e1',
      '#94a3b8',
      '#64748b',
      '#475569',
      '#334155',
      '#1e293b',
      '#0f172a'
    ]
  },
  primaryColor: 'myColor',
  defaultRadius: 'md',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '700' as const
  },
  components: {
    Badge: {
      styles: {
        root: {
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600
        }
      }
    },
    Button: {
      styles: {
        root: {
          fontWeight: 600,
          borderRadius: rem(10)
        }
      }
    },
    Text: {
      styles: {
        root: {
          color: colors.text
        }
      }
    },
    Card: {
      styles: {
        root: {
          backgroundColor: colors.backgroundCard,
          borderColor: colors.border
        }
      }
    },
    AppShell: {
      styles: {
        main: {
          background: colors.background,
          color: colors.text
        },
        header: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${colors.border}`
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
