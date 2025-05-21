import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { valueContext } from '../Root';


const SignUp = () => {
    const { handleSignUp, handleGoogleLogin } = useContext(valueContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photoURL.value;
        // Password Validation
        if (password.length < 6) {
            alert('Password must be of atleast 6 characters.');
            return;
        }


        // Ragex Password check
        if (!/[a-z]/.test(password)) {
            alert("Password must contain a small letter.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            alert("Password must contain a capital letter.");
            return;
        }
        if (!/\d/.test(password)) {
            alert("Password must contain atleast one number.");
            return;
        }
        if (!/[$%^#@]/.test(password)) {
            alert("Password must contain atleast one special character.");
            return;
        }
        handleSignUp(email, password,name,photo);


    }
    const signinWithGoogle = () => {
        handleGoogleLogin()

    }
    return (
        <div className='flex justify-center items-center my-6'>
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                    <p className="text-sm dark:text-gray-600">Sign Up a new account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                            <input type="text" name="name" id="name" placeholder="Alice Benjamin" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required />
                        </div>
                        <div>
                            <label htmlFor="photoURL" className="block mb-2 text-sm">Photo URL</label>
                            <input type="text" name="photoURL" id="photoURL" placeholder="imgbb.com/myphoto" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"  />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required />
                        </div>

                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">Sign up</button>
                        </div>
                        <p className="px-6 text-sm text-center dark:text-gray-600">Already have an account?
                            <NavLink to={'/auth/login'} className="hover:underline dark:text-violet-600">Sign in</NavLink>.
                        </p>
                        <div className="my-6 space-y-4">
                            <button onClick={signinWithGoogle} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 hover:bg-blue-100">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                                <p>Sign In with Google</p>
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;