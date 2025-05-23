import React, { useContext } from "react";
import Swal from "sweetalert2";
import { valueContext } from "../Root";
import { useNavigate } from "react-router";

const AddRecipe = () => {
    const { setRecipes, recipes, setMyRecipes } = useContext(valueContext)


    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newRecipeData = Object.fromEntries(formData.entries())


        // Send Data to DB
        fetch('https://recipe-book-server-phi.vercel.app/recipes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newRecipeData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Your Recipe has been saved",
                        icon: "success",
                    });
                    const recipeWithId = { ...newRecipeData, _id: data.insertedId };
                    setRecipes([...recipes, recipeWithId]);
                    setMyRecipes([...recipes, recipeWithId]);
                }
                navigate('/')
                
            })



    };


    return (
        <>
            <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow my-8">
                <h2 className="text-3xl font-bold mb-4 text-center">Add a New Recipe</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <label>Recipe Title</label>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        className="input input-bordered w-full"
                        required
                    />

                    <label>Recipe Image URL</label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        name="imageURL"
                        className="input input-bordered w-full"
                        required
                    />

                    <label>Recipe Ingredients</label>
                    <textarea
                        placeholder="Ingredients (comma separated)"
                        name="ingredients"
                        className="textarea textarea-bordered w-full"
                        required
                    />

                    <label>Instructions</label>
                    <textarea
                        placeholder="Instructions"
                        name="instructions"
                        className="textarea textarea-bordered w-full"
                        required
                    />


                    <label>Cuisine Type</label>
                    <select
                        className="select select-bordered w-full"
                        name="cuisine"
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
                    />

                    <div className="form-control">
                        <label className="label">Categories:</label>
                        <div className="grid grid-cols-3 gap-2">
                            {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map((cat) => (
                                <label key={cat} className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm mr-2"
                                        name="category"
                                        value={cat}
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>
                    <label>Like Count</label>
                    <input
                        type="text"
                        placeholder="Like Count"
                        name="likes"
                        className="input input-bordered w-full"
                        value={0}

                    />
                    <label>Author's Email</label>
                    <input
                        type="email"
                        placeholder="user@gmail.com"
                        name="email"
                        className="input input-bordered w-full"
                        required
                    />

                    <button type="submit" className="btn btn-primary w-full">
                        Add Recipe
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddRecipe;
