import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

export const valueContext = createContext()
const Root = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true);
    const [recipesLoading, setRecipesLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [recipes, setRecipes] = useState([])
    const [myRecipes, setMyRecipes] = useState([])
    const [initialRecipes, setInitialRecipes] = useState([])


    const googleProvider = new GoogleAuthProvider;
    googleProvider.addScope("profile");
    googleProvider.addScope("email");

    useEffect(() => {
        fetch('https://recipe-book-server-phi.vercel.app/recipes')
            .then(res => res.json())
            .then(data => {
                setRecipes(data)
                setRecipesLoading(false)
            })
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    // fetchingInitialRecipis
    useEffect(() => {
        fetch('https://recipe-book-server-phi.vercel.app/popularrecipes')
            .then(res => res.json())
            .then(data => {
                setInitialRecipes(data)
                setInitialLoading(false)
            })
            .catch(err => console.error('Error fetching data:', err));
    }, []);


    // Fetching My Recipes

    useEffect(() => {
        const fetchRecipes = async () => {

            const response = await fetch(`https://recipe-book-server-phi.vercel.app/myrecipes?email=${(user.email)}`);
            const data = await response.json();
            setMyRecipes(data)
        };
        fetchRecipes();
    }, [user]);



    // Deleting Specific Recipe
    const handleDeleteRecipe = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://recipe-book-server-phi.vercel.app/recipes/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        const remainingRecipe1 = myRecipes.filter(rec => rec._id !== _id);
                        const remainingRecipe2 = recipes.filter(rec => rec._id !== _id);
                        setMyRecipes(remainingRecipe1)
                        setRecipes(remainingRecipe2)
                        console.log(remainingRecipe1);
                        console.log(remainingRecipe2);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Recipe has been deleted.",
                            icon: "success"
                        });

                    })

            }
        });

    }



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
                    .then(() => {
                        const updatedUser = {
                            uid: auth.currentUser.uid,
                            email: auth.currentUser.email,
                            displayName: name,
                            photoURL: photo
                        };
                        setUser(updatedUser);
                        navigate('/')
                        toast.success("SignUp Successful!")
                    })
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
            }).catch((error) => {
                toast.error('Something Went Wrong!');
                console.log(error);
            });
    }

    // Setting Up Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setAuthLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])


    const contextValues = {
        handleSignUp,
        handleProfileUpdate,
        user,
        authLoading,
        recipesLoading,
        handleLogOut,
        handleGoogleLogin,
        handleSignIn,
        recipes,
        setRecipes,
        myRecipes,
        setMyRecipes,
        handleDeleteRecipe,
        initialRecipes,
        initialLoading
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