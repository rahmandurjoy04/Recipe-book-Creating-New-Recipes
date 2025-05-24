import React, { useContext, useState } from 'react';
import { SlLike } from 'react-icons/sl';
import { useLoaderData } from 'react-router';
import { valueContext } from '../Root';

const RecipeDetails = () => {


    const { user ,handleLike } = useContext(valueContext)
    const { title, imageURL, ingredients, instructions, likes, time, cuisine, email, _id } = useLoaderData()
    console.log(_id);
    const [like, setLike,] = useState(likes)

    const handleLiked = (_id) => {
        if (user.email !== email) {
            handleLike(_id,like)
            setLike(parseInt(like) + 1)
        }
    }


    return (
        <div className='my-12'>
            <div className="flex mx-auto flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                <h1 className='text-center'>{like} People interested in this recipe</h1>

                <div>
                    <img src={imageURL} alt="" className="object-cover rounded w-full mb-4 h-64 dark:bg-gray-500" />
                    <h2 className="mb-3 text-3xl font-semibold">{title}</h2>
                    <p className="text-lg"><span className='font-bold text-xl'>Cuisine</span>: <span className='text-blue-400'>{cuisine}</span></p>
                </div>
                <div className="flex flex-wrap justify-between gap-6">
                    <div className="space-x-2">
                        <h1 className='text-xl font-bold'>Ingredients:</h1>
                        <p>{ingredients}</p>
                    </div>
                    <div className="space-x-2">
                        <h1 className='text-xl font-bold'>Instructions:</h1>
                        <p>{instructions}</p>
                    </div>
                    <p><span className='font-bold'>Cooking Time</span> : <span className='text-green-500'>{time} Min</span></p>
                    <div className="flex justify-center items-center space-x-2 text-sm dark:text-gray-600">
                        {/* Like Button */}
                        <button type="button" onClick={() => handleLiked(_id)} className="flex items-center p-1 space-x-1.5 text-xl">
                            <SlLike />
                        </button>
                        <span className='text-xl'>{like}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;