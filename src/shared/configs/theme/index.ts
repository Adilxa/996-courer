// Theme system barrel export
import { Colors, DarkColors } from "./colors";
import { BorderRadius, Shadows, Spacing, Typography } from "./spacing";

export { Colors, DarkColors, getColors } from "./colors";
export { BorderRadius, Shadows, Spacing, Typography } from "./spacing";

// Combined theme object
export const Theme = {
  colors: Colors,
  spacing: Spacing,
  typography: Typography,
  borderRadius: BorderRadius,
  shadows: Shadows,
};

// Dark theme object
export const DarkTheme = {
  colors: DarkColors,
  spacing: Spacing,
  typography: Typography,
  borderRadius: BorderRadius,
  shadows: Shadows,
};

// Helper function to get complete theme
export const getTheme = (isDark = false) => {
  return isDark ? DarkTheme : Theme;
};
