import React, { useContext } from 'react';
import { SlLike } from 'react-icons/sl';
import { useNavigate } from 'react-router';
import { valueContext } from '../Root';


const RecipeCardMyRecipe = ({ myRecipe }) => {
    const {handleDeleteRecipe} = useContext(valueContext)

    const handleDelete = (_id) => {
        handleDeleteRecipe(_id)
    }
    

    const navigate = useNavigate();
    const { title, imageURL, cuisine, likes, _id, ingredients, instructions, time, category } = myRecipe
    const handleUpdate = (id) => {
        navigate(`/updaterecipe/${id}`)
    }
    return (
        <div>
            <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">

                <div>
                    <img src={imageURL} alt="" className="object-cover rounded w-full mb-4 h-46 dark:bg-gray-500" />
                    <h2 className="mb-1 text-xl font-semibold">{title}</h2>
                </div>
                <div>
                    <h2 className='text-xl font-bold'>Ingredients:</h2>
                    <p >{ingredients}</p>
                </div>
                <div>
                    <h2 className='text-xl font-bold'>Instructions:</h2>
                    <p >{instructions}</p>
                </div>
                <p className="text-lg font-bold">Cuisine: <span className='text-blue-500 font-medium'>{cuisine}</span></p>
                <p className="text-lg font-bold">Preparation Time: <span className='text-green-500'>{time}</span> Min</p>
                <p className="text-lg font-bold">Category: <span className='text-[#5277f2]'>{category}</span></p>
                <div className="flex flex-wrap justify-between">
                    <div className="space-x-10">
                        <button onClick={() => handleUpdate(_id)} className='btn btn-info'>Update</button>
                        <button onClick={() => handleDelete(_id)} className='btn btn-error'>Delete</button>

                    </div>

                    <div className="flex space-x-2 text-sm dark:text-gray-600">
                        {/* Like Button */}
                        <button disabled type="button" className="flex items-center p-1 space-x-1.5 text-blue-500 text-xl font-bold">

                            <SlLike />

                            <span className='text-black'>{likes}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCardMyRecipe;