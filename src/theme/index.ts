import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import colors from './colors';

const theme = extendTheme(
  {
    colors,
    fonts: {
      heading: `'Inter', sans-serif`,
      body: `'Inter', sans-serif`,
    },
    shadows: {
      shadow: {
        50: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        100: '0px 2px 8px rgba(4, 4, 47, 0.2)',
      },
    },
    styles: {
      global: {
        body: {
          color: colors.neutral[800],
          bg: colors.neutral[20],
          lineHeight: 'base',
        },
        a: {
          color: colors.violet[400],
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
  })
);

export default theme;
