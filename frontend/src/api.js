import { Platform } from 'react-native';

// Using local LAN IP for physical device testing
const API_URL = 'http://192.168.0.118:3000/api';

export const getLifeEvents = async () => {
    try {
        const response = await fetch(`${API_URL}/life-events`);
        if (!response.ok) throw new Error('Failed to fetch life events');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getActionsForEvent = async (eventId) => {
    try {
        const response = await fetch(`${API_URL}/life-events/${eventId}/actions`);
        if (!response.ok) throw new Error('Failed to fetch actions');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const submitAction = async (userId, actionId, data) => {
    try {
        const response = await fetch(`${API_URL}/submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, action_id: actionId, data }),
        });
        if (!response.ok) throw new Error('Submission failed');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
