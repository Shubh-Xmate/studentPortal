
const request = require('supertest');
const { app } = require('../loader');
const patientsModel = require('../models/patientsModel');
jest.useFakeTimers();
jest.setTimeout(() => {
    
}, timeout);

// test patient
const testPatient = 
{
    name : 'test Patient',
    age : 23,
    gender : 'Male',
    walletAmount : 5666
}

const expectNoError = (response) =>
{
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(null);
}

const expect500Status = (response) =>
{
    expect(response.status).toBe(500);
}

const expectMainTitle = (response, expectedTitle) =>
{
    expect(response.body.mainTitle).toBe(expectedTitle);
}

// calling to some other port

// calling to some undefined route

// calling to the defined route

// home route
describe('Check get home route', () =>
{
    test('Get the home route object without any error', async () =>
    {
        const response = await request(app).get('/');
        expectNoError(response);
        expectMainTitle(response, "Home");
    })
})

// get all patients details
describe('Check get all patients route', () =>
{
    test('Get all patient details without any error', async () =>
    {
        const response = await request(app).get('/allPatients');
        console.log(response.body)
        expectNoError(response);
        expectMainTitle(response, "All Patients");
    })
})

// describe('Checking Patient Routes', () => 
// {
//     test('Given all the input fields are valid, it should create a new patient', async () => 
//     {
//         const res = await request(app).post('/patient/create').send(patient);
//         // checking status
//         expect(res.status).toBe(200);
//         // checking if patient was created correctly
//         expect(res.body).toMatchObject(patient);
//     });

//   test('Given invalid input, this test should fail', async () => {
//     const patient = {
//       name : 'Name 2',
//       age : 23,
//       gender : 'Female',
//       // walletAmount : 900,
//     }
//     const res = await request(app).post('/patient/create').send(patient);
//     // checking status
//     expect(res.status).not.toBe(200);
//   });

//   test('Given valid Patient ID and Wallet Amount, it should pass', async () => {
//     const ress = await patientsModel.create(testPatient);
//     const res = await request(app).post('/patient/update').send({
//       id : ress.dataValues.id,
//       walletAmount : 333,
//     });
//     expect(res.statusCode).toBe(200);
//   });

//   test('Given valid patient ID, it should give correct patient details', async () => {
//     const ress = await patientsModel.create(testPatient);
//     const res = await request(app).get(`/patient/${ress.dataValues.id}/details`);
//     expect(res.status).toBe(200);
//     expect(res.body).toMatchObject(testPatient);
//   });
// })