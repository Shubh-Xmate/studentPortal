require('dotenv').config()

const loginSession = async (req) =>
{
    if(process.env.DEV == "production")
    {
        req.session.user = true
        await req.session.save()
    }
}

const logoutSession = async (req) =>
{
    if(process.env.DEV == "production")
    {
        req.session.user = false
        await req.session.save()
    }
}

const setValidate = (returningData, req) =>
{
    if(process.env.DEV == "production")returningData.isValidUser = req.session.user;
    else returningData.isValidUser = true;
}

module.exports = {loginSession, logoutSession, setValidate}