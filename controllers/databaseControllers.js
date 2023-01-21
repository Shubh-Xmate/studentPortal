const redisService = require("../services/redisService");
const dbQueries = require("../services/dbQueries")

exports.allPatients = async(req, res, next)=>
{
    try
    {
        const data = await dbQueries.getAllPatients();

        const returningData = {data : data, mainContent : "Here is the patients details", mainTitle : "All Patients"};
        res.render('list', returningData);
    }
    catch(err)
    {
        console.log("databaseControllers -> allPatients, err : " ,err);
        res.send("allPatients : internal error");
    }
}

exports.getDataByPatientId = async(req, res, next)=>
{
    try
    {
        const patientID = req.body.patientsId;
        const getKeyResponse = await redisService.getKey(patientID);

        if(getKeyResponse == null || getKeyResponse == undefined)
        {
            const data = await dbQueries.getDataById(patientID);
            await redisService.setKey(patientID, data[0]);

            const returningData = {data : data, mainContent : "Here is the detail of the given name patients", mainTitle : "fetched successfully"};
            res.render('list', returningData);    
        }
        else
        {
            res.render('list', {data : [getKeyResponse], mainContent : "Here is the detail of the given name patients", mainTitle : "fetched successfully"});   
        }
    }
    catch(err)
    {
        console.log("databaseControllers -> getDataByPatientId, err : " ,err);
        res.send("fetchingPatients : internal error");
    }
};

exports.updateDataByPatientID = async (req, res, next)=>
{
    try
    {
        const userId = req.body.patientID;
        const data = {name : req.body.newName, age : req.body.age, gender : req.body.gender, walletAmount : req.body.walletAmount};

        const result = dbQueries.updateDataById(userId, data);
        const returningData = {mainContent : "You can find your updated details in the GET ALL PATIENTS DETAILS section", mainTitle : "updated successfully"};

        res.render('home', returningData);
    }
    catch(err)
    {
        console.log("databaseControllers -> updateDataByPatientID, err : " ,err);
        res.send("updation failed");
    }
}


exports.insertData = async (req, res, next)=>
{
    try 
    {
        const data = {name : req.body.name, age : req.body.age, gender : req.body.gender, walletAmount : req.body.walletAmount};
        const result = await dbQueries.insertData(data);
        
        const returningData = {data : result, mainContent : "Here you can see your patients filled details", mainTitle : "Inserted Successfully"};
        res.render('list', returningData);
    } 
    catch(err)
    {
        console.log("databaseControllers -> insertData, err : " ,err);
        res.send("insertion failed");
    }
};