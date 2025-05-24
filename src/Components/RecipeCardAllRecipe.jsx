import React from 'react';
import { SlLike } from 'react-icons/sl';
import { useNavigate } from 'react-router';


const RecipeCardAllRecipe = ({ recipe }) => {

    const navigate = useNavigate();
    const { title, imageURL, cuisine, likes, _id ,time} = recipe

    const handleSeeDetails = (id) => {
        navigate(`/recipes/${id}`)
    }
    return (

        <div className="flex flex-col mx-auto w-full  p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">

            {/* <div className='w-full'> */}
            <img src={imageURL} alt="" className="object-cover rounded w-full mb-4 h-46 dark:bg-gray-500" />
            <h2 className="mb-1 text-xl font-semibold">{title}</h2>
            <p className="text-lg mb-1">Cuisine: <span className='text-blue-400'>{cuisine}</span></p>
            <p><span className='font-bold'>Cooking Time</span> : <span className='text-green-500'>{time} Min</span></p>

            {/* </div> */}
            <div className="flex flex-wrap justify-between">
                <div className="space-x-2">
                    <button onClick={() => handleSeeDetails(_id)} className='btn btn-accent'>See Details</button>

                </div>
                <div className="flex space-x-2 text-sm dark:text-gray-600">
                    {/* Like Button */}
                    <button type="button" className="flex items-center text-xl p-1 space-x-1.5">
                        <SlLike />
                        <span>{likes}</span>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default RecipeCardAllRecipe;