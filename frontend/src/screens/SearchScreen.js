import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Mic, TrendingUp, HelpCircle, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { SEARCH_DATA, USER_PROFILE } from '../mockData';

const { width } = Dimensions.get('window');

export default function SearchScreen() {
    const { theme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>What can I help you with today?</Text>
                </View>

                {/* AI Chat Bar */}
                <View style={styles.chatContainer}>
                    <Text style={styles.chatLabel}>I'm here to help, {USER_PROFILE.name.split(' ')[0]}.</Text>
                    <View style={styles.inputWrapper}>
                        <Search color="rgba(255, 255, 255, 0.6)" size={20} />
                        <TextInput
                            placeholder="Tell me what's on your mind..."
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.micBtn}>
                            <Mic color="#FFF" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    {/* Recent Searches */}
                    <View style={styles.recentSection}>
                        <Text style={styles.sectionTitle}>Recent Searches</Text>
                        <View style={styles.recentList}>
                            {['Golden Visa Application', 'Trade License Renewal', 'Birth Certificate'].map((query, index) => (
                                <TouchableOpacity key={index} style={styles.recentItem}>
                                    <Search color="#64748B} size={18} />
                                    <Text style={styles.recentText}>{query}</Text>
                                    <ChevronRight color={"#FFFFFF"Secondary"} size={16} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Trending Chips */}
                    <View style={styles.trendingSection}>
                        <View style={styles.sectionHeader}>
                            <TrendingUp color="#E11D48} size={20} />
                            <Text style={[styles.sectionTitle, { marginLeft: 10 }]}>Trending Now</Text>
                        </View>
                        <View style={styles.chipContainer}>
                            {SEARCH_DATA.trending.map((tag, index) => (
                                <TouchableOpacity key={index} style={styles.chip}>
                                    <Text style={styles.chipText}>{tag}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* FAQ Bento */}
                    <Text style={styles.sectionTitle}>Frequently Asked</Text>
                    <View style={styles.faqGrid}>
                        {SEARCH_DATA.faqs.map((faq) => (
                            <TouchableOpacity key={faq.id} style={styles.faqCard}>
                                <View style={styles.faqHeader}>
                                    <HelpCircle color="#64748B} size={24} />
                                    <ChevronRight color={"#FFFFFF"Secondary"} size={16} />
                                </View>
                                <Text style={styles.faqQuestion}>{faq.question}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={{ height: 100 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212", },
    safeArea: { flex: 1 },
    header: { paddingHorizontal: 24, paddingVertical: 16 },
    headerTitle: { fontSize: 32, fontWeight: 'bold', color: "#FFFFFF", },

    chatContainer: { paddingHorizontal: 24, marginBottom: 24 },
    chatLabel: { color: "#FFFFFFSecondary, fontSize: 16, marginBottom: 16 },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: "#1E1E1E, borderWidth: 1, borderColor: rgba(255, 255, 255, 0.1),
        borderRadius: 24, padding: 6, paddingLeft: 16
    },
    input: { flex: 1, fontSize: 16, color: "#FFFFFF, marginLeft: 12, height: 50 },
    micBtn: {
        width: 48, height: 48, borderRadius: 24,
        backgroundColor: "#E11D48, alignItems: 'center', justifyContent: 'center',
        ...THEME.shadows.md,
    },

    content: { paddingHorizontal: 24 },

    trendingSection: { marginBottom: 32 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: "#FFFFFF", },
    chipContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    chip: {
        backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20,
        paddingHorizontal: 16, paddingVertical: 10, marginRight: 10, marginBottom: 10,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
    },
    chipText: { color: "#E11D48, fontWeight: '600' },

    recentSection: { marginBottom: 32 },
    recentList: {},
    recentItem: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: "#1E1E1E, padding: 16, borderRadius: 16, marginBottom: 12,
        borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.1)",     },
    recentText: { flex: 1, color: "#FFFFFF, marginLeft: 12, fontSize: 15 },

    faqGrid: { marginTop: 16 },
    faqCard: {
        backgroundColor: "#1E1E1E, borderRadius: 20, padding: 20, marginBottom: 16,
        borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.1)",     },
    faqHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    faqQuestion: { color: "#FFFFFF, fontSize: 16, fontWeight: '600' }
});
