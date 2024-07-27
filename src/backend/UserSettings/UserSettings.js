import { getDatabase, ref, set, get } from "firebase/database";
import { getAuth } from "firebase/auth";

export const saveUserSettings = async (userId, settings) => {
    try {
        const db = getDatabase();
        const userSettingsRef = ref(db, 'users/' + userId + '/settings');
        await set(userSettingsRef, settings);
        console.log('User settings saved successfully');
    } catch (error) {
        console.error('Error saving user settings:', error);
    }
};

export const getUserSettings = async (userId) => {
    try {
        const db = getDatabase();
        const userSettingsRef = ref(db, 'users/' + userId + '/settings');
        const settingsSnapshot = await get(userSettingsRef);
        return settingsSnapshot.val();
    } catch (error) {
        console.error('Error getting user settings:', error);
    }
};
