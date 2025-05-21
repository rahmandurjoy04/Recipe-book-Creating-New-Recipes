import React, { useContext } from 'react';
// import { useLoaderData } from 'react-router';
import RecipeCardAllRecipe from '../Components/RecipeCardAllRecipe';
import { valueContext } from '../Root';

const AllRecipes = () => {
    const {recipes} = useContext(valueContext)
    // const allRecipes = useLoaderData();
    console.log(recipes);
    return (
        <div>
            {
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8 w-11/12 mx-auto'>
                {
                    recipes.map(recipe => <RecipeCardAllRecipe key={recipe._id} recipe={recipe}></RecipeCardAllRecipe>)
                }
            </div>
            }
        </div>
    );
};

export default AllRecipes;