import React from 'react';

const Cuisine = ({item}) => {
    return (
        // <div className='rounded-xl'>
            <article className="flex flex-col rounded-lg dark:bg-gray-100">
                <img alt="" className="object-cover w-full rounded-t-lg h-52 dark:bg-gray-500" src={item.imageUrl} />
                <div className="flex flex-col flex-1 p-6">
                    <h1 className="text-xl tracking-wider uppercase font-semibold dark:text-violet-600">{item.name}</h1>
                    <h3 className="flex-1 py-2 text-sm leading-snug dark:text-black">{item.interests} People Tried Today</h3>

                </div>
            </article>
        // </div>
    );
};

export default Cuisine;