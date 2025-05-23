import React, { useContext } from 'react';
import SliderPage from './SliderPage';
import RecipeCard from './RecipeCard';
import { valueContext } from '../Root';
import groovyWalkAnimation from '../assets/groovyWalk.json';
import Lottie from 'lottie-react';
import { Typewriter } from 'react-simple-typewriter'
import { Link } from 'react-router';



const Home = () => {
    const { initialRecipes, initialLoading } = useContext(valueContext)

    if (initialLoading) {
        return (<div className="flex justify-center items-center h-screen">
            <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>)
    }


    return (
        <div>
            <SliderPage></SliderPage>

            <div className='text-3xl text-center font-bold my-6'>
                <h1 className="text-3xl text-center font-bold my-6">
                    <Typewriter
                        words={['Popular Recipes...']}
                        loop={0} // 0 for infinite
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8 w-11/12 mx-auto'>
                {
                    initialRecipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>)
                }
            </div>
            <div className='flex justify-center mb-5'>
                <Link to={'/allrecipes'}>
                    <button className='btn btn-success'>See All Recipes</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;