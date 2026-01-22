import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle, Fingerprint } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function BabyJourneyDemoScreen() {
    const { theme } = useTheme();
    const [progress, setProgress] = useState(75);
    const [isScanning, setIsScanning] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);

    const progressAnim = useRef(new Animated.Value(75)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const scanLineAnim = useRef(new Animated.Value(0)).current;
    const certificateAnim = useRef(new Animated.Value(width)).current;
    const checkmarkScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Pulsing button animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.08,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const handleFinalize = () => {
        setIsScanning(true);

        // Scanning animation
        Animated.loop(
            Animated.timing(scanLineAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            })
        ).start();

        // After 2.5 seconds, complete the scan
        setTimeout(() => {
            setIsScanning(false);
            setProgress(100);
            setIsCompleted(true);

            // Animate progress to 100%
            Animated.timing(progressAnim, {
                toValue: 100,
                duration: 1500,
                useNativeDriver: false,
            }).start();

            // Show checkmark
            Animated.sequence([
                Animated.spring(checkmarkScale, {
                    toValue: 1.2,
                    friction: 3,
                    useNativeDriver: true,
                }),
                Animated.spring(checkmarkScale, {
                    toValue: 1,
                    friction: 3,
                    useNativeDriver: true,
                }),
            ]).start();

            // Slide up certificate
            setTimeout(() => {
                setShowCertificate(true);
                Animated.spring(certificateAnim, {
                    toValue: 0,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }).start();
            }, 1000);
        }, 2500);
    };

    const circumference = 2 * Math.PI * 90;
    const strokeDashoffset = circumference - (progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    }));

    const scanLineTranslateY = scanLineAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 100],
    });

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    {/* Header */}
                    <Text style={[styles.header, { color: theme.text }]}>Welcome home with</Text>
                    <Text style={[styles.headerSub, { color: theme.text }]}>your little one</Text>

                    {/* Progress Ring */}
                    <View style={styles.ringContainer}>
                        <Svg width=220" height=220">
                            {/* Background Circle */}
                            <Circle
                                cx=110"
                                cy=110"
                                r=90"
                                stroke="rgba(255, 255, 255, 0.1)"
                                strokeWidth=8"
                                fill="none"
                            />
                            {/* Progress Circle */}
                            <AnimatedCircle
                                cx=110"
                                cy=110"
                                r=90"
                                stroke={theme.primary}
                                strokeWidth=8"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                rotation="-90"
                                origin=110, 110"
                            />
                        </Svg>

                        {/* Center Content */}
                        <View style={styles.ringCenter}>
                            {!isCompleted ? (
                                <Text style={[styles.percentage, { color: theme.text }]}>{progress}%</Text>
                            ) : (
                                <Animated.View style={{ transform: [{ scale: checkmarkScale }] }}>
                                    <CheckCircle size={64} color={theme.primary} />
                                </Animated.View>
                            )}
                        </View>

                        {/* Biometric Scan Overlay */}
                        {isScanning && (
                            <View style={styles.scanOverlay}>
                                <Fingerprint size={80} color={theme.primary} />
                                <Animated.View
                                    style={[
                                        styles.scanLine,
                                        {
                                            transform: [{ translateY: scanLineTranslateY }],
                                            backgroundColor: theme.primary,
                                        },
                                    ]}
                                />
                                <Text style={[styles.scanText, { color: theme.text }]}>Verifying Identity...</Text>
                            </View>
                        )}
                    </View>

                    {/* Status Text */}
                    {isCompleted && (
                        <Text style={[styles.completedText, { color: theme.primary }]}>
                            Digital Birth Certificate: Created
                        </Text>
                    )}

                    {/* Action Button */}
                    {!isCompleted && !isScanning && (
                        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: theme.primary }]}
                                onPress={handleFinalize}
                            >
                                <Text style={styles.buttonText}>Finalize Digital Identity</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                </View>

                {/* Certificate Card */}
                {showCertificate && (
                    <Animated.View
                        style={[
                            styles.certificate,
                            { transform: [{ translateY: certificateAnim }] },
                        ]}
                    >
                        <BlurView intensity={95} tint="dark" style={styles.certificateBlur}>
                            <View style={[styles.certificateContent, { backgroundColor: theme.cardBg }]}>
                                <Text style={[styles.certTitle, { color: theme.text }]}>Official Birth Certificate</Text>
                                <View style={styles.qrCode}>
                                    <Text style={[styles.qrText, { color: theme.textSecondary }]}>████████</Text>
                                    <Text style={[styles.qrText, { color: theme.textSecondary }]}>████████</Text>
                                    <Text style={[styles.qrText, { color: theme.textSecondary }]}>████████</Text>
                                </View>
                                <View style={styles.seal}>
                                    <Text style={[styles.sealText, { color: theme.primary }]}>🛡️ GOVERNMENT SEAL</Text>
                                </View>
                                <Text style={[styles.caption, { color: theme.textSecondary }]}>
                                    Your physical ID is being printed and will arrive via courier in 2 days.
                                </Text>
                            </View>
                        </BlurView>
                    </Animated.View>
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    content: { flex: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 24 },
    header: { fontSize: 28, fontWeight: '300', textAlign: 'center' },
    headerSub: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 60 },
    ringContainer: { width: 220, height: 220, marginBottom: 40, position: 'relative', justifyContent: 'center', alignItems: 'center' },
    ringCenter: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
    percentage: { fontSize: 48, fontWeight: '700' },
    scanOverlay: { position: 'absolute', width: 220, height: 220, justifyContent: 'center', alignItems: 'center' },
    scanLine: { position: 'absolute', width: 200, height: 3, opacity: 0.8 },
    scanText: { position: 'absolute', bottom: 20, fontSize: 14, fontWeight: '600' },
    completedText: { fontSize: 18, fontWeight: '600', marginBottom: 60, textAlign: 'center' },
    button: { paddingHorizontal: 32, paddingVertical: 18, borderRadius: 30 },
    buttonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
    certificate: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 400,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
    },
    certificateBlur: { flex: 1, padding: 32 },
    certificateContent: { flex: 1, borderRadius: 20, padding: 24, justifyContent: 'center', alignItems: 'center' },
    certTitle: { fontSize: 20, fontWeight: '700', marginBottom: 24 },
    qrCode: { width: 120, height: 120, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    qrText: { fontSize: 12, letterSpacing: -2 },
    seal: { marginBottom: 20 },
    sealText: { fontSize: 14, fontWeight: '700', letterSpacing: 1 },
    caption: { fontSize: 13, textAlign: 'center', lineHeight: 20 },
});
