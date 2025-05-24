import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
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
    const [myRecipesLoading, setMyRecipesLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [recipes, setRecipes] = useState([])
    const [myRecipes, setMyRecipes] = useState([])
    const [initialRecipes, setInitialRecipes] = useState([])
    const [error,setError] = useState(false)


    const googleProvider = new GoogleAuthProvider;
    googleProvider.addScope("profile");
    googleProvider.addScope("email");



    // fetching all recipes
    useEffect(() => {
        fetch('https://recipe-book-server-phi.vercel.app/recipes')
            .then(res => res.json())
            .then(data => {
                setRecipes(data)
                setRecipesLoading(false)
                setError(false)
            })
            .catch(err => {console.error('Error fetching data:', err)
                setError(true)
            });
    }, [error]);

    // fetchingInitialRecipis
    useEffect(() => {
        fetch('https://recipe-book-server-phi.vercel.app/popularrecipes')
            .then(res => res.json())
            .then(data => {
                setInitialRecipes(data)
                setInitialLoading(false)
            })
            .catch(err =>{ console.error('Error fetching data:', err)
                setInitialLoading(false)
            });
    }, []);





    // Fetching My Recipes

    useEffect(() => {
        if (!user?.email) {
            setMyRecipes([]);
            // setMyRecipesLoading(false);
            return;
        }
        fetch(`https://recipe-book-server-phi.vercel.app/myrecipes?email=${user.email}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch user recipes');
                return res.json();
            })
            .then((data) => {
                setMyRecipes(data);
                setMyRecipesLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching user recipes:', err);
                setMyRecipesLoading(true);
            });
    }, [user]);


    // Fetching data for Like
    const handleLike = (_id,like) => {
        fetch(
            `https://recipe-book-server-phi.vercel.app/recipes/${_id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'like',
                    likes: Number(like)
                }),
            }
        )
            .then(res => res.json())
            .then(data => console.log(data));
    }







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
    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser(result.user);
                navigate( '/');
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
    const handleSignUp = (email, password, name, photo, from) => {
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
                        navigate(from ? from : '/');
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
            setMyRecipesLoading(false)
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
        initialLoading,
        myRecipesLoading,
        setInitialLoading,
        handleLike
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