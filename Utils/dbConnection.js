const {Sequelize, DataTypes} = require("sequelize");
const dbConfig = require("../config/dbConfig")

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
      query : {raw : true},
      define: 
      {
        defaultScope: 
        {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      },
      
      host: dbConfig.HOST,
      dialect: dbConfig.dialect
    }
);

// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch((error) => {
//   console.error('Unable to connect to the database: ', error);
// });

module.exports = sequelize;