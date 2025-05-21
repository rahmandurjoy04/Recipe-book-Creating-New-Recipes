import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import ThemeToggle from './ThemeToggle';
import { valueContext } from '../Root';

const Navbar = () => {
    const { user, handleLogOut } = useContext(valueContext);


    const handleLogOutBtn = () => {
        handleLogOut()
    }
    const links = <>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/allrecipes'}>All Recipes</NavLink>
        <NavLink to={'/adrecipe'}>Add Recipe</NavLink>
        <NavLink to={'/myrecipes'}>My Recipes</NavLink>


        <NavLink to={'/about'}>About</NavLink>

    </>
    return (
        <div>
            <div className="navbar text-black min-w-sm bg-[#f0d3ce] shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <h1 className='text-xl font-extrabold'>Recipe Book</h1>
                        <ThemeToggle></ThemeToggle>
                    </div>
                </div>
                <div className="navbar-center hidden sm:flex">
                    <ul className="menu menu-horizontal px-1 flex justify-center items-center gap-4">
                        {
                            links
                        }
                    </ul>
                </div >
                <div className="navbar-end space-x-3">
                    <div className='relative flex items-center group'>
                        {user?.photoURL && (
                            <img
                                className="w-10 h-10 border rounded-full"
                                src={user.photoURL}
                                alt=""
                            />
                        )}
                        <div className="absolute flex mb-2 left-1/2 -translate-x-1/2 rounded bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            {user?.displayName || "No User"}
                        </div>
                    </div>
                    {
                        user ? <button onClick={handleLogOutBtn} className="btn">LogOut</button> : <Link to={'/auth/login'} ><button className='btn'>LogIn</button></Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;