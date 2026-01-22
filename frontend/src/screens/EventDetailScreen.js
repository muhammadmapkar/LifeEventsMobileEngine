import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, CheckCircle, Circle } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

export default function EventDetailScreen({ route, navigation }) {
    const { theme } = useTheme();
    const { event } = route.params;
    const [actions, setActions] = useState([]);

    useEffect(() => {
        // Use the checklist passed from mockData, or empty array if missing
        if (event.checklist) {
            setActions(event.checklist);
        }
    }, [event]);

    const renderAction = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.actionCard, item.is_completed && styles.actionCardCompleted]}
            onPress={() => navigation.navigate('ActionForm', { action: item, eventTitle: event.title })}
        >
            <View style={styles.actionHeader}>
                <View style={[styles.stepIndicator, item.is_completed && styles.stepCompleted]}>
                    {item.is_completed ? <Check size={16} color="#10B981" /> : <Text style={styles.stepText}>{index + 1}</Text>}
                </View>
                <View style={styles.actionContent}>
                    <Text style={[styles.actionTitle, item.is_completed && styles.textCompleted]}>{item.title}</Text>
                    <Text style={styles.actionDesc}>{item.description}</Text>
                </View>
                <View style={[styles.checkbox, item.is_completed ? styles.checkboxChecked : styles.checkboxUnchecked]}>
                    {item.is_completed && <Check size={14} color="#FFF" />}
                </View>
            </View>
        </TouchableOpacity>
    );

    const completedCount = actions.filter(a => a.is_completed).length;
    const progress = actions.length > 0 ? (completedCount / actions.length) * 100 : 0;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headerContainer}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventSubtitle}>{event.desc}</Text>

                    <View style={styles.progressSection}>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                        </View>
                        <Text style={styles.progressText}>{completedCount} of {actions.length} completed</Text>
                    </View>
                </View>

                <FlatList
                    data={actions}
                    renderItem={renderAction}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212" },
    safeArea: { flex: 1 },
    headerContainer: { padding: 24, paddingBottom: 16 },
    eventTitle: { fontSize: 28, fontWeight: 'bold', color: "#FFFFFF", marginBottom: 4 },
    eventSubtitle: { fontSize: 16, color: "rgba(255, 255, 255, 0.6)", marginBottom: 24 },

    progressSection: { marginBottom: 8 },
    progressBarBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
    progressBarFill: { height: '100%', backgroundColor: "#10B981" },
    progressText: { fontSize: 13, color: "rgba(255, 255, 255, 0.6)", textAlign: 'right' },

    list: { padding: 24, paddingTop: 0 },
    actionCard: {
        backgroundColor: "#1E1E1E",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    actionCardCompleted: { opacity: 0.6 },
    actionHeader: { flexDirection: 'row', alignItems: 'center' },
    stepIndicator: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    stepCompleted: { backgroundColor: 'rgba(16,185,129,0.1)', borderColor: "#10B981" },
    stepText: { fontWeight: 'bold', color: "#FFFFFF" },

    actionContent: { flex: 1 },
    actionTitle: { fontSize: 16, fontWeight: 'bold', color: "#FFFFFF", marginBottom: 2 },
    textCompleted: { textDecorationLine: 'line-through', color: "rgba(255, 255, 255, 0.6)" },
    actionDesc: { fontSize: 13, color: "rgba(255, 255, 255, 0.6)" },

    checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, marginLeft: 12, alignItems: 'center', justifyContent: 'center' },
    checkboxUnchecked: { borderColor: "rgba(255, 255, 255, 0.6)" },
    checkboxChecked: { backgroundColor: "#10B981", borderColor: "#10B981" },
});
