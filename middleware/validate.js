const { QueryInterface } = require("sequelize");
const sendData = require("../Utils/sendData")
const sendResponse = sendData.sendResponse;

let resStatus = 200;
let resData = null;
let resRenderedPage = 'home';
let returningData = {mainContent : "", mainTitle : "", isValidUser : false, data : null, error : null};
let spec = {
    age : "Age(0 to 500)",
    id : "ID(1 to 1e12)",
    walletAmount : "walletAmount(0 to 1e14)",
    gender : "Gender('Male', 'Female', 'Prefer not to say')",
    name : "Name(max 30 char)"
}

function isValueNull(value)
{
    if(!value)return false;
    else return true;
}

function isValueNumber(value)
{
    if(isNaN(Number(value)))return false;
    else return true;
}

function isIdNumber(req)
{
    if(isValueNumber(req.body.patientId))return true;
    else return false;
}

function isAgeNumber(req)
{
    if(isValueNumber(req.body.age))return true;
    else return false;
}

function isWalletAmountNumber(req)
{
    if(isValueNumber(req.body.walletAmount))return true;
    else return false;
}

function isAgeValid(req)
{
    if(Number(req.body.age) > 0 && Number(req.body.age) <= 500)return true;
    else return false;
}

function isWalletAmountValid(req)
{
    if(Number(req.body.walletAmount) >= 0 && Number(req.body.walletAmount <= 1000000000000000))return true;
    else return false;
}

function isIdValid(req)
{
    if(Number(req.body.patientId) >= 0 && Number(req.body.patientId) <= 1000000000000)return true;
    else return false;
}

function isGenderValid(req)
{
    const validGender = ['Male', 'Female', 'Prefer not to say'];
    if(!validGender.includes(req.body.gender))return false;
    else return true;
}

function isNameValid(req)
{
    const patientName = req.body.name;
    if(patientName.length <= 30)return true;
    else return false;
}

function isNewNameValid(req)
{
    const patientName = req.body.newName;
    if(patientName.length <= 30)return true;
    else return false;
}

const validateInsertionInput = (req) =>
{   
    if(isValueNull(req.body.name) && isValueNull(req.body.age) && isValueNull(req.body.gender) && isValueNull(req.body.walletAmount))
    {
        if(isAgeNumber(req) && isWalletAmountNumber(req))
        {
            if(isNameValid(req) && isAgeValid(req) && isGenderValid(req) && isWalletAmountValid(req))return true;
            else return `Expected Specification failed : ${spec.name}, ${spec.age}, ${spec.gender} and ${spec.walletAmount}`;
        }
        else return "Entered age and wallet amount should be number";
    }
    else return "Entered null values";
}

const validateGetDataByIdInputData = (req) =>
{
    if(isValueNull(req.body.patientId))
    {
        if(isIdNumber(req))
        {
            if(isIdValid(req))return true;
            else return `Expected Specification failed : ${spec.id}`;
        }
        else return "Your entered id should be number";
    }
    else return "Entered null values";
}

const validateUpdationInput = (req) =>
{   
    if(isValueNull(req.body.newName) && isValueNull(req.body.age) && isValueNull(req.body.gender) && isValueNull(req.body.walletAmount) && isValueNull(req.body.patientId))
    {
        if(isAgeNumber(req) && isIdNumber(req) && isWalletAmountNumber(req))
        {
            if(isNewNameValid(req) && isGenderValid(req) && isAgeValid(req) && isWalletAmountValid(req) && isIdValid(req))return true;
            else return `Expected Specification failed : ${spec.id}, ${spec.name}, ${spec.age}, ${spec.gender} and ${spec.walletAmount}`;
        }
        else return "Your entered id, age and wallet amount should be number";
    }
    else return "Entered null values";
}

module.exports = {validateInsertionInput, validateGetDataByIdInputData, validateUpdationInput}