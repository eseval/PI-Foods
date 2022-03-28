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
    sumary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
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
    }
  });
};
