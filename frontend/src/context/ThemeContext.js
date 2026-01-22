import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DARK_THEME = {
    background: '#121212',
    cardBg: '#1E1E1E',
    cardBorder: 'transparent',
    primary: '#E11D48',
    secondary: '#64748B',
    accent: '#E11D48',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    textTertiary: 'rgba(255, 255, 255, 0.4)',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    glass: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
    },
    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 3,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35,
            shadowRadius: 16,
            elevation: 10,
        },
    }
};

const LIGHT_THEME = {
    background: '#F5F5F0',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(0, 0, 0, 0.08)',
    primary: '#E11D48',
    secondary: '#64748B',
    accent: '#E11D48',
    text: '#2C3E50',
    textSecondary: 'rgba(44, 62, 80, 0.7)',
    textTertiary: 'rgba(44, 62, 80, 0.5)',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
    },
    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 6,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 10,
        },
    }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme !== null) {
                setIsDarkMode(savedTheme === 'dark');
            }
        } catch (error) {
            console.error('Failed to load theme:', error);
        }
    };

    const toggleTheme = async () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        try {
            await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    };

    const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export { DARK_THEME, LIGHT_THEME };
