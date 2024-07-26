//login
//saba
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const loginLogic = async ( email, password ) => {
    const auth = getAuth();
    // console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
            const user = userInfo.user;
            console.log("Login Completed");
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error during login:", errorCode, errorMessage);
        });
};
