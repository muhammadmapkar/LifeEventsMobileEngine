import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, ChevronRight, Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { PAYMENT_DATA } from '../mockData';

export default function PaymentScreen({ navigation }) {
    const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
    const { theme } = useTheme();

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <LinearGradient colors={[theme.background, '#1F2937']} style={styles.background} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronRight size={24} color="#FFF" style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Payment Portal</Text>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    {/* Total Due Card */}
                    <Animated.View style={[styles.totalCard, { transform: [{ translateX: slideAnim }] }]}>
                        <LinearGradient
                            colors={['#312E81', '#E11D48']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            style={styles.gradientCard}
                        >
                            <Text style={styles.totalLabel}>Total Amount Due</Text>
                            <Text style={styles.totalValue}>AED {PAYMENT_DATA.totalDue}</Text>
                            <View style={styles.cardChip}>
                                <CreditCard color="#FFF" size={24} />
                                <Text style={styles.cardText}>•••• 4242</Text>
                            </View>
                        </LinearGradient>
                    </Animated.View>

                    {/* Fees List */}
                    <Text style={styles.sectionTitle}>Breakdown</Text>
                    <View style={styles.feeList}>
                        {PAYMENT_DATA.fees.map((fee) => (
                            <View key={fee.id} style={styles.feeItem}>
                                <View style={styles.feeInfo}>
                                    <View style={styles.feeBullet} />
                                    <Text style={styles.feeTitle}>{fee.title}</Text>
                                </View>
                                <Text style={styles.feeAmount}>AED {fee.amount}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Pay Button */}
                    <TouchableOpacity style={styles.payBtn}>
                        <LinearGradient
                            colors={['#E11D48', '#64748B']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={styles.payGradient}
                        >
                            <Shield color="#FFF" size={24} style={{ marginRight: 12 }} />
                            <Text style={styles.payText}>Securely Settle with UAE Pass</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212" },
    background: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
    backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, marginRight: 16 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: "#FFFFFF" },
    content: { padding: 24 },

    totalCard: {
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 32,
        elevation: 10,
        shadowColor: "#E11D48",
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    gradientCard: { padding: 32, alignItems: 'center' },
    totalLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 16, marginBottom: 8 },
    totalValue: { color: '#FFF', fontSize: 42, fontWeight: 'bold', marginBottom: 24 },
    cardChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    cardText: { color: '#FFF', fontSize: 16, marginLeft: 12, fontWeight: '600' },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: "#FFFFFF", marginBottom: 16 },
    feeList: { backgroundColor: "#1E1E1E", borderRadius: 20, padding: 20, marginBottom: 32 },
    feeItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    feeInfo: { flexDirection: 'row', alignItems: 'center' },
    feeBullet: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#E11D48", marginRight: 12 },
    feeTitle: { color: "rgba(255, 255, 255, 0.6)", fontSize: 16 },
    feeAmount: { color: "#FFFFFF", fontWeight: 'bold', fontSize: 16 },

    payBtn: { borderRadius: 20, overflow: 'hidden', elevation: 8, shadowColor: "#E11D48", shadowOpacity: 0.5 },
    payGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20 },
    payText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});
