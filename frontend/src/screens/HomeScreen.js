import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
    QrCode, CreditCard, ChevronRight, Activity, Baby, MapPin,
    Car, Briefcase, Heart, AlertCircle, Zap, Radio, Bus,
    Smartphone, FileText, Newspaper, BookOpen, Home as HomeIcon,
    Palmtree, Users
} from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import {
    USER_PROFILE, ACTIVE_JOURNEY, QUICK_ACTIONS, LIFE_EVENTS,
    GOVERNMENT_INSIGHTS, UTILITY_SERVICES
} from '../mockData';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true })
        ]).start();
    }, []);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const getIcon = (name, size = 24, color = THEME.text) => {
        switch (name) {
            case 'scan': return <QrCode size={size} color={color} />;
            case 'credit-card': return <CreditCard size={size} color={color} />;
            case 'baby': return <Baby size={size} color={color} />;
            case 'map-pin': return <MapPin size={size} color={color} />;
            case 'search': return <Briefcase size={size} color={color} />;
            case 'car': return <Car size={size} color={color} />;
            case 'briefcase': return <Briefcase size={size} color={color} />;
            case 'heart': return <Heart size={size} color={color} />;
            case 'book-open': return <BookOpen size={size} color={color} />;
            case 'home': return <HomeIcon size={size} color={color} />;
            case 'palmtree': return <Palmtree size={size} color={color} />;
            case 'users': return <Users size={size} color={color} />;
            case 'alert-circle': return <AlertCircle size={size} color={color} />;
            case 'zap': return <Zap size={size} color={color} />;
            case 'radio': return <Radio size={size} color={color} />;
            case 'bus': return <Bus size={size} color={color} />;
            case 'smartphone': return <Smartphone size={size} color={color} />;
            case 'file-text': return <FileText size={size} color={color} />;
            default: return <Activity size={size} color={color} />;
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Hero Section */}
                    <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
                        <Text style={styles.greeting}>Good Evening</Text>
                        <Text style={styles.userName}>{USER_PROFILE.name}</Text>
                        <Text style={styles.subGreeting}>Here's what needs your attention</Text>
                    </Animated.View>

                    {/* Asymmetric Layout - 60/40 Split */}
                    <Animated.View style={[styles.asymmetricContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                        {/* Primary Card (60%) */}
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <TouchableOpacity
                                style={styles.primaryCard}
                                onPress={() => navigation.navigate('Activity')}
                                onPressIn={handlePressIn}
                                onPressOut={handlePressOut}
                                activeOpacity={1}
                            >
                                <View style={styles.cardHeader}>
                                    <View style={styles.statusDot} />
                                    <Text style={styles.cardLabel}>ACTIVE</Text>
                                </View>
                                <Text style={styles.cardTitle}>{ACTIVE_JOURNEY.title}</Text>
                                <Text style={styles.cardSubtitle}>{ACTIVE_JOURNEY.subtitle}</Text>

                                {/* Thin Circular Progress */}
                                <View style={styles.progressSection}>
                                    <View style={styles.circularProgress}>
                                        <Text style={styles.progressPercentage}>{Math.round(ACTIVE_JOURNEY.progress * 100)}%</Text>
                                    </View>
                                    <View style={styles.progressInfo}>
                                        <Text style={styles.progressLabel}>Completion</Text>
                                        <Text style={styles.progressDeadline}>{ACTIVE_JOURNEY.deadline}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Secondary Card (40%) */}
                        <View style={styles.secondaryCard}>
                            <Text style={styles.statsLabel}>PENDING</Text>
                            <Text style={styles.statsValue}>3</Text>
                            <Text style={styles.statsDesc}>Actions Required</Text>
                        </View>
                    </Animated.View>

                    {/* Quick Actions */}
                    <Animated.View style={[styles.quickActionsContainer, { opacity: fadeAnim }]}>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
                        <View style={styles.actionsGrid}>
                            {QUICK_ACTIONS.map((action) => (
                                <TouchableOpacity
                                    key={action.id}
                                    style={styles.actionTile}
                                    onPress={() => {
                                        if (action.type === 'payment') navigation.navigate('Payment');
                                        else if (action.type === 'track') navigation.navigate('Tracker');
                                    }}
                                >
                                    {getIcon(action.icon, 22, THEME.textSecondary)}
                                    <Text style={styles.actionText}>{action.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animated.View>

                    {/* Life Events */}
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Life Events</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>View All</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                            {LIFE_EVENTS.slice(0, 6).map((event) => (
                                <TouchableOpacity
                                    key={event.id}
                                    style={styles.eventCard}
                                    onPress={() => navigation.navigate('EventDetail', { event })}
                                >
                                    <View style={styles.eventIconContainer}>
                                        {getIcon(event.icon, 24, THEME.text)}
                                    </View>
                                    <Text style={styles.eventTitle}>{event.title}</Text>
                                    <Text style={styles.eventDesc}>{event.desc}</Text>
                                    <ChevronRight color={THEME.textTertiary} size={16} style={styles.eventArrow} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Animated.View>

                    <View style={{ height: 120 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    safeArea: { flex: 1 },
    scrollContent: { padding: 24, paddingBottom: 100 },

    // Hero Section
    heroSection: { marginBottom: 32, paddingTop: 8 },
    greeting: { fontSize: 14, color: 'rgba(255, 255, 255, 0.4)', letterSpacing: 0.5, fontWeight: '300', textTransform: 'uppercase' },
    userName: { fontSize: 36, fontWeight: '700', color: '#FFFFFF', marginTop: 4, marginBottom: 6 },
    subGreeting: { fontSize: 15, color: 'rgba(255, 255, 255, 0.6)', fontWeight: '400' },

    // Asymmetric Layout
    asymmetricContainer: { flexDirection: 'row', marginBottom: 32, gap: 12 },

    primaryCard: {
        width: width * 0.6 - 32,
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 10,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E11D48', marginRight: 8 },
    cardLabel: { fontSize: 11, color: 'rgba(255, 255, 255, 0.6)', fontWeight: '500', letterSpacing: 1 },
    cardTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 6 },
    cardSubtitle: { fontSize: 13, color: 'rgba(255, 255, 255, 0.6)', marginBottom: 24, fontWeight: '400' },

    progressSection: { flexDirection: 'row', alignItems: 'center' },
    circularProgress: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 3,
        borderColor: '#E11D48',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    progressPercentage: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
    progressInfo: { flex: 1 },
    progressLabel: { fontSize: 12, color: 'rgba(255, 255, 255, 0.4)', marginBottom: 2, fontWeight: '300' },
    progressDeadline: { fontSize: 13, color: 'rgba(255, 255, 255, 0.6)', fontWeight: '500' },

    secondaryCard: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    statsLabel: { fontSize: 10, color: 'rgba(255, 255, 255, 0.4)', fontWeight: '500', letterSpacing: 1, marginBottom: 12 },
    statsValue: { fontSize: 42, fontWeight: '700', color: '#E11D48', marginBottom: 4 },
    statsDesc: { fontSize: 12, color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', fontWeight: '400' },

    quickActionsContainer: { marginBottom: 32 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 16 },
    actionsGrid: { flexDirection: 'row', gap: 12 },
    actionTile: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    actionText: { fontSize: 12, color: 'rgba(255, 255, 255, 0.6)', fontWeight: '500', textAlign: 'center' },

    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    seeAll: { fontSize: 13, color: '#E11D48', fontWeight: '500' },
    horizontalScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
    eventCard: {
        width: 160,
        backgroundColor: '#1E1E1E',
        borderRadius: 16,
        padding: 18,
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    eventIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    eventTitle: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', marginBottom: 4 },
    eventDesc: { fontSize: 11, color: 'rgba(255, 255, 255, 0.6)', lineHeight: 16, marginBottom: 8 },
    eventArrow: { alignSelf: 'flex-end' },
});

export default HomeScreen;
