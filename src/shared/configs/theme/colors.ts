// Theme Colors for 996.kg App
export const Colors = {
  // Primary Brand Colors
  primary: {
    50: '#f0f8ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#6366f1', // Main brand color
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },

  // Secondary Colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Success Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },

  // Warning Colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Error Colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Neutral Colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Special Colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Dark Theme Base Colors
  darkBackground: '#1A1A1A',
  darkElements: '#0C0C0C',
  darkBorder: '#1A1A1A',

  // App Specific Colors
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    dark: '#000000',
    card: "#ffffff"
  },

  text: {
    primary: '#111827',
    secondary: '#6b7280',
    tertiary: '#9ca3af',
    inverse: '#ffffff',
    disabled: '#d1d5db',
    totalWhite: '#ffffff',
  },

  border: {
    light: '#f3f4f6',
    medium: '#e5e7eb',
    dark: '#d1d5db',
  },

  // Status Colors
  status: {
    online: '#10b981',
    offline: '#ef4444',
    away: '#f59e0b',
    busy: '#ef4444',
  },

  // Delivery Status Colors
  delivery: {
    pending: '#f59e0b',
    inTransit: '#6366f1',
    delivered: '#10b981',
    returned: '#ef4444',
    cancelled: '#6b7280',
  },
};

// Dark theme colors (for future dark mode support)
export const DarkColors = {
  ...Colors,
  background: {
    primary: '#111218',
    secondary: '#1f2937',
    tertiary: '#374151',
    dark: '#000000',
    card: "#0D0D0D"
  },
  text: {
    primary: '#f9fafb',
    secondary: '#d1d5db',
    tertiary: '#9ca3af',
    inverse: '#111827',
    disabled: '#6b7280',
    totalWhite: '#ffffff',
  },
  darkBorder: '#111218',
};

// Helper function to get colors based on theme
export const getColors = (isDark = false) => {
  return isDark ? DarkColors : Colors;
};
