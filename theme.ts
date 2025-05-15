import { createTheme, MantineColorsTuple } from '@mantine/core';
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit';

const myColor: MantineColorsTuple = [
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

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    myColor,
  },
  primaryColor: 'myColor'
});

// Custom colors for RainbowKit //F2AE00 //22d577
const brandColor = '#F2AE00'; // Primary brand color

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
