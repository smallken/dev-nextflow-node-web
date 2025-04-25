import { createTheme, MantineColorsTuple } from '@mantine/core';

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
