import React, { useContext } from 'react';
import SliderPage from './SliderPage';
import RecipeCard from './RecipeCard';
import { valueContext } from '../Root';
import groovyWalkAnimation from '../assets/groovyWalk.json';
import Lottie from 'lottie-react';


const Home = () => {
    const {initialRecipes,initialLoading} = useContext(valueContext)

    if (!Array.isArray(initialRecipes)) {
    return <div className="flex justify-center my-8">No recipes available.</div>;
  }
  if(initialLoading){
        return (<div className="flex justify-center items-center h-screen">
            <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>)
    }
  

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