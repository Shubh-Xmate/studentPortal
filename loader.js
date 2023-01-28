require('dotenv').config();
const exp = require("express");
const bodyParser= require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const patientsRoutes = require("./routes/routeInfo");
const validate = require("./middleware/validate")

const app = exp();
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');
app.use(exp.static('public'));
app.use(cookieParser());
app.use(session({
  secret: process.env.DB_SECRET_KEY,
  resave: false, 
  saveUninitialized: true,
  cookie : {
    maxAge : 600000,
  }
}));

app.use(patientsRoutes);

// async function connect()
// {
//     try
//     {
//         // connecting to the db
//         const sequelize = dbUtils.sequelize;
//         await sequelize.authenticate()
//         console.log('connected to the db successfully');

//     }
//     catch(error)
//     {
//         console.error('Unable to connect to the database: ', error);
//     }

//     try
//     {
//         // connecting to the redis server
//         const client = redisService.client;
//         await client.connect();
//         console.log("connected to the redis successfully");
//     }
//     catch(error)
//     {
//         console.log("connection issue in redis : ", error);
//     }
// }

// connect();

module.exports = {app}