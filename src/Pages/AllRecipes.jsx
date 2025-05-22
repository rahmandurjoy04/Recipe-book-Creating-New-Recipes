import React, { useContext } from 'react';
import RecipeCardAllRecipe from '../Components/RecipeCardAllRecipe';
import { valueContext } from '../Root';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '../assets/groovyWalk.json';


const AllRecipes = () => {
    const { recipes, recipesLoading } = useContext(valueContext)
    console.log(recipes);

    if (recipesLoading) {

        return (<div className="flex justify-center items-center h-screen">
            <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>)
    }


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