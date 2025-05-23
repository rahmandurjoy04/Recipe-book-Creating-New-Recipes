import React, { useContext, useEffect, useState } from 'react';
import SliderPage from './SliderPage';
import RecipeCard from './RecipeCard';
import { valueContext } from '../Root';
import groovyWalkAnimation from '../assets/groovyWalk.json';
import Lottie from 'lottie-react';
import { Typewriter } from 'react-simple-typewriter'
import { Link } from 'react-router';
import Cuisine from './Cuisine';
import CountDown from './CountDown';



const Home = () => {
    const { initialRecipes, initialLoading, setInitialLoading } = useContext(valueContext)
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/cuisines.json')
            .then(res => res.json())
            .then(data => {
                setItems(data)
                setInitialLoading(false)

            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
    }, [])

    console.log(items);


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

            {/* Cuisines */}
            <section className=" ">
                <div className="w-11/12 mb-12  mx-auto space-y-8">
                    <div className="space-y-2 text-center">
                        <div className='text-3xl text-center font-bold my-6'>
                            <h1 className="text-3xl text-center  font-bold my-6">
                                <Typewriter
                                    words={['Our Cuisines...']}
                                    loop={0} // 0 for infinite
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {
                            items.map(item => (<Cuisine key={item.id} item={item}></Cuisine>))
                        }

                    </div>
                </div>
            </section>
            <div className="text-green-600 text-4xl mb-2 flex justify-center">
                <Typewriter
                    words={['New Recipe Alert']}
                    loop={0}
                    cursor
                    cursorStyle='_'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />

            </div>
            <CountDown></CountDown>
        </div>
    );
};

export default Home;