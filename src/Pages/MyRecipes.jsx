import React, { useContext } from 'react';
import { valueContext } from '../Root';
import RecipeCardMyRecipe from '../Components/RecipeCardMyRecipe';
import { Link } from 'react-router';




const MyRecipes = () => {
    const { myRecipes ,authLoading } = useContext(valueContext);
    

    console.log(myRecipes);


    if (myRecipes.length === 0 && !authLoading) {
        return (
            <div className='flex flex-col md:flex-row justify-between md:items-center w-10/12 py-4 mx-auto'>
                <div>
                    <img src="https://i.ibb.co/21FqCJQx/cartoon.jpg" className='w-auto mx-auto' alt="" />
                </div>
                <div className='space-y-5 md:space-y-10 flex flex-col justify-center items-center'>
                    <h1 className='text-3xl md:text-5xl font-bold text-center'>No Recipes Yet</h1>
                    <p className='md:text-xl text-center'>Click The Button Below To Add Recipe</p>
                    <Link to={'/adrecipe'}><button className='btn btn-success px-8 py-5 text-lg'>Add Recipe</button></Link>
                </div>
            </div>
        )
    }
    return (
        <div className='flex justify-center'>
            <div className='grid grid-cols-1 gap-8 my-6'>
                {
                    myRecipes.map(myRecipe => <RecipeCardMyRecipe key={myRecipe._id} myRecipe={myRecipe}></RecipeCardMyRecipe>)
                }
            </div>
        </div>
    );
};

export default MyRecipes;