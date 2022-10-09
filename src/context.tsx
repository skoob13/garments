import React, { createContext, useContext, useMemo } from 'react';

export interface Theme {}

export type ThemeColorScheme = 'light' | 'dark';

export interface ThemeContext {
  theme: Theme;
  colorScheme?: ThemeColorScheme;
}

export const ThemeContext = createContext<ThemeContext>({
  theme: {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  children?: React.ReactNode;
  theme?: Theme;
  colorScheme?: ThemeColorScheme;
}

const defaultTheme = {};

export function ThemeProvider({ children, theme, colorScheme }: ThemeProviderProps) {
  const value = useMemo(
    () => ({
      colorScheme,
      theme: theme || defaultTheme,
    }),
    [theme, colorScheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
