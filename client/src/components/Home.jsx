import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipes } from "../actions";
import { Link } from "react-router-dom";

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault()
        dispatch(getRecipes());
    }

    return (
        <div>
        <Link to ='/recipe'>Crear receta</Link>
        <h1>Pagina de recetas</h1>
        <button onClick={e=> {handleClick(e)}}>
            Resetea las recetas
        </button>
        </div>
    )
}
