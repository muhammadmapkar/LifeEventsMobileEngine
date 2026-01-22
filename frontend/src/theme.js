export const THEME = {
    background: '#121212', // Deep Charcoal
    cardBg: '#1E1E1E', // Soft Slate
    cardBorder: 'transparent', // No borders - use shadows instead
    primary: '#E11D48', // Crimson Red (sparingly)
    secondary: '#64748B', // Slate Grey
    accent: '#E11D48', // Crimson Red
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
    // Professional shadow system
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
