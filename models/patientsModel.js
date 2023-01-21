const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../Utils/dbConnection");

const Patient = sequelize.define("patientDetails", {
    patient_id: {
        type: DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.STRING,
        allowNull: false,
    },  
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    walletAmount: {
        type: DataTypes.INTEGER,
        allowNull : false,
    }
});

// // inserted this data for the first time
// const patients_data = [
//     {name : "John", age: 29, gender : "Male", walletAmount : 2500},
//     {name : "Maxi", age: 24, gender : "Female", walletAmount : 2020},
//     {name : "Ryan", age: 39, gender : "Male", walletAmount : 1200},
//     {name : "Robert", age: 29, gender : "Male", walletAmount : 1000},
//     {name : "Samy", age: 49, gender : "Female", walletAmount : 2000}
//  ]
 
//  sequelize.sync({ force: true }).then(() => {
 
//      Patient.bulkCreate(patients_data, { validate: true }).then((result) => {
//          console.log(result);
//      }).catch((error) => {
//          console.log(error);
//      });
 
//  }).catch((error) => {
//      console.error('Unable to create table : ', error);
//  });

module.exports = Patient;