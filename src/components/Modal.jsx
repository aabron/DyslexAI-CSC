import { Fragment, useState } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { FaGoogle } from "react-icons/fa";
import { set } from 'firebase/database';

const Modal = ({ isOpen, setIsOpen, setIsAuthenticated }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [extraUserData, setExtraUserData] = useState({
        firstName: '',
        lastName: '',
    });//[username, email, password, extraUserData

    const closeModal = () => {
        setIsOpen(false);
        setIsLogin(true); // Reset to login form when closing modal
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = () => {
        console.log(email, password, username)
        try {
            setLoading(true);
            //do logic for login here!!!!
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            setLoading(false);
            setError(error.message);
        }
        
    };

    const handleSignup = () => {
        console.log(email, password, username)
        try {
            setLoading(true);
            //do logic for signup here!!!!
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            setLoading(false);
            setError(error.message);
        }
        
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 font-reddit" onClose={closeModal}>
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
                                        {isLogin ? 'Welcome back! Please Login' : 'Thanks for your interest, Please Signup'}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        {error && <p className="text-red-500 text-sm">{error}</p>}
                                        {isLogin ? (
                                            <form>
                                                <div className="mb-4 w-full flex justify-start">
                                                    <button className="w-[60%] py-4 bg-red-500 rounded-lg text-white flex flex-row items-center">
                                                        <FaGoogle size={30} className='mr-2 ml-2'/>Continue with Google
                                                    </button>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="login-username">
                                                        Username
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-black leading-tight focus:outline-none focus:shadow-outline"
                                                        id="login-username"
                                                        type="text"
                                                        placeholder="Username"
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
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
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <button
                                                        className="bg-gray-900 hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 duration-300 ease-in-out"
                                                        type="button"
                                                        onClick={handleLogin}
                                                    >
                                                        Login
                                                    </button>
                                                    <p className="text-sm text-blue-500 hover:underline cursor-pointer" onClick={toggleForm}>
                                                        I don't have an account
                                                    </p>
                                                </div>
                                            </form>
                                        ) : (
                                            <form>
                                                <div className="mb-4 w-full flex justify-start">
                                                    <button className="w-[60%] py-4 bg-red-500 rounded-lg text-white flex flex-row items-center">
                                                        <FaGoogle size={30} className='mr-2 ml-2'/>Continue with Google
                                                    </button>
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
                                                        onChange={(e) => setExtraUserData({...extraUserData, firstName: e.target.value})}
                                                    />
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
                                                        onChange={(e) => setExtraUserData({...extraUserData, lastName: e.target.value})}
                                                    />
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
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
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
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
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
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <button
                                                        className="bg-gray-900 hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 duration-300 ease-in-out"
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
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300 ease-in-out"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
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