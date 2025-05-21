import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast, ToastContainer } from 'react-toastify';

export const valueContext = createContext()
const Root = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [recipes, setRecipes] = useState([])

    const googleProvider = new GoogleAuthProvider;
    googleProvider.addScope("profile");
    googleProvider.addScope("email");

    useEffect(() => {
        fetch('http://localhost:3000/recipes')
            .then(res => res.json())
            .then(json => setRecipes(json))
            .catch(err => console.error('Error fetching data:', err));
    }, []);


    //google login
    const handleGoogleLogin = (from) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser(result.user);
                navigate(from ? from : '/');
                toast.success("SignIn With Google is Successful");
            })
            .catch((error) => {
                toast.error("Google sign-in failed")
                console.log(error)
            })
    }


    // Signin
    const handleSignIn = (email, password, from) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setLoading(false);
                navigate(from ? from : '/');
                toast.success("Login Successful!");


            })
            .catch((error) => {
                toast.error('Something Went Wrong!')
                console.log(error);
            })
    }

    // Signup
    const handleSignUp = (email, password, name, photo) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photo
                })
                navigate('/')
                toast.success("SignUp Successful!")
            })
            .catch(error => {
                toast.error('Something Went Wrong...');
                console.log(error);
            })
    }

    // Profile Update
    const handleProfileUpdate = (name, photo) => {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        }).then(() => {
            toast.success('Profile Updated Successfully!')
            setUser({
                ...auth.currentUser,
                displayName: name,
                photoURL: photo
            });

        }).catch((error) => {
            console.log(error);
            toast("An error occurred")
        })

    }

    // Logout Handling
    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                toast.success("Sign-out Successful!")
                setLoading(false);
            }).catch((error) => {
                toast.error('Something Went Wrong!');
                console.log(error);
            });
    }

    // Setting Up Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])


    const contextValues = {
        handleSignUp,
        handleProfileUpdate,
        user,
        loading,
        setLoading,
        handleLogOut,
        handleGoogleLogin,
        handleSignIn,
        recipes,
        setRecipes
    }
    return (
        <div>
            <valueContext.Provider value={contextValues}>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </valueContext.Provider>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Root;