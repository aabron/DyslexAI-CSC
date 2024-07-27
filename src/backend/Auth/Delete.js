import { getAuth, reauthenticateWithCredential, deleteUser,EmailAuthProvider } from "firebase/auth";

// functionality to delete user account
export const AccountDeletion = (password, setDelError) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(user.email,password);

    // reauthentication process before deleting user account for verification
    reauthenticateWithCredential(user, credential)
        // after reauthentication, the user account will be deleted if reauthentication proccess was successful
        .then(() => {
            return deleteUser(user);
        })
        .then(() => {
            alert('Account successfully deleted.');
        })
        // display error section
        .catch((error) => {
            setDelError(error.message);
        })
}