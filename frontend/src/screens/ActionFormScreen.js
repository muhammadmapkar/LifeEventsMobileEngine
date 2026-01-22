import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { submitAction } from '../api';

const ActionFormScreen = ({ route, navigation }) => {
    const { action, eventTitle } = route.params;
    // Basic form state - in a real app this would be dynamic based on JSON schema
    const [formData, setFormData] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            // Mock user ID 1
            await submitAction(1, action.id, formData);
            Alert.alert('Success', 'Action submitted successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to submit action. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.header}>{action.title}</Text>
                <Text style={styles.subHeader}>for {eventTitle}</Text>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Provided by National ID"
                        value="John Doe"
                        editable={false}
                    />
                    <Text style={styles.helperText}>Pre-filled from National ID</Text>
                </View>

                {/* Dynamic fields would go here */}
                {action.title.includes('Business') && (
                    <View style={styles.formSection}>
                        <Text style={styles.label}>Proposed Business Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter business name"
                            onChangeText={(text) => setFormData({ ...formData, business_name: text })}
                        />
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.submitButton, submitting && styles.disabledButton]}
                    onPress={handleSubmit}
                    disabled={submitting}
                >
                    <Text style={styles.submitButtonText}>
                        {submitting ? 'Submitting...' : 'Submit Request'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.trustText}>
                    <Text style={{ fontWeight: 'bold' }}>Secure:</Text> Data is encrypted and sent directly to government entities.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subHeader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    formSection: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    helperText: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
        fontStyle: 'italic',
    },
    submitButton: {
        backgroundColor: '#2196f3',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#2196f3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    disabledButton: {
        backgroundColor: '#90caf9',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    trustText: {
        textAlign: 'center',
        marginTop: 30,
        color: '#888',
        fontSize: 12,
    },
});

export default ActionFormScreen;
