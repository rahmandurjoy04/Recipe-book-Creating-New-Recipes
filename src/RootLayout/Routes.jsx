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
import UpdateRecipe from "../Pages/UpdateRecipe";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    //   errorElement:,
    children: [
      {
        index: true,
        path: "/",
        loader: () => fetch('https://recipe-book-server-phi.vercel.app/popularrecipes'),
        Component: Home
      },
      {
        path: `popular/:id`,
        loader: ({params}) => fetch(`https://recipe-book-server-phi.vercel.app/popularrecipes/${params.id}`),
        Component: RecipeDetails
      },
      {
        path: 'allrecipes',
        loader: () => fetch('https://recipe-book-server-phi.vercel.app/recipes'),
        Component: AllRecipes
      },
      {
        path: 'recipes/:id',
        loader: ({params}) => fetch(`https://recipe-book-server-phi.vercel.app/recipes/${params.id}`),
        // Component: RecipeDetails
        element:<PrivateRoute>
          <RecipeDetails></RecipeDetails>
        </PrivateRoute>
      },


      // Getting recipes with my email
      {
        path: '/myrecipes',
        element:<PrivateRoute>
          <MyRecipes></MyRecipes>
        </PrivateRoute>
      },
      {
        path: 'adrecipe',
        element: <PrivateRoute>
          <AddRecipe></AddRecipe>
        </PrivateRoute>
      },
      {
        path: '/updaterecipe/:id',
        loader:({params})=>fetch(`https://recipe-book-server-phi.vercel.app/recipes/${params.id}`),
        element:
          <UpdateRecipe></UpdateRecipe>
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