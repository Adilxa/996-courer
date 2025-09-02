import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../../util/storage';
import { getColors } from '../theme/colors';

export type ThemeType = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeType;
    colors: ReturnType<typeof getColors>;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>('light');
    const [isLoaded, setIsLoaded] = useState(false);

    const colors = getColors(theme === 'dark');

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        await storage.set(THEME_STORAGE_KEY, newTheme);
    };

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await storage.get(THEME_STORAGE_KEY);
                if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                    setTheme(savedTheme);
                }
            } catch (error) {
                console.error('Failed to load theme:', error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadTheme();
    }, []);

    const value: ThemeContextType = {
        theme,
        colors,
        toggleTheme,
        isDark: theme === 'dark',
    };

    if (!isLoaded) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
