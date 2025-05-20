import {
    createBrowserRouter,
} from "react-router";
import Home from "../Components/Home";
import Root from "../Root";
import AllRecipes from "../Pages/AllRecipes";
import AddRecipe from "../Pages/AddRecipe";
import MyRecipes from "../Pages/MyRecipes";
import ErrorPage from "../Components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
      Component:Root,
    //   errorElement:,
      children:[
        {
            index:true,
            path:"/",
            Component:Home
        },
        {
            path:'allrecipes',
            Component:AllRecipes
        },
        {
            path:'adrecipe',
            Component:AddRecipe
        },
        {
            path:'myrecipes',
            Component:MyRecipes
        },
    ]
  },
  {
    path:'*',
    Component:ErrorPage
  }
]);