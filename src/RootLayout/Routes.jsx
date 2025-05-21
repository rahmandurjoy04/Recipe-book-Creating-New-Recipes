import {
  createBrowserRouter,
} from "react-router";
import Home from "../Components/Home";
import Root from "../Root";
import AllRecipes from "../Pages/AllRecipes";
import AddRecipe from "../Pages/AddRecipe";
import MyRecipes from "../Pages/MyRecipes";
import ErrorPage from "../Components/ErrorPage";
import SignIn from "../Pages/SIgnIn";
import Signup from "../Pages/SIgnup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import RecipeDetails from "../Components/RecipeDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    //   errorElement:,
    children: [
      {
        index: true,
        path: "/",
        loader: () => fetch('http://localhost:3000/popularrecipes'),
        Component: Home
      },
      {
        path: `popular/:id`,
        loader: ({params}) => fetch(`http://localhost:3000/popularrecipes/${params.id}`),
        Component: RecipeDetails
      },
      {
        path: 'allrecipes',
        loader: () => fetch('http://localhost:3000/recipes'),
        Component: AllRecipes
      },
      {
        path: 'recipes/:id',
        loader: ({params}) => fetch(`http://localhost:3000/recipes/${params.id}`),
        // Component: RecipeDetails
        element:<PrivateRoute>
          <RecipeDetails></RecipeDetails>
        </PrivateRoute>
      },
      {
        path: 'adrecipe',
        element: <PrivateRoute>
          <AddRecipe></AddRecipe>
        </PrivateRoute>
      },
      {
        path: 'myrecipes',
        element: <PrivateRoute>
          <MyRecipes></MyRecipes>
        </PrivateRoute>
      },
      {
        path: 'auth/login',
        Component: SignIn
      },
      {
        path: 'auth/signup',
        Component: Signup
      },
    ]
  },
  {
    path: '*',
    Component: ErrorPage
  }
]);