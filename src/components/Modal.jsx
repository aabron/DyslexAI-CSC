import { Fragment, useState } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { FaGoogle } from "react-icons/fa";
import { set, get, child, getDatabase, ref } from 'firebase/database';
import { signUpLogic, googleSignIn } from '../backend/Auth/Signup';
import { logoutLogic } from '../backend/Auth/Logout';
import { loginLogic } from '../backend/Auth/Login';
import { forgotPasswordLogic } from '../backend/Auth/Forgotpassword';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSettings } from '../ContextProvider';


const Modal = () => {
    const { isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, setFirstUserName, user, setUserInfo, emailSent, setEmailSent, toggleForgotPassword, setToggleForgotPassword } = useSettings();
    const nav = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setconfirmedPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [extraUserData, setExtraUserData] = useState({
        firstName: '',
        lastName: '',
    });//[username, email, password, extraUserData

    const [signupErrors, setSignupErrors] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confiremPassword: '',
    });

    const [loginErrors, setLoginErrors] = useState({
        email: '',
        password: '',
    });

    const loginFormValidator = () => {
        const errorTemp = {};

        if (!email) {
            errorTemp.email = 'Please enter in Email.'
        }
        if (!password) {
            errorTemp.password = 'Please enter in Password.'
        }
        setLoginErrors(errorTemp)
        return Object.keys(errorTemp).length === 0;
    };

    const SignupFormValidator = () => {
        const errorContainer = {};

        if (!extraUserData.firstName) {
            errorContainer.firstName = 'First name is required.';
        }

        if (!extraUserData.lastName) {
            errorContainer.lastName = 'Last name is required.';
        }

        if (!username) {
            errorContainer.username = 'Username is required.';
        }

        if (!email) {
            errorContainer.email = "Email is required.";
        }

        if (!password) {
            errorContainer.password = "Password is required.";
        }

        if (!confirmedPassword) {
            errorContainer.confirmedPassword = "Confirm password is required.";
        }

        setSignupErrors(errorContainer);
        return Object.keys(errorContainer).length === 0;
    };
    const resetPasswordErrorMessage = () => {
        setPasswordError('');
    }

    const closeModal = () => {
        resetPasswordErrorMessage(); // clear the displayed error message when user click exist out of the pop up form
        setIsOpen(false);
        setIsLogin(true); // Reset to login form when closing modal
        setToggleForgotPassword(false);
    };
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = async () => {
        loginFormValidator();
        try {
            setLoading(true);
            // Do logic for login here!!!!
            // console.log(email, password)
            const response = await loginLogic(email, password)
            console.log(response)
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                console.log(snapshot);
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    setFirstUserName(snapshot.val().firstname)
                    localStorage.setItem('firstname', snapshot.val().firstname);
                    // setUserInfo({ userInfo: snapshot.val().firstname, email: snapshot.val().email})
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
            setIsOpen(false);
            setIsAuthenticated(true);
            setLoading(false);
            nav('/');
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            setLoading(false);
            setError(error.message);
        }
    };


    const handleGoogleSignUp = async () => {
        console.log('google signup')
        try {
            const response = await googleSignIn(extraUserData.firstName);
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // display user name
                    const dbRef = ref(getDatabase());
                    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                        console.log(snapshot);
                        if (snapshot.exists()) {
                            console.log(snapshot.val());
                            setFirstUserName(snapshot.val().firstname);
                            localStorage.setItem('firstname', snapshot.val().firstname);
                        } else {
                            console.log("No data available");
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                }
                else {
                    // User is signed out or not yet signed in.
                    console.log("User is not signed in.");
                }
            });
            setIsOpen(false);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);

            setIsAuthenticated(false);
            setLoading(false);
            setError(error.message);
        }
    };
    /* 
    const handleGoogleSignUp = async () => {
     console.log('google signup')
     try {
         const response = await googleSignIn(extraUserData.firstName);
         const dbRef = ref(getDatabase());
             get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                 console.log(snapshot);
                 if (snapshot.exists()) {
                     console.log(snapshot.val());
                     setFirstUserName(snapshot.val().firstname)
                 } else {
                     console.log("No data available");
                 }
             }).catch((error) => {
                 console.error(error);
             });
         setIsOpen(false);
         setIsAuthenticated(true);
     } catch (error) {
         console.error(error);
         setIsAuthenticated(false); 
         setLoading(false); 
         setError(error.message); 
     }
    };
    */
    const handleSignup = async () => {
        console.log(email, password, username)
        SignupFormValidator();
        if (password !== confirmedPassword) {
            setPasswordError("Password do not match");
            return;
        }
        try {
            setLoading(true);
            //do logic for signup here!!!!
            const response = await signUpLogic(email, username, password, extraUserData.firstName, extraUserData.lastName);
            setFirstUserName();

            // return user's first name to display it on website pages
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // display user name
                    const dbRef = ref(getDatabase());
                    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                        console.log(snapshot);
                        if (snapshot.exists()) {
                            console.log(snapshot.val());
                            setFirstUserName(snapshot.val().firstname);
                            localStorage.setItem('firstname', snapshot.val().firstname);
                        } else {
                            console.log("No data available");
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                }
                else {
                    // User is signed out or not yet signed in.
                    console.log("User is not signed in.");
                }
            });

            setIsOpen(false);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            setLoading(false);
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        //console.log(email, password, username)
        try {
            setLoading(true);
            console.log(isAuthenticated)
            await logoutLogic()
            setIsAuthenticated(false);
            nav('/');
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            setLoading(false);
            setError(error.message);
        }

    };

    const handleForgotPassword = async () => {
        try {
            setLoading(true);
            const response = await forgotPasswordLogic(email)
            console.log(response)
            setEmailSent(true);
        } catch (error) {
            setError(error.message);
            setLoading(false);
            setEmailSent(false);
        }
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 " onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        {isAuthenticated ? null : toggleForgotPassword ? "Forgot your password?" : (isLogin ? 'Welcome back! Please Login' : 'Thanks for your interest, Please Signup')}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        {!toggleForgotPassword ?
                                            (
                                                !isAuthenticated ?
                                                    (
                                                        <>
                                                            {isLogin ? (
                                                                <form>

                                                                    <div className="mb-4 w-full flex justify-start">
                                                                        <button onClick={handleGoogleSignUp} className="w-[60%] py-4 bg-blue-500 rounded-lg  flex flex-row items-center white-text">
                                                                            <FaGoogle size={30} className='mr-2 ml-2' />Continue with Google
                                                                        </button>
                                                                    </div>
                                                                    <div className='mb-2'>
                                                                        {error && "Error Logging in, Please Try Again"}
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="login-username">
                                                                            Email
                                                                        </label>
                                                                        <input
                                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-black leading-tight focus:outline-none focus:shadow-outline"
                                                                            id="login-email"
                                                                            type="text"
                                                                            placeholder="Email"
                                                                            onChange={(e) => { setEmail(e.target.value); setLoginErrors({ ...loginErrors, email: '' }); }}
                                                                        />
                                                                        {loginErrors.email && <p style={{ color: 'red' }}>{loginErrors.email}</p>}
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">
                                                                            Password
                                                                        </label>
                                                                        <input
                                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-black leading-tight focus:outline-none focus:shadow-outline"
                                                                            id="login-password"
                                                                            type="password"
                                                                            placeholder="Password"
                                                                            onChange={(e) => { setPassword(e.target.value); setLoginErrors({ ...loginErrors, password: '' }); }}
                                                                        />
                                                                        {loginErrors.password && <p style={{ color: 'red' }}>{loginErrors.password}</p>}
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <button
                                                                            className="bg-gray-900 hover:bg-secondary  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 duration-300 ease-in-out"
                                                                            type="button"
                                                                            onClick={handleLogin}
                                                                        >
                                                                            Login
                                                                        </button>
                                                                        <div>
                                                                            <p className="text-sm text-blue-500 hover:underline cursor-pointer" onClick={toggleForm}>
                                                                                I don't have an account
                                                                            </p>
                                                                            <p className="text-sm text-blue-500 hover:underline cursor-pointer pt-1" onClick={() => setToggleForgotPassword(!toggleForgotPassword)}>
                                                                                Forgot Password?
                                                                            </p>
                                                                        </div>

                                                                    </div>
                                                                </form>
                                                            ) : (
                                                                <form>
                                                                    <div className="mb-4 w-full flex justify-start">
                                                                        <button onClick={handleGoogleSignUp} className="w-[60%] py-4 bg-red-500 rounded-lg  flex flex-row items-center">
                                                                            <FaGoogle size={30} className='mr-2 ml-2' />Continue with Google
                                                                        </button>
                                                                    </div>
                                                                    <div className='mb-2'>
                                                                        {error && "Error Signing up, Please Try Again"}
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-username">
                                                                            First Name
                                                                        </label>
                                                                        <input
                                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-black leading-tight focus:outline-none focus:shadow-outline"
                                                                            id="signup-firstName"
                                                                            type="text"
                                                                            placeholder="First Name"
                                                                            onChange={(e) => { setExtraUserData({ ...extraUserData, firstName: e.target.value }); setSignupErrors({ ...signupErrors, firstName: '' }); }}
                                                                        />
                                                                        {signupErrors.firstName && <p style={{ color: 'red' }}>{signupErrors.firstName}</p>}
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-username">
                                                                            Last Name
                                                                        </label>
                                                                        <input
                                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-black leading-tight focus:outline-none focus:shadow-outline"
                                                                            id="signup-lastName"
                                                                            type="text"
                                                                            placeholder="Last Name"
                                                                            onChange={(e) => { setExtraUserData({ ...extraUserData, lastName: e.target.value }); setSignupErrors({ ...signupErrors, lastName: '' }); }}
                                                                        />
                                                                        {signupErrors.lastName && <p style={{ color: 'red' }}>{signupErrors.lastName}</p>}
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-username">
                                                                            Username
                                                                        </label>
                                                                        <input
                                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-black leading-tight focus:outline-none focus:shadow-outline"
                                                                            id="signup-username"
                                                                            type="text"
                                                                            placeholder="Username"
                                                                            onChange={(e) => { setUsername(e.target.value); setSignupErrors({ ...signupErrors, username: '' }); }}
                                                                        />
                                                                        {signupErrors.username && <p style={{ color: 'red' }}>{signupErrors.username}</p>}
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">
                                                                            Email
                                                                        </label>
                                                                        <input
                                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-black leading-tight focus:outline-none focus:shadow-outline"
                                                                            id="signup-email"
                                                                            type="email"
                                                                            placeholder="Email"
                                                                            onChange={(e) => { setEmail(e.target.value); setSignupErrors({ ...signupErrors, email: '' }); }}
                                                                        />
                                                                        {signupErrors.email && <p style={{ color: 'red' }}>{signupErrors.email}</p>}
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
                                                                            Password
                                                                        </label>
                                                                        <input
                                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-black leading-tight focus:outline-none focus:shadow-outline"
                                                                            id="signup-password"
                                                                            type="password"
                                                                            placeholder="Password"
                                                                            onChange={(e) => { setPassword(e.target.value); setPasswordError(''); setSignupErrors({ ...signupErrors, password: '' }); }}
                                                                        />
                                                                        {signupErrors.password && <p style={{ color: 'red' }}>{signupErrors.password}</p>}
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
                                                                            Password
                                                                        </label>
                                                                        <input
                                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-black leading-tight focus:outline-none focus:shadow-outline"
                                                                            id="signup-password"
                                                                            type="password"
                                                                            placeholder="Confirm Password"
                                                                            onChange={(e) => { setconfirmedPassword(e.target.value); setPasswordError(''); setSignupErrors({ ...signupErrors, confirmedPassword: '' }); }}
                                                                        />
                                                                        {signupErrors.confirmedPassword && <p style={{ color: 'red' }}>{signupErrors.confirmedPassword}</p>}
                                                                    </div>
                                                                    <div>
                                                                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>} {/* Display the error message if there is one */}
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <button
                                                                            className="bg-gray-900 hover:bg-secondary  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 duration-300 ease-in-out"
                                                                            type="button"
                                                                            onClick={handleSignup}
                                                                        >
                                                                            Signup
                                                                        </button>
                                                                        <p className="text-sm text-blue-500 hover:underline cursor-pointer" onClick={toggleForm}>
                                                                            I already have an account
                                                                        </p>
                                                                    </div>
                                                                </form>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center justify-between flex-col">
                                                            <h1 className="text-lg font-semibold">Are you sure you want to log out?</h1>
                                                            <button
                                                                className="bg-secondary hover:bg-secondary  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 duration-300 ease-in-out"
                                                                type="button"
                                                                onClick={() => { handleLogout(); closeModal() }}
                                                            >
                                                                Logout
                                                            </button>
                                                        </div>
                                                    )
                                            ) : (
                                                emailSent ? (
                                                    <div className="flex items-center justify-center flex-col">
                                                        <h1>Email sent to {email}</h1>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="mb-4">
                                                            <div className='mb-2 flex-col '>
                                                                <h1 className='text-lg font-semibold'>Forgot your password?</h1>
                                                                <p className='text-sm'>Enter your email address and we will send you a link to reset your password.</p>
                                                            </div>
                                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="forgot-email">
                                                                Email
                                                            </label>
                                                            <input
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-black leading-tight focus:outline-none focus:shadow-outline"
                                                                id="forgot-email"
                                                                type="email"
                                                                placeholder="Email"
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <button
                                                                className="bg-secondary hover:bg-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 duration-300 ease-in-out"
                                                                type="button"
                                                                onClick={handleForgotPassword}
                                                            >
                                                                Reset Password
                                                            </button>
                                                            <div className='flex flex-row justify-between'>
                                                                <p className="text-sm text-blue-500 hover:underline cursor-pointer px-1" onClick={() => setToggleForgotPassword(false)}>
                                                                    Go back
                                                                </p>
                                                                <p className="text-sm text-blue-500 hover:underline cursor-pointer px-3" onClick={() => {setToggleForgotPassword(false); setIsOpen(false)}}>
                                                                    Close
                                                                </p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                    {isAuthenticated ?
                                        null :
                                        (
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300 ease-in-out"
                                                    onClick={closeModal}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        )
                                    }

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Modal;
