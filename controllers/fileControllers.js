exports.homeData = async (req, res, next) => {
    res.render('home' ,{mainContent : "Choose what do you want to do from the navbar", mainTitle : "Home"});
}

exports.getDataByPatientId = async(req, res, next)=>{
    try
    {
        const returningData = {mainContent : "Please enter the patient's id", mainTitle : "Give id find detail"};
        res.render('findByUserId', returningData);
    }
    catch(err)
    {
        console.log(err);
        res.send("fetchingPatientsIdUI : internal error");
    }
};

exports.updateDataByPatientID = async (req, res, next) => {
    try
    {
        const returningData = {mainContent : "Please fill the form for updation", mainTitle : "Updation form"};
        res.render('updationForm', returningData)
    }
    catch(err)
    {
        console.log(err);
        res.send("getUpdateForm : internal error");
    }
}

exports.insertData = async (req, res, next)=>{
    try
    {
        const returningData = {mainTitle : "Insertion form", mainContent : "Please fill your details"};
        res.render('insertionForm', returningData)
    }
    catch(err)
    {
        res.send(err);
    }
}
