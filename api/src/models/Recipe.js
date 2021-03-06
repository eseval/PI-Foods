const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID, //* UUID genera un numero random con letras y numeros para el id
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, //* allowNull es para que o si o si el campo tenga ID
      primaryKey: true //* primaryKey es para que sea la llave primaria
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    /*instructions: {
      type: DataTypes.TEXT,
      defaultValue: 'Do not have Instrucctions.'
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: 'https://us.123rf.com/450wm/blankstock/blankstock1408/blankstock140801059/30496471-signo-de-interrogaci%C3%B3n-signo-icono-s%C3%ADmbolo-de-ayuda-signo-de-preguntas-frecuentes-bot%C3%B3n-plano-gris-c.jpg?ver=6'
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
      */
  });
};
