const loader = require("./loader");
const app = loader.app;

app.listen(process.env.PORT, (err) =>
{
    if(err)console.log("Error while listening : ", err)
    else console.log(`Listening on port ${process.env.PORT}`)
});


// adding a test comment
