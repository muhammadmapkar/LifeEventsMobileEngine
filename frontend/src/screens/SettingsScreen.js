import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    User, Phone, Shield, Globe, Bell, HeadphonesIcon,
    LogOut, Sun, Moon, ChevronRight
} from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { USER_PROFILE } from '../mockData';

export default function SettingsScreen() {
    const { theme, isDarkMode, toggleTheme } = useTheme();
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Animate theme toggle
        Animated.parallel([
            Animated.spring(rotateAnim, {
                toValue: isDarkMode ? 0 : 1,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [isDarkMode]);

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const settingsMenu = [
        { id: 1, icon: Phone, title: 'Account', subtitle: 'Edit Phone/Email linked to UAE Pass' },
        { id: 2, icon: Shield, title: 'Security', subtitle: 'Manage Biometrics and Login History' },
        { id: 3, icon: Globe, title: 'Language', subtitle: 'Toggle between Arabic and English' },
        { id: 4, icon: Bell, title: 'Notifications', subtitle: 'Push alert preferences' },
        { id: 5, icon: HeadphonesIcon, title: 'Support', subtitle: 'Contact Government Concierge' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Profile Header */}
                    <View style={[styles.profileHeader, { backgroundColor: theme.cardBg }, theme.shadows.md]}>
                        <View style={styles.avatarLarge}>
                            <Text style={[styles.avatarText, { color: theme.text }]}>
                                {USER_PROFILE.name.charAt(0)}
                            </Text>
                        </View>
                        <Text style={[styles.profileName, { color: theme.text }]}>Ahmed Al-Mansouri</Text>
                        <Text style={[styles.profileEid, { color: theme.textSecondary }]}>
                            EID: 784-1998-XXXXXXX-X
                        </Text>
                    </View>

                    {/* Theme Toggle */}
                    <View style={[styles.themeToggleCard, { backgroundColor: theme.cardBg }, theme.shadows.sm]}>
                        <View style={styles.themeToggleLeft}>
                            <Animated.View style={{ transform: [{ rotate: rotation }, { scale: scaleAnim }] }}>
                                {isDarkMode ? (
                                    <Moon size={24} color={theme.primary} fill={theme.primary} />
                                ) : (
                                    <Sun size={24} color={theme.primary} />
                                )}
                            </Animated.View>
                            <View style={styles.themeToggleText}>
                                <Text style={[styles.themeToggleTitle, { color: theme.text }]}>
                                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                                </Text>
                                <Text style={[styles.themeToggleSubtitle, { color: theme.textSecondary }]}>
                                    {isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={[styles.toggle, { backgroundColor: isDarkMode ? theme.primary : 'rgba(0,0,0,0.1)' }]}
                            onPress={toggleTheme}
                        >
                            <Animated.View
                                style={[
                                    styles.toggleKnob,
                                    {
                                        backgroundColor: '#FFF',
                                        transform: [
                                            {
                                                translateX: isDarkMode ? 22 : 2,
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Settings Menu */}
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Settings</Text>
                    {settingsMenu.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.menuItem, { backgroundColor: theme.cardBg }, theme.shadows.sm]}
                            >
                                <View style={styles.menuLeft}>
                                    <View style={[styles.iconBox, { backgroundColor: `${theme.primary}15` }]}>
                                        <IconComponent size={20} color={theme.primary} />
                                    </View>
                                    <View style={styles.menuText}>
                                        <Text style={[styles.menuTitle, { color: theme.text }]}>{item.title}</Text>
                                        <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]}>
                                            {item.subtitle}
                                        </Text>
                                    </View>
                                </View>
                                <ChevronRight size={20} color={theme.textTertiary} />
                            </TouchableOpacity>
                        );
                    })}

                    {/* Sign Out Button */}
                    <TouchableOpacity style={styles.signOutButton}>
                        <LogOut size={20} color={theme.danger} />
                        <Text style={[styles.signOutText, { color: theme.danger }]}>Sign Out</Text>
                    </TouchableOpacity>

                    <View style={{ height: 100 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    content: { padding: 20 },

    // Profile Header
    profileHeader: {
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarLarge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(225, 29, 72, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 3,
        borderColor: 'rgba(225, 29, 72, 0.3)',
    },
    avatarText: { fontSize: 32, fontWeight: '700' },
    profileName: { fontSize: 24, fontWeight: '700', marginBottom: 6 },
    profileEid: { fontSize: 13, fontFamily: 'monospace' },

    // Theme Toggle
    themeToggleCard: {
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    themeToggleLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    themeToggleText: { marginLeft: 16, flex: 1 },
    themeToggleTitle: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
    themeToggleSubtitle: { fontSize: 12 },
    toggle: {
        width: 48,
        height: 28,
        borderRadius: 14,
        padding: 2,
        justifyContent: 'center',
    },
    toggleKnob: { width: 24, height: 24, borderRadius: 12 },

    // Settings Menu
    sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16, marginTop: 8 },
    menuItem: {
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    menuLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    menuText: { flex: 1 },
    menuTitle: { fontSize: 15, fontWeight: '600', marginBottom: 3 },
    menuSubtitle: { fontSize: 12, lineHeight: 16 },

    // Sign Out
    signOutButton: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 10,
    },
    signOutText: { fontSize: 16, fontWeight: '700' },
});
