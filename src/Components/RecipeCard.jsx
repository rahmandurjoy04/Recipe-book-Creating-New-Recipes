import React from 'react';
import { SlLike } from 'react-icons/sl';
import { useNavigate } from 'react-router';

const RecipeCard = ({ recipe }) => {
    const { title, imageURL, cuisine, likes ,_id } = recipe
    const navigate = useNavigate()
    const handleLike = () =>{
        console.log('Like Clicked');
    }
    const handleViewDetails=(id)=>{
        console.log(id);
        navigate(`/recipes/${id}`)
    }
    return (
        <div>
            <div className="flex flex-col mx-auto max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                
                <div>
                    <img src={imageURL} alt="" className="object-cover rounded w-full mb-4 h-46 dark:bg-gray-500" />
                    <h2 className="mb-1 text-xl font-semibold">{title}</h2>
                    <p className="text-lg">Cuisine: <span className='text-blue-400'>{cuisine}</span></p>
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="space-x-2">
                        <button onClick={()=>handleViewDetails(_id)} className='btn btn-accent'>View Details</button>
                        
                    </div>
                    <div className="flex space-x-2 text-sm dark:text-gray-600">
                                            {/* Like Button */}
                                            <button onClick={handleLike} type="button" className="flex items-center text-xl p-1 space-x-1.5">
                                                <SlLike />
                                                <span>{likes}</span>
                                            </button>
                                        </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;