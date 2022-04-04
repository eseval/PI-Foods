const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Recipe, Diet} = require('../db');

const router = Router();
const express = require('express');
const axios = require('axios');
const {API_KEY} = process.env
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => { //!Va a el endpoint de la api y trae toda la información que llegue a necesitar
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    
    const apiInfo = apiUrl.data.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            image: e.image,
            diets: e.diets.map((d) => {return {name: d}}),
            summary: e.summary,
            dishTypes: e.dishTypes.map((d) => {return{name:d}}),
            score: e.spoonacularScore,
            healthScore: e.healthScore,
            steps: e.analyzedInstructions
        };
    });
    return apiInfo;
}

const getDbInfo = async () => { //!Va a la base de datos y trae toda la información que llegue a necesitar
    return await Recipe.findAll({
        include: { //!Este include no es necesario ya que solo tiene el atributo Diet
            model: Diet, //*incluye el model para que haga la relacion que tiene
            attributes: ['name'], //!Le pido que ttraiga el atributo name del modelo Diet
            through: {attributes: []}
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo(); //!Ejecuta la función getApiInfo
    const dbInfo = await getDbInfo(); //!Ejecuta la función getDbInfo
    const infoTotal = apiInfo.concat(dbInfo); //!Concatena las dos arrays
    return infoTotal; //!Devuelve un arreglo con toda la información
}

router.get('/recipes', async (req, res) => {
    const name = req.query.name //!Recibe el nombre de la receta
    const recipesTotal = await getAllRecipes()
    if (name) {
        let recipeName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase())) //!Filtra el arreglo por el nombre de la receta
        recipeName.length ? res.status(200).send(recipeName) : res.status(404).send('No se encontró la receta')
    }else {
        res.status(200).send(recipesTotal)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const allRecipes = await getAllRecipes();    //vuelvo a utilizar la funcion
    if (id) {
        let recipeId = allRecipes.filter(e => e.ID == id)   //filtro el id que llega por params
        recipeId.length ? res.status(200).json(recipeId) : res.status(404).send('No se encontro la receta')
    }
})

module.exports = router;
