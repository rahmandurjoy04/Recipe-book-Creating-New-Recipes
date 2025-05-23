import React from "react";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router";

const UpdateRecipe = () => {
    const cats = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"]
    const navigate = useNavigate()

    const { category, cuisine, email, imageURL, ingredients, instructions, likes, time, title, _id } = useLoaderData()

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const UpdatedRecipeData = Object.fromEntries(formData.entries())


        // update Recipe to DB 
        fetch(`https://recipe-book-server-phi.vercel.app/recipes/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(UpdatedRecipeData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        icon: "success",
                        title: "Your Recipe has been Updated",
                    });
                    navigate('/')

                }
            })




    };


    return (
        <>
            <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow my-8">
                <h2 className="text-3xl font-bold mb-4 text-center">Update Your Recipe</h2>
                <form onSubmit={handleUpdateSubmit} className="space-y-4">

                    <label>Recipe Title</label>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        className="input input-bordered w-full"
                        required
                        defaultValue={title}
                    />

                    <label>Recipe Image URL</label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        name="imageURL"
                        className="input input-bordered w-full"
                        required
                        defaultValue={imageURL}

                    />

                    <label>Recipe Ingredients</label>
                    <textarea
                        placeholder="Ingredients (comma separated)"
                        name="ingredients"
                        className="textarea textarea-bordered w-full"
                        required
                        defaultValue={ingredients}
                    />

                    <label>Instructions</label>
                    <textarea
                        placeholder="Instructions"
                        name="instructions"
                        className="textarea textarea-bordered w-full"
                        required
                        defaultValue={instructions}
                    />


                    <label>Cuisine Type</label>
                    <select
                        className="select select-bordered w-full"
                        name="cuisine"
                        defaultValue={cuisine}
                    >
                        <option>Italian</option>
                        <option>Mexican</option>
                        <option>Indian</option>
                        <option>Chinese</option>
                        <option>Others</option>
                    </select>

                    <label>Preparation Time</label>
                    <input
                        type="text"
                        name="time"
                        placeholder="Preparation Time (in minutes)"
                        className="input input-bordered w-full"
                        required
                        defaultValue={time}
                    />

                    <div className="form-control">
                        <label className="label">Categories:</label>
                        <div className="grid grid-cols-3 gap-2">
                            {cats.map((cat) => (
                                <label key={cat} className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm mr-2"
                                        name="category"
                                        value={cat}
                                        defaultChecked={cat === category}
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>
                    <label>Like Count</label>
                    <input
                        type="number"
                        placeholder="Like Count"
                        name="likes"
                        className="input input-bordered w-full"
                        defaultValue={likes}

                    />
                    <label>Author's Email</label>
                    <input
                        type="email"
                        placeholder="user@gmail.com"
                        name="email"
                        className="input input-bordered w-full"
                        required
                        defaultValue={email}
                    />

                    
                    <button type="submit" className="btn btn-primary w-full">
                        Update Recipe
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateRecipe;
