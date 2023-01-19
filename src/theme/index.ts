import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import colors from './colors';
import { Button } from './components/button';
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
          color: colors.neutral[500],
          bg: colors.neutral[30],
          lineHeight: 'base',
        },
        a: {
          color: colors.violet[400],
        },
      },
    },
    components: {
      Button,
    },
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
  })
);

export default theme;
