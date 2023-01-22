require('dotenv').config();
const exp = require("express");
const bodyParser= require("body-parser");
const patientsRoutes = require("./routes/routeInfo")
const loader = require("./controllers/loader");

// creating the app
const app = exp();
app.use(bodyParser.urlencoded({extended : true}));
app.use(exp.static('public'));
app.set('view engine', 'ejs');
app.use(patientsRoutes);

app.listen(process.env.PORT, (err) =>
{
    if(err)console.log("Error while listening : ", err)
    else console.log(`Listening on port ${process.env.PORT}`)
});