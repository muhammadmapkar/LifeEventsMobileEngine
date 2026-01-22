import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, MapPin, Truck, Clock, CheckCircle } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { TRACKING_DATA } from '../mockData';

export default function TrackerScreen({ navigation }) {
    const { theme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronRight size={24} color="#FFF" style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Document Tracker</Text>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    {/* Status Card */}
                    <View style={styles.statusCard}>
                        <View style={styles.statusHeader}>
                            <Text style={styles.docTitle}>{TRACKING_DATA.documentTitle}</Text>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>{TRACKING_DATA.status}</Text>
                            </View>
                        </View>
                        <View style={styles.locationRow}>
                            <MapPin size={14} color="rgba(255, 255, 255, 0.6)" />
                            <Text style={styles.locationText}>{TRACKING_DATA.currentLocation}</Text>
                        </View>
                    </View>

                    {/* Map Tile */}
                    <View style={styles.mapContainer}>
                        <Image
                            source={{ uri: TRACKING_DATA.mapImage }}
                            style={styles.mapImage}
                            resizeMode="cover"
                        />
                        <View style={styles.mapOverlay}>
                            <View style={styles.radarIcon}>
                                <Truck color="#FFF" size={24} />
                            </View>
                        </View>
                    </View>

                    {/* Timeline Container */}
                    <View style={styles.timelineContainer}>
                        {TRACKING_DATA.steps.map((step, index) => (
                            <View key={index} style={styles.stepRow}>
                                <View style={styles.timeColumn}>
                                    <Text style={styles.timeText}>{step.date.split(',')[1] || step.date}</Text>
                                </View>

                                <View style={styles.lineConfig}>
                                    <View style={[styles.dot, step.active ? styles.activeDot : step.completed ? styles.completedDot : styles.futureDot]}>
                                        {step.completed && <CheckCircle size={12} color="#000" />}
                                        {step.active && <Clock size={12} color="#FFF" />}
                                    </View>
                                    {index !== TRACKING_DATA.steps.length - 1 && <View style={styles.line} />}
                                </View>

                                <View style={styles.infoColumn}>
                                    <Text style={[styles.stepTitle, step.active || step.completed ? styles.textActive : styles.textInactive]}>
                                        {step.title}
                                    </Text>
                                    {step.active && <Text style={styles.activeLabel}>Current Stage</Text>}
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212" },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
    backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, marginRight: 16 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: "#FFFFFF" },
    content: { padding: 24, paddingTop: 0 },

    statusCard: {
        backgroundColor: "#1E1E1E",
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    docTitle: { fontSize: 18, fontWeight: 'bold', color: "#FFFFFF" },
    statusBadge: { backgroundColor: "#E11D48", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
    statusText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
    locationRow: { flexDirection: 'row', alignItems: 'center' },
    locationText: { color: "rgba(255, 255, 255, 0.6)", fontSize: 14, marginLeft: 6 },

    mapContainer: {
        height: 200,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 32,
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    mapImage: { width: '100%', height: '100%' },
    mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(11, 17, 32, 0.4)', alignItems: 'center', justifyContent: 'center' },
    radarIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#E11D48",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#E11D48",
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 10,
    },

    timelineContainer: { paddingLeft: 10 },
    stepRow: { flexDirection: 'row', minHeight: 70 },
    timeColumn: { width: 80, alignItems: 'flex-end', paddingRight: 16 },
    timeText: { color: "rgba(255, 255, 255, 0.6)", fontSize: 12, fontWeight: '600' },

    lineConfig: { alignItems: 'center', width: 24 },
    dot: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
    activeDot: { backgroundColor: "#E11D48", borderWidth: 2, borderColor: '#FFF' },
    completedDot: { backgroundColor: "#10B981" },
    futureDot: { backgroundColor: "rgba(255, 255, 255, 0.6)" },
    line: { position: 'absolute', top: 24, bottom: -4, width: 2, backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 1 },

    infoColumn: { flex: 1, paddingLeft: 16 },
    stepTitle: { fontSize: 16, marginBottom: 4 },
    textActive: { color: "#FFFFFF", fontWeight: 'bold' },
    textInactive: { color: "rgba(255, 255, 255, 0.6)" },
    activeLabel: { color: "#E11D48", fontSize: 12, fontWeight: 'bold' },
});
