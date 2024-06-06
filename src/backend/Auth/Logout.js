// logout
import { getAuth, signOut } from "firebase/auth";

export const logoutLogic = async () => {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem('token');
    console.log("Log out completed");
};