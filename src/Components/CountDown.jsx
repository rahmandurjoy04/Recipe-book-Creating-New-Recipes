import React, { useState, useEffect } from 'react';

const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState(() => {
        const now = new Date('2025-05-23T19:51:00+06:00');
        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + 20);
        targetDate.setMinutes(now.getMinutes() + Math.floor(Math.random() * 60));
        return Math.floor((targetDate - now) / 1000);
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;

    return (



        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-gray-100 p-4 w-11/12 mx-auto mb-8 rounded">

            <div className="mt-6">
                <img
                    src="https://i.ibb.co/21FqCJQx/cartoon.jpg"
                    className="w-full object-cover rounded-full shadow-lg"
                    alt="Recipe illustration"
                />
            </div>
            <div className='flex flex-col justify-center items-center'>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
                    A New Recipe is Coming
                </h1>
                <div className="flex justify-center space-x-4 mb-6">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-gray-800 shadow-md">
                            {String(days).padStart(2, '0')}
                        </div>
                        <p className="text-sm md:text-base text-gray-600 mt-2">DAYS</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-gray-800 shadow-md">
                            {String(hours).padStart(2, '0')}
                        </div>
                        <p className="text-sm md:text-base text-gray-600 mt-2">HRS</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-gray-800 shadow-md">
                            {String(minutes).padStart(2, '0')}
                        </div>
                        <p className="text-sm md:text-base text-gray-600 mt-2">MINS</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-gray-800 shadow-md">
                            {String(seconds).padStart(2, '0')}
                        </div>
                        <p className="text-sm md:text-base text-gray-600 mt-2">SECS</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CountDown;