import { getAuth, updateProfile} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

export const usernameUpdate = async (newUserName) => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        try {
            // Update the user first name in the database
            const userRef = ref(db, 'users/' + user.uid);
            await set(userRef, {
                firstname: newUserName,
            });
            console.log("First name updated in database");

            // Update the user's profile
            await updateProfile(user, { displayName: newUserName });
            console.log("First name updated successfully in profile");
        } catch (error) {
            console.error("Error updating first name:", error);
        }
    }

}
