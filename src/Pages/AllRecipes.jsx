import React, { useContext } from 'react';
import RecipeCardAllRecipe from '../Components/RecipeCardAllRecipe';
import { valueContext } from '../Root';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '../assets/groovyWalk.json';
import { Typewriter } from 'react-simple-typewriter'






const AllRecipes = () => {
    const { recipes, recipesLoading } = useContext(valueContext)
    console.log(recipes);

    if (!Array.isArray(recipes)) {
        return <div className="flex justify-center my-8">No recipes available ....Please Reload</div>;
    }

    if (recipesLoading) {

        return (<div className="flex justify-center items-center h-screen">
            <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>)
    }


    return (
        <div>
            <div className='text-4xl  text-yellow-800 text-center font-bold my-6'>
                <h1 className="text-3xl text-center font-bold my-6">
                    <Typewriter
                        words={['All Recipes...']}
                        loop={0} // 0 for infinite
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h1>

            </div>
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