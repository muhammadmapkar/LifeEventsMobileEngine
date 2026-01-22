import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    User, MapPin, Eye, EyeOff, ChevronRight, TrendingUp,
    Building, FileText, HeartPulse, CheckCircle
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { USER_PROFILE, BUSINESS_INFO, SPONSORSHIP_LEDGER, FINANCIAL_OVERVIEW } from '../mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 80;
const CARD_MARGIN = 12;

export default function ProfileScreen() {
    const { theme } = useTheme();
    const [privacyMode, setPrivacyMode] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const getFinanceIcon = (iconName) => {
        switch (iconName) {
            case 'file-text': return <FileText size={16} color="#FFFFFFSecondary} />;
            case 'building': return <Building size={16} color="#FFFFFFSecondary} />;
            case 'heart-pulse': return <HeartPulse size={16} color="#FFFFFFSecondary} />;
            default: return <FileText size={16} color="#FFFFFFSecondary} />;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity onPress={() => setPrivacyMode(!privacyMode)}>
                        {privacyMode ? <EyeOff color="#FFFFFFSecondary} size={22} /> : <Eye color="#FFFFFFSecondary} size={22} />}
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {/* ID Card */}
                    <View style={styles.idCard}>
                        <View style={styles.idHeader}>
                            <View style={styles.uaeLogo} />
                            <Text style={styles.emiratesText}>UNITED ARAB EMIRATES</Text>
                        </View>
                        <View style={styles.idBody}>
                            <View style={styles.avatarContainer}>
                                <Text style={styles.avatarLetter}>{USER_PROFILE.name.charAt(0)}</Text>
                            </View>
                            <View style={styles.idDetails}>
                                <Text style={styles.label}>NAME</Text>
                                <Text style={styles.value}>{USER_PROFILE.name}</Text>

                                <Text style={styles.label}>ID NUMBER</Text>
                                <Text style={styles.value}>{privacyMode ? '784-XXXX-XXXXXXX-X' : USER_PROFILE.eid}</Text>

                                <View style={styles.row}>
                                    <View>
                                        <Text style={styles.label}>AGE</Text>
                                        <Text style={styles.value}>{USER_PROFILE.age}</Text>
                                    </View>
                                    <View style={{ marginLeft: 32 }}>
                                        <Text style={styles.label}>GENDER</Text>
                                        <Text style={styles.value}>{USER_PROFILE.gender}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Horizontal Family Carousel */}
                    <Text style={styles.sectionTitle}>Family Members</Text>
                    <View style={styles.carouselContainer}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: false }
                            )}
                            scrollEventThrottle={16}
                            decelerationRate="fast"
                            snapToInterval={CARD_WIDTH + CARD_MARGIN}
                            contentContainerStyle={styles.carouselContent}
                        >
                            {SPONSORSHIP_LEDGER.map((member, index) => (
                                <View key={member.id} style={styles.familyCard}>
                                    <View style={styles.familyAvatar}>
                                        <Text style={styles.familyInitial}>{member.name.charAt(0)}</Text>
                                    </View>
                                    <Text style={styles.familyName}>{member.name}</Text>
                                    <Text style={styles.familyRelation}>{member.relation}</Text>
                                    <Text style={styles.familyEid}>EID: {member.emiratesId}</Text>
                                    <View style={[styles.visaStatus, {
                                        backgroundColor: member.statusColor === 'success'
                                            ? 'rgba(16, 185, 129, 0.1)'
                                            : 'rgba(245, 158, 11, 0.1)'
                                    }]}>
                                        <Text style={[styles.visaStatusText, {
                                            color: member.statusColor === 'success' ? "#10B981" : "#F59E0B" }]}>
                                            {member.visaStatus}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>

                        {/* Page Indicators */}
                        <View style={styles.pageIndicators}>
                            {SPONSORSHIP_LEDGER.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.indicator,
                                        { backgroundColor: index === Math.floor(activeIndex) ? "#E11D48" : 'rgba(255,255,255,0.2)' }
                                    ]}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Financial Statement */}
                    <Text style={styles.sectionTitle}>Financial Summary</Text>
                    <View style={styles.financialStatement}>
                        <View style={styles.statementHeader}>
                            <TrendingUp color="#FFFFFFSecondary} size={20} />
                            <Text style={styles.statementTitle}>Investment Overview</Text>
                        </View>

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Investment</Text>
                            <Text style={styles.totalAmount}>AED {FINANCIAL_OVERVIEW.total}</Text>
                        </View>

                        <View style={styles.divider} />

                        {FINANCIAL_OVERVIEW.breakdown.map((item) => (
                            <View key={item.id} style={styles.breakdownRow}>
                                <View style={styles.breakdownLeft}>
                                    <View style={styles.breakdownIcon}>
                                        {getFinanceIcon(item.icon)}
                                    </View>
                                    <Text style={styles.breakdownCategory}>{item.category}</Text>
                                </View>
                                <Text style={styles.breakdownAmount}>AED {item.amount}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Business Card */}
                    <Text style={styles.sectionTitle}>Business</Text>
                    <View style={styles.businessCard}>
                        <View style={styles.businessHeader}>
                            <Building color="#FFFFFFSecondary} size={20} />
                            <View style={styles.statusBadge}>
                                <CheckCircle size={12} color="#10B981} />
                                <Text style={styles.statusText}>Active</Text>
                            </View>
                        </View>
                        <Text style={styles.businessName}>{BUSINESS_INFO.name}</Text>
                        <View style={styles.licenseRow}>
                            <Text style={styles.licenseLabel}>Trade License</Text>
                            <Text style={styles.licenseValue}>{BUSINESS_INFO.tradeLicense}</Text>
                        </View>
                        <Text style={styles.establishedText}>Established {BUSINESS_INFO.established}</Text>
                    </View>

                    {/* Security Log */}
                    <Text style={styles.sectionTitle}>Security</Text>
                    <View style={styles.securityCard}>
                        <MapPin color="#FFFFFFSecondary} size={18} />
                        <View style={{ flex: 1, marginLeft: 14 }}>
                            <Text style={styles.securityTitle}>Last Login</Text>
                            <Text style={styles.securityLocation}>{USER_PROFILE.lastLogin}</Text>
                        </View>
                        <Text style={styles.securityTime}>10:42 AM</Text>
                    </View>

                    <View style={{ height: 120 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212", },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingBottom: 12 },
    headerTitle: { fontSize: 28, fontWeight: '700', color: "#FFFFFF", },
    content: { padding: 20, paddingTop: 8 },

    // ID Card
    idCard: {
        backgroundColor: "#1E1E1E,
        borderRadius: 20,
        padding: 24,
        marginBottom: 32,
        ...THEME.shadows.lg,
    },
    idHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    uaeLogo: { width: 28, height: 14, backgroundColor: "#E11D48, marginRight: 10, borderRadius: 2 },
    emiratesText: { color: "#FFFFFFTertiary, letterSpacing: 2, fontSize: 9, fontWeight: '600' },
    idBody: { flexDirection: 'row' },
    avatarContainer: {
        width: 72,
        height: 88,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    avatarLetter: { fontSize: 32, fontWeight: '700', color: "#FFFFFF", },
    idDetails: { flex: 1, justifyContent: 'space-between' },
    label: { color: "#FFFFFFTertiary, fontSize: 9, fontWeight: '500', letterSpacing: 0.5, marginBottom: 4 },
    value: { color: "#FFFFFF, fontSize: 15, fontWeight: '600', marginBottom: 14 },
    row: { flexDirection: 'row' },

    sectionTitle: { fontSize: 16, fontWeight: '700', color: "#FFFFFF, marginBottom: 16, marginTop: 8 },

    // Horizontal Carousel
    carouselContainer: { marginBottom: 32 },
    carouselContent: { paddingRight: 20 },
    familyCard: {
        width: CARD_WIDTH,
        backgroundColor: "#1E1E1E,
        borderRadius: 20,
        padding: 28,
        marginRight: CARD_MARGIN,
        alignItems: 'center',
        ...THEME.shadows.md,
    },
    familyAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(225, 29, 72, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: 'rgba(225, 29, 72, 0.3)',
    },
    familyInitial: { fontSize: 32, fontWeight: '700', color: "#E11D48", },
    familyName: { fontSize: 20, fontWeight: '700', color: "#FFFFFF, marginBottom: 4 },
    familyRelation: { fontSize: 13, color: "#FFFFFFSecondary, marginBottom: 12, fontWeight: '500' },
    familyEid: { fontSize: 11, color: "#FFFFFFTertiary, fontFamily: 'monospace', marginBottom: 16 },
    visaStatus: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
    visaStatusText: { fontSize: 12, fontWeight: '600' },

    pageIndicators: { flexDirection: 'row', justifyContent: 'center', marginTop: 16, gap: 6 },
    indicator: { width: 6, height: 6, borderRadius: 3 },

    // Financial Statement
    financialStatement: {
        backgroundColor: "#1E1E1E,
        borderRadius: 20,
        padding: 24,
        marginBottom: 32,
        ...THEME.shadows.md,
    },
    statementHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    statementTitle: { fontSize: 14, fontWeight: '600', color: "#FFFFFFSecondary, marginLeft: 10 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    totalLabel: { fontSize: 13, color: "#FFFFFFSecondary, fontWeight: '500' },
    totalAmount: { fontSize: 24, fontWeight: '700', color: "#FFFFFF, fontFamily: 'monospace' },
    divider: { height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', marginVertical: 16 },
    breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
    breakdownLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    breakdownIcon: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    breakdownCategory: { fontSize: 13, color: "#FFFFFFSecondary, fontWeight: '500' },
    breakdownAmount: { fontSize: 14, color: "#FFFFFF, fontWeight: '600', fontFamily: 'monospace' },

    // Business Card
    businessCard: {
        backgroundColor: "#1E1E1E,
        borderRadius: 20,
        padding: 24,
        marginBottom: 32,
        ...THEME.shadows.md,
    },
    businessHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        gap: 6,
    },
    statusText: { fontSize: 11, color: "#10B981, fontWeight: '600' },
    businessName: { fontSize: 20, fontWeight: '700', color: "#FFFFFF, marginBottom: 14 },
    licenseRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    licenseLabel: { fontSize: 12, color: "#FFFFFFSecondary, fontWeight: '500' },
    licenseValue: { fontSize: 12, color: "#FFFFFF, fontWeight: '600', fontFamily: 'monospace' },
    establishedText: { fontSize: 11, color: "#FFFFFFTertiary, marginTop: 4 },

    // Security
    securityCard: {
        backgroundColor: "#1E1E1E,
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        ...THEME.shadows.sm,
    },
    securityTitle: { fontSize: 13, color: "#FFFFFF, fontWeight: '600', marginBottom: 2 },
    securityLocation: { fontSize: 11, color: "#FFFFFFSecondary },
    securityTime: { fontSize: 11, color: "#FFFFFFTertiary, fontFamily: 'monospace' },
});
