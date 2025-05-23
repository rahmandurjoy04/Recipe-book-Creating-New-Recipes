import React from 'react';

const About = () => {

    
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-3xl w-full">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-6">About Recipe Book</h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 text-center">
                    Welcome to the Recipe Book. This website empowers you to save your culinary creations, manage them effortlessly, and share your journey with secure authentication. Whether you're a home cook or a professional chef, our platform is designed to inspire and simplify your cooking experience. Join us today and start building your recipe collection!
                </p>
                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl text-center font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    {/* Accordion Part */}
                    <div className='space-y-3'>
                        {/* 1 */}
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title font-semibold">Question: What is the Recipe Book App?</div>
                            <div className="collapse-content text-sm">Answer: The Recipe Book App is a personal recipe management platform where you can store, view, and manage your own recipes. It allows you to add new recipes, view your collection, and delete recipes you no longer need, all while keeping your data secure with Firebase authentication.</div>
                        </div>

                        {/* 2 */}
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title font-semibold">Question: How do I sign up or log in?</div>
                            <div className="collapse-content text-sm">Answer: You can sign up or log in using your email and password or via Google authentication. Visit the login page, enter your credentials, or click the Google sign-in option to get started. After logging in, you'll have access to your private recipe pages.</div>
                        </div>

                        {/* 3 */}
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title font-semibold">Question:Why can't I access my recipes?</div>
                            <div className="collapse-content text-sm">Answer: If you can't access your recipes, ensure you're logged in. The app uses private routes, so you need to be authenticated to view pages like Myrecipes or Addrecipe. If the issue persists, check your internet connection or try logging out and back in.</div>
                        </div>

                        {/* 4 */}
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title font-semibold">Question: How do I add a new recipe?</div>
                            <div className="collapse-content text-sm">Answer: To add a new recipe, navigate to the Addrecipe page after logging in. Fill in the details such as title, ingredients, and instructions, then submit the form. The recipe will be saved to your collection and visible on the Myrecipes page.</div>
                        </div>

                        {/* 5 */}
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title font-semibold">Question: What to do if the site is not responding?</div>
                            <div className="collapse-content text-sm">Try refreshing the page, checking your internet connection, or contacting support. We're working to optimize performance for a seamless experience.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;