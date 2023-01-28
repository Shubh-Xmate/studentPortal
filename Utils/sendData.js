require("dotenv").config();
const sendResponse = (res, data, rendered_page, rStatus = 200) =>
{
    try
    {
        if(process.env.DEV == "test")
        {
            res.status(rStatus).send(data);
        }
        else if(process.env.DEV == "production")
        {
            res.status(rStatus).render(rendered_page, data);
        }
        else
        {
            res.send("Undefined dev environment");
        }
    }
    catch(err)
    {
        res.send("Error while sending the data : ", err);
    }
}

module.exports = {sendResponse};