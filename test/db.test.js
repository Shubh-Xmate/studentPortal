
const request = require('supertest');
const { app } = require('../loader');
const {getAllPatients, getDataById, updateDataById, insertData} = require('../services/dbQueries')
jest.useFakeTimers();

// test patient
const testPatient = 
{
    name : 'test Patient2',
    age : 25,
    gender : 'Female',
    walletAmount : 5663
}

const expectNoErrorWithSuccessResponse = (response) =>
{
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(null);
}

const expectMainTitle = (response, expectedTitle) =>
{
    expect(response.body.mainTitle).toBe(expectedTitle);
}

// home route
describe('Check get home route', () =>
{
    test('No err and main title of the page', async () =>
    {
        const response = await request(app).get('/');
        expectNoErrorWithSuccessResponse(response);
        expectMainTitle(response, "Home");
    })
})

// get all patients details
describe('Check get all patients route', () =>
{
    test('No err and main title of the page', async () =>
    {
        let response = await request(app).get('/allPatients');
        expectNoErrorWithSuccessResponse(response);
        expectMainTitle(response, "All Patients");
    })
    test('Gets called with the right thing', async () =>
    {
        let response = await request(app).get('/allPatients');
        const currData = response.body.data[0];
        const keys = ['patient_id', 'name', 'age', 'gender', 'walletAmount']
        keys.forEach((fieldValue)=>
        {
            expect(currData).toHaveProperty(fieldValue);
        })
        
    })
})

// all post situations here 

// get details by the patient id
describe('Check get data by patients id', () =>
{
    let patientId = 1;
    let patientData = "patientId=" + String(patientId);
    test('Given valid i/p : No err and main title of the response page', async () =>
    {
        let response = await request(app)
                        .post('/getDetails')
                        .send(patientData)

        expectNoErrorWithSuccessResponse(response);
        expectMainTitle(response, "fetched successfully")
    })

    test('Given invalid i/p : error message should be sent', async () =>
    {
        let response = await request(app)
                        .post('/getDetails')
                        .send({})

        expect(response.status).not.toBe(200)
        expectMainTitle(response, "Give id find detail")
        expect(response.body.mainContent).toBe("Entered null values")
    })

    test('If result returned : then should be with right fields', async () =>
    {
        
        let response = await request(app).post('/getDetails').send(patientData)
        let currData = response.body.data;
        
        if(currData)
        {
            currData = currData[0];
            const keys = ['patient_id', 'name', 'age', 'gender', 'walletAmount']
            keys.forEach((fieldValue)=>
            {
                expect(currData).toHaveProperty(fieldValue);
            })
        }
    })

    test('db and api retuned object should be same', async() => 
    {
        let response = await request(app).post('/getDetails').send(patientData)

        const currData = response.body.data;
        let dbData = await getDataById(patientId);
        if(dbData.length == 0)dbData = null;

        if(!currData && !dbData)
        {
            console.log("Both are returning null values");
            expect(1).toBe(1);
        }
        else expect(currData).toMatchObject(dbData);
    })
})

// creating new patient route tests
describe('Check create new patient route', () =>
{
    let patientDetails = "name=" + testPatient.name + "&" + "age=" + testPatient.age + "&" + "gender=" + testPatient.gender + "&" + "walletAmount=" + testPatient.walletAmount;

    test('Given all valid inputs, should insert the data', async () =>
    {
        const response = await request(app).post("/insert")
                                           .send(patientDetails);
        
        const resData = response.body.data; 
        delete resData[0].updatedAt; delete resData[0].createdAt;
        const dbData = await getDataById(resData[0].patient_id);
        dbData[0].walletAmount = String(dbData[0].walletAmount);
        
        expect(resData).toMatchObject(dbData);
    }) 

    // no wallet amount is passed
    let patientDetails2 = "name=" + testPatient.name + "&" + "age=" + testPatient.age + "&" + "gender=" + testPatient.gender; 
    
    test('Given invalid input, error should be returned', async () => 
    {
        const response = await request(app).post("/insert")
                                           .send(patientDetails2);
        
        expect(response.status).not.toBe(200);
        expect(response.body.data).toBe(null);
        expect(response.body.mainTitle).toBe("Insertion form")
        expect(response.body.mainContent).toBe("Entered null values")
    });
})

// update new patient routes