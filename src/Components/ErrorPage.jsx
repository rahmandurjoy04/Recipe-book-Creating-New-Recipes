import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='bg-[#f0d3ce] w-screen h-full flex justify-center items-center flex-col py-15'>
            <div className='flex justify-center items-center pb-8 '>
                <img className='w-full h-[600px] rounded-xl' src="recipe-404.jpg" alt="" />
            </div>
            <div>
                <Link to={'/'}>
                    <button className='btn btn-md bg-blue-500 text-white hover:bg-blue-600'>Back To Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;