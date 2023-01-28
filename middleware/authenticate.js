// middleware to test if authenticated

const { sendResponse } = require("../Utils/sendData");

const isAuthenticated = (req, res, next) =>
{
    const excludedUrl = ["/", "/authenticate", "/logout"];
    if(excludedUrl.includes(req.url))return next();
    else
    {
        if (req.session.user)return next()
        else 
        {
            let resRenderedPage = 'home';
            let returningData = {mainContent : "not authenticated", mainTitle : "Home", isValidUser : false};
            sendResponse(res, data = returningData, rendered_page = resRenderedPage);
        }
    }
}

module.exports = {isAuthenticated}