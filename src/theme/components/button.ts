export const Button = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4,
      h: 8,
    },
    md: {
      fontSize: 'md',
      px: 6,
      h: 10,
    },
    lg: {
      fontSize: 'lg',
      px: 8,
      h: 12,
    },
  },
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      bg: 'primary.500',
      color: 'primary.800',
      _hover: {
        bg: 'primary.400',
        boxShadow: 'xl',
      },
      _active: {
        bg: 'primary.600',
        boxShadow: 'xl',
      },
      borderRadius: 'md',
      _disabled: {
        bg: 'primary.100',
      },
    },
    outline: () => ({
      border: '1px solid',
      borderColor: 'primary.500',
      borderRadius: 'md',
      _hover: {
        boxShadow: 'xl',
        bg: 'primary.50',
      },

      _focus: {
        boxShadow: 'none',
        background: 'none',
      },

      _active: {
        background: 'bgBtnFocus1',
      },
    }),

    ghost: () => ({
      border: 'none',

      _hover: {
        background: 'none',
      },

      _focus: {
        boxShadow: 'none',
        background: 'none',
      },

      _active: {
        background: 'none',
      },
    }),
  },
  // default values for `size` and `variant`
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};
