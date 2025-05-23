import React, { useContext, useState } from 'react';
import RecipeCardAllRecipe from '../Components/RecipeCardAllRecipe';
import { valueContext } from '../Root';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '../assets/groovyWalk.json';
import { Typewriter } from 'react-simple-typewriter'



const AllRecipes = () => {
    const { recipes, recipesLoading } = useContext(valueContext)

    const cuisines = ["All", ...new Set(recipes.map(r => r.cuisine).filter(Boolean))];
    const [selectedCuisine, setSelectedCuisine] = useState("All");

    const filteredRecipes = selectedCuisine === "All"
        ? recipes
        : recipes.filter(recipe =>
            recipe.cuisine?.toLowerCase() === selectedCuisine.toLowerCase()
        );

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
            <div className='text-4xl  text-center font-bold my-6'>
                <h1 className="text-3xl text-center font-bold my-6">
                    <Typewriter
                        words={['All Recipes...']}
                        loop={0}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h1>

            </div>

            <div className='flex justify-center'>
                <select className='px-1 border-2' onChange={(e) => setSelectedCuisine(e.target.value)}>
                    {cuisines.map(c => <option value={c}>{c}</option>)}
                </select>
            </div>



            {
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8 w-11/12 mx-auto'>
                    {
                        filteredRecipes.length > 0 ?
                            filteredRecipes.map(recipe => <RecipeCardAllRecipe key={recipe._id} recipe={recipe}></RecipeCardAllRecipe>)
                            :
                            (
                                <div className='col-span-2 md:col-span-3 lg:col-span-4 min-w-sm justify-center items-center py-20'>
                                    <h1 className='text-center text-4xl font-bold'>
                                        No Recipe Found for Selected Category
                                    </h1>
                                </div>
                            )
                    }
                </div>
            }
        </div>
    );
};

export default AllRecipes;