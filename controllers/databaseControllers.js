require('dotenv').config()
const redisService = require("../services/redisService")
const dbQueries = require("../services/dbQueries")
const inputValidate = require("../middleware/validate")
const {sendResponse} = require("../Utils/sendData")
const {loginSession, logoutSession, setValidate} = require("../Utils/sessionHandler")

let resStatus = 200;
let resRenderedPage = 'home';
let returningData = {mainContent : "", mainTitle : "", isValidUser : true, data : null, error : null};

function updateReturningData(req, err = null, currStatus = 200)
{
    returningData.mainContent = ""; 
    returningData.mainTitle = "Home"; 
    returningData.error = err;
    setValidate(returningData, req);
    resRenderedPage = 'home';
    resStatus = currStatus;
}

const authenticate = async(req, res) =>
{
    try
    {
        loginSession(req);
        updateReturningData(req)
        sendResponse(res, data = returningData, rendered_page = resRenderedPage);
    }
    catch(error)
    {
        updateReturningData(req, err = error, currStatus = 500);
        returningData.mainContent = "problem during authenticated";
        sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
    }
}

const allPatients = async(req, res) =>
{
    try
    {
        const dbData = await dbQueries.getAllPatients();
        
        returningData.data = dbData; 
        returningData.mainContent = "Here is the patients details"; 
        returningData.mainTitle = "All Patients"; 
        setValidate(returningData, req);
        resRenderedPage = 'list';

        sendResponse(res, data = returningData, rendered_page = resRenderedPage);
    }
    catch(error)
    {
        updateReturningData(req, err = error, currStatus = 500);
        returningData.mainContent = "problem in fetching details";
        sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
    }
}

const getDataByPatientId = async(req, res)=>
{
    try
    {
        const validationValue = inputValidate.validateGetDataByIdInputData(req);
        
        if(validationValue == true)
        {
            const patientID = req.body.patientId;
            const getKeyResponse = await redisService.getKey(patientID);

            returningData.mainContent = "Here is the detail of the given patient's ID"; 
            returningData.mainTitle = "fetched successfully";  
            setValidate(returningData, req);
            resRenderedPage = 'list';

            if(!getKeyResponse)
            {
                const dbData = await dbQueries.getDataById(patientID);
                if(dbData.length > 0)await redisService.setKey(patientID, dbData[0]);
                returningData.data = dbData; 
                sendResponse(res, data = returningData, rendered_page = resRenderedPage);
            }
            else
            {
                returningData.data = [getKeyResponse]; 
                sendResponse(res, data = returningData, rendered_page = resRenderedPage);
            }
        }
        else
        {
            returningData.mainTitle = "Give id find detail"
            returningData.data = null
            returningData.mainContent = validationValue
            resStatus = 400 // bad request
            setValidate(returningData, req)
            resRenderedPage = 'findByUserId'
            
            sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
        }
        
    }
    catch(err)
    {
        updateReturningData(req, err = error, currStatus = 500);
        returningData.mainContent = "fetchingPatients : internal error";
        sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
    }
};

const updateDataByPatientID = async (req, res)=>
{
    try
    {
        const validationValue = inputValidate.validateUpdationInput(req);

        if(validationValue == true)
        {
            const userId = req.body.patientId;
            const queryData = {name : req.body.newName, age : req.body.age, gender : req.body.gender, walletAmount : req.body.walletAmount};
            await dbQueries.updateDataById(userId, queryData);

            const dbData = await dbQueries.getDataById(userId);
            if(dbData.length > 0)
            {
                await redisService.setKey(userId, dbData[0]);
                returningData.data = dbData; 
                returningData.mainContent = "This is the updated details"
                returningData.mainTitle = "updated successfully"
                resRenderedPage = "list"

                sendResponse(res, data = returningData, rendered_page = resRenderedPage);
            }
            else
            {
                updateReturningData(req);
                returningData.mainContent = "No patient with the given ID"; 
                returningData.mainTitle = "";
    
                sendResponse(res, data = returningData, rendered_page = resRenderedPage);
            }
            
        }
        else
        {
            returningData.mainTitle = "Updation form"
            returningData.data = null
            returningData.mainContent = validationValue
            setValidate(returningData, req)
            resRenderedPage = 'updationForm'

            sendResponse(res, data = returningData, rendered_page = resRenderedPage);
        }
    }
    catch(error)
    {
        updateReturningData(req, err = error, currStatus = 500);
        returningData.mainContent = "updation failed";
        sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
    }
}


const insertData = async (req, res)=>
{
    try 
    {
        const validationValue = inputValidate.validateInsertionInput(req);
        if(validationValue == true)
        {
            const queryData = {name : req.body.name, age : req.body.age, gender : req.body.gender, walletAmount : req.body.walletAmount};
            const result = await dbQueries.insertData(queryData);
            
            returningData.data = result;
            returningData.mainContent = "Here you can see your patients filled details";
            returningData.mainTitle = "Inserted Successfully";
            setValidate(returningData, req);
            resRenderedPage = 'list';

            sendResponse(res, data = returningData, rendered_page = resRenderedPage);
        }
        else
        {
            returningData.mainTitle = "Insertion form"
            returningData.data = null
            returningData.mainContent = validationValue
            resStatus = 400
            setValidate(returningData, req)
            resRenderedPage = 'insertionForm'
            
            sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
        }
    } 
    catch(error)
    {
        updateReturningData(req, err = error, currStatus = 500);
        returningData.mainContent = "insertion failed";
        sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
    }
};

const logout = (req, res) => 
{
    try
    {
        logoutSession(req)
        updateReturningData(req)
        returningData.mainContent = "successfully logged out"
        sendResponse(res, data = returningData, rendered_page = resRenderedPage);
    }
    catch(error)
    {
        updateReturningData(req, err = error, currStatus = 500)
        returningData.mainContent = "problem during logging out"
        sendResponse(res, data = returningData, rendered_page = resRenderedPage, rStatus = resStatus);
    }
};

module.exports = {authenticate, allPatients, getDataByPatientId, insertData, updateDataByPatientID, logout}