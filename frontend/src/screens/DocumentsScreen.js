import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Folder, CheckCircle, AlertTriangle, QrCode } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { DOCUMENTS } from '../mockData';

const { width } = Dimensions.get('window');

export default function DocumentsScreen() {
    const { theme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Secure Documents</Text>
                    <TouchableOpacity style={styles.uploadBtn}>
                        <Text style={styles.uploadText}>+ Add Document</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Expiry Alerts */}
                    <Text style={styles.sectionLabel}>Expiry Alerts</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.alertScroll}>
                        {DOCUMENTS.expiryAlerts.map((alert) => (
                            <View key={alert.id} style={[styles.alertCard, { borderColor: alert.status === 'critical' ? "#EF4444" : "#F59E0B" }]}>
                                <AlertTriangle size={20} color={alert.status === 'critical' ? "#EF4444" : "#F59E0B"} />
                                <View style={styles.alertInfo}>
                                    <Text style={styles.alertTitle}>{alert.title}</Text>
                                    <Text style={[styles.alertDays, { color: alert.status === 'critical' ? "#EF4444" : "#F59E0B" }]}>
                                        {alert.daysLeft} Days Left
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Smart Folders */}
                    <Text style={styles.sectionLabel}>Smart Folders</Text>
                    <View style={styles.folderGrid}>
                        {DOCUMENTS.folders.map((folder) => (
                            <TouchableOpacity key={folder.id} style={styles.folderCard}>
                                <Folder size={32} color="#E11D48" fill="rgba(0, 212, 255, 0.1)" />
                                <Text style={styles.folderTitle}>{folder.title}</Text>
                                <Text style={styles.folderCount}>{folder.count} files</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Verification QR */}
                    <TouchableOpacity style={styles.qrCard}>
                        <View style={styles.qrContent}>
                            <View style={styles.qrIconBox}>
                                <QrCode size={32} color="#FFF" />
                            </View>
                            <View style={styles.qrTextContainer}>
                                <Text style={styles.qrTitle}>Share Verified Identity</Text>
                                <Text style={styles.qrSub}>Generate secure access code</Text>
                            </View>
                        </View>
                        <View style={styles.qrDecoration} />
                    </TouchableOpacity>

                    {/* Signature History */}
                    <Text style={styles.sectionLabel}>Signature History</Text>
                    {DOCUMENTS.history.map((item) => (
                        <View key={item.id} style={styles.historyItem}>
                            <View style={styles.historyIcon}>
                                <FileText size={20} color="#64748B" />
                            </View>
                            <View style={styles.historyInfo}>
                                <Text style={styles.historyTitle}>{item.title}</Text>
                                <Text style={styles.historyDate}>{item.date}</Text>
                            </View>
                            <CheckCircle size={20} color="#10B981" />
                        </View>
                    ))}

                    <View style={{ height: 100 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#FFFFFF",
    },
    uploadBtn: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    uploadText: {
        color: "#E11D48",
        fontWeight: 'bold',
    },
    content: {
        padding: 24,
        paddingTop: 10,
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#FFFFFF",
        marginBottom: 16,
        marginTop: 16,
    },
    alertScroll: {
        marginHorizontal: -24,
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#1E1E1E",
        padding: 16,
        borderRadius: 16,
        marginRight: 16,
        borderWidth: 1,
        minWidth: 180,
    },
    alertInfo: { marginLeft: 12 },
    alertTitle: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 16,
    },
    alertDays: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 2,
    },
    folderGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    folderCard: {
        width: '48%',
        backgroundColor: "#1E1E1E",
        padding: 20,
        borderRadius: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    folderTitle: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 12,
    },
    folderCount: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 13,
        marginTop: 4,
    },
    qrCard: {
        marginTop: 16,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: "#E11D48",
        padding: 4,
    },
    qrContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#312E81',
        padding: 20,
        borderRadius: 20,
        zIndex: 2,
    },
    qrIconBox: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: "#E11D48",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        shadowColor: "#E11D48",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    qrTextContainer: { flex: 1 },
    qrTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    qrSub: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
    },
    qrDecoration: {},
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#1E1E1E",
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    historyIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    historyInfo: { flex: 1 },
    historyTitle: {
        color: "#FFFFFF",
        fontWeight: '600',
        fontSize: 15,
    },
    historyDate: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 12,
        marginTop: 2,
    },
});
