require('dotenv').config()
const {sendResponse} = require("../Utils/sendData")
const {loginSession, logoutSession, setValidate} = require("../Utils/sessionHandler")

let resStatus = 200;
let resRenderedPage = 'home';
let returningData = {mainContent : "", mainTitle : "", isValidUser : false, data : null, error : null};

function updateReturningData(req, err = null, currStatus = 200)
{
    returningData.mainContent = ""; 
    returningData.mainTitle = "Home"; 
    returningData.error = err;
    setValidate(returningData, req);
    resRenderedPage = 'home';
    resStatus = currStatus;
}

exports.homeData = async (req, res) => 
{
    updateReturningData(req);
    sendResponse(res, data = returningData, rendered_page = resRenderedPage);
}

exports.getDataByPatientId = async(req, res)=>{
    try
    {
        returningData.mainContent = "Please enter the patient's id"; 
        returningData.mainTitle = "Give id find detail"; 
        setValidate(returningData, req);
        resRenderedPage = 'findByUserId';

        sendResponse(res, data = returningData, rendered_page = resRenderedPage);
    }
    catch(err)
    {
        updateReturningData(req, err, currStatus = 500);
        sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
    }
};

exports.updateDataByPatientID = async (req, res) => {
    try
    {
        returningData.mainContent = "Please fill the form for updation"; 
        returningData.mainTitle = "Updation form"; 
        setValidate(returningData, req);
        resRenderedPage = 'updationForm';

        sendResponse(res, data = returningData, rendered_page = resRenderedPage)
    }
    catch(err)
    {
        updateReturningData(req, err, currStatus = 500);
        sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
    }
}

exports.insertData = async (req, res)=>{
    try
    {
        returningData.mainTitle = "Insertion form";
        returningData.mainContent = "Please fill your details";
        setValidate(returningData, req);
        resRenderedPage = 'insertionForm';

        sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
    }
    catch(err)
    {
        updateReturningData(req, err, currStatus = 500);
        sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
    }
}