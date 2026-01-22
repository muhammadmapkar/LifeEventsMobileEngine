import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle, Clock, Circle } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { ACTIVITY_TIMELINE } from '../mockData';

export default function ActivityScreen() {
    const { theme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.headerTitle}>Your Progress Journey</Text>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {ACTIVITY_TIMELINE.map((item) => (
                        <View key={item.id} style={styles.timelineCard}>
                            {/* Card Header */}
                            <View style={styles.cardHeader}>
                                <View>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Text style={styles.cardStatus}>{item.status}</Text>
                                </View>
                                <Text style={styles.estimated}>{item.estimatedDate}</Text>
                            </View>

                            {/* Vertical Steps */}
                            <View style={styles.stepsContainer}>
                                {item.steps.map((step, index) => (
                                    <View key={index} style={styles.stepRow}>
                                        {/* Line */}
                                        {index !== item.steps.length - 1 && <View style={styles.line} />}

                                        {/* Icon */}
                                        <View style={[styles.iconBox,
                                        step.completed ? styles.iconCompleted :
                                            step.active ? styles.iconActive : styles.iconInactive
                                        ]}>
                                            {step.completed ? <CheckCircle size={14} color="#000" /> :
                                                step.active ? <Clock size={14} color="#FFF" /> :
                                                    <Circle size={10} color="rgba(255, 255, 255, 0.6)" />}
                                        </View>

                                        <Text style={[styles.stepLabel,
                                        step.active || step.completed ? styles.labelActive : styles.labelInactive
                                        ]}>
                                            {step.label}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}

                    <View style={styles.inboxSection}>
                        <Text style={styles.inboxTitle}>Support Inbox</Text>
                        <View style={styles.messageCard}>
                            <Text style={styles.msgText}>Your business trade name is reserved.</Text>
                            <Text style={styles.msgTime}>2 hours ago</Text>
                        </View>
                    </View>

                    <View style={{ height: 100 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212" },
    safeArea: { flex: 1 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: "#FFFFFF", padding: 24, paddingBottom: 10 },
    content: { padding: 24 },

    timelineCard: {
        backgroundColor: "#1E1E1E",
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: "#FFFFFF" },
    cardStatus: { fontSize: 14, color: "#E11D48", marginTop: 4, fontWeight: '600' },
    estimated: { fontSize: 12, color: "rgba(255, 255, 255, 0.6)", backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },

    stepsContainer: { paddingLeft: 8 },
    stepRow: { flexDirection: 'row', alignItems: 'center', height: 40, marginBottom: 0 },
    line: {
        position: 'absolute', left: 11, top: 24, height: 26, width: 2,
        backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 0
    },
    iconBox: {
        width: 24, height: 24, borderRadius: 12, marginRight: 16,
        alignItems: 'center', justifyContent: 'center', zIndex: 1
    },
    iconCompleted: { backgroundColor: "#10B981" },
    iconActive: { backgroundColor: "#E11D48", borderWidth: 2, borderColor: "#E11D48" },
    iconInactive: { backgroundColor: 'transparent', borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.6)" },

    stepLabel: { fontSize: 14 },
    labelActive: { color: "#FFFFFF", fontWeight: '600' },
    labelInactive: { color: "rgba(255, 255, 255, 0.6)" },

    inboxSection: { marginTop: 10 },
    inboxTitle: { fontSize: 18, fontWeight: 'bold', color: "#FFFFFF", marginBottom: 16 },
    messageCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 16,
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: "#E11D48",
    },
    msgText: { color: "#FFFFFF", fontSize: 15 },
    msgTime: { color: "rgba(255, 255, 255, 0.6)", fontSize: 12, marginTop: 4 },
});
