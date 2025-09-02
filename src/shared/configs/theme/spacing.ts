// Spacing System for 996.kg App
export const Spacing = {
  // Base spacing unit (4px)
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
  xxxxxl: 48,
  xxxxxxl: 64,

  // Semantic spacing
  tiny: 2,
  small: 8,
  medium: 16,
  large: 24,
  huge: 32,
  massive: 48,

  // Component specific spacing
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  
  input: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 8,
  },

  card: {
    padding: 16,
    margin: 8,
    borderRadius: 12,
  },

  screen: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    height: 60,
  },

  tabBar: {
    height: 80,
    paddingBottom: 20,
  },
};

// Typography System
export const Typography = {
  // Font sizes
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    xxxxl: 28,
    xxxxxl: 32,
    xxxxxxl: 36,
    xxxxxxxl: 48,
  },

  // Line heights
  lineHeight: {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 36,
    xxxxl: 40,
    xxxxxl: 48,
  },

  // Font weights
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // Text styles
  heading: {
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700' as const,
    },
    h2: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '600' as const,
    },
    h3: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600' as const,
    },
    h4: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600' as const,
    },
    h5: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '500' as const,
    },
    h6: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500' as const,
    },
  },

  body: {
    large: {
      fontSize: 18,
      lineHeight: 28,
      fontWeight: '400' as const,
    },
    medium: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400' as const,
    },
    small: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400' as const,
    },
  },

  caption: {
    large: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400' as const,
    },
    medium: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400' as const,
    },
    small: {
      fontSize: 10,
      lineHeight: 14,
      fontWeight: '400' as const,
    },
  },

  button: {
    large: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '600' as const,
    },
    medium: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600' as const,
    },
    small: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500' as const,
    },
  },
};

// Border radius system
export const BorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  xxl: 16,
  xxxl: 20,
  xxxxl: 24,
  round: 9999,
};

// Shadow system
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};
