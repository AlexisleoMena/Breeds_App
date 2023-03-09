const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Breed', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    height_max: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }
    },
    height_min: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }
    },
    weight_max: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }
    },
    weight_min: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }
    },
    life_span: {
      type: DataTypes.INTEGER,
      allowNull: false,
      set(value) {
        if(!value.length) {
          return this.setDataValue('life_span', 1);
        }
        this.setDataValue('life_span', value);
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if(!value.length) {
          return this.setDataValue('image', 'https://i.ibb.co/yXxsGyV/No-image-available.jpg')
        }
        this.setDataValue('image', value)
      },
      // validate: {
      //   isUrl: true,
      // },
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if(!value.length) {
          return this.setDataValue('origin', 'Unknown origin')
        }
        this.setDataValue('origin', value)
      },
    },
  },{
    tableName: "breeds",
    timestamps: false,
    createdAt: false
  });
};
