import React from 'react';
import SliderPage from './SliderPage';
import { useLoaderData } from 'react-router';
import RecipeCard from './RecipeCard';

const Home = () => {
    const initialRecipes = useLoaderData()
    return (
        <div>
            <SliderPage></SliderPage>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8 w-11/12 mx-auto'>
                {
                    initialRecipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>)
                }
            </div>
        </div>
    );
};

export default Home;