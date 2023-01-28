const dbUtils = require("../Utils/dbConnection");
const redisService = require("../services/redisService");
const exp = require("express")
const bodyParser= require("body-parser");

// creating the app
const app = exp();
app.use(bodyParser.urlencoded({extended : true}));

module.exports = {app};