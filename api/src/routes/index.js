const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch');
    const apiInfo = await apiUrl.data.map(e => {
        return {
            id: e.id,
            title: e.title,
            summary: e.summary,
            score: e.score,
            healthScore: e.healthScore,
            steps: e.steps
        }
    })
}

module.exports = router;
