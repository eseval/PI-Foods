const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Diet, Recipe} = require('../db.js');
const {APIKEY} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true`);
    const apiInfo = await apiUrl.data.map(e => {
        return {
            id: e.id,
            title: e.title,
            summary: e.summary,
            score: e.score,
            healthScore: e.healthScore,
            steps: e.steps,
            diet: e.diet.map(e => e), //! map para que devuelva un array con todas las dietas
            recipe: e.recipe.map(e => e)
        }
    })
    return apiInfo;
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: [{
            model: Diet,
            attributes: ['name'],
            through: {attributes: []}
        }]
    });
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get('/recipes', async (req, res) => {
    const name = req.query.name; //? busca si hay un name por query
    let recipesTotal = await getAllRecipes();
    if (name) {
        const recipeName = await recipesTotal.filter(e => e.name.toLoweCase().includes(name.toLocaleLowerCase()));
        recipeName.length ? res.status(200).send(recipeName) : res.status(404).send('No hay recetas con ese nombre') ;
    }else {
        res.status(200).send(recipesTotal);
    }
})

router.get('/diets', async (req, res) => {
    const dietsApi = await Diet.findAll();
    res.status(200).send(diets);
})

module.exports = router;
