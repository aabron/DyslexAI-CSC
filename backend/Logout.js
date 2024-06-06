// logout
import { getAuth, signOut } from "firebase/auth";

const logoutLogic = async () => {
    const auth = getAuth();
    await signOut(auth);
    console.log("Log out completed");
};