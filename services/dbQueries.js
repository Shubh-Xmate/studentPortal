const patientsModel = require("../models/patientsModel");
const Patient = patientsModel.Patient;

const getAllPatients = async() => 
{
    try
    {
        const data = await Patient.findAll({});
        return data;
    }
    catch(err)
    {
        console.log("dbQueries -> getAllPatients err : ", err);
        return null;
    }
}
const getDataById = async (patientID) =>
{
    try
    {
        const data = await Patient.findAll({where : {patient_id : patientID}});
        return data;
    }
    catch(err)
    {
        console.log("dbQueries -> getDataById err : ", err);
        return null;
    }
}

const updateDataById = async(patientID, data) => 
{
    try
    {
        const result = await Patient.update(data, {where : {patient_id : patientID}})
        return result;
    }
    catch(err)
    {
        console.log("dbQueries -> updateDataById err : ", err);
        return null;
    }
}

const insertData = async(data) =>
{
    try
    {
        const result = await Patient.create(data);
        return [result.dataValues];
    }
    catch(err)
    {
        console.log("dbQueries -> insertData err : ", err);
        return null;
    }
}

module.exports = {
    getAllPatients,
    getDataById,
    updateDataById,
    insertData
}