require('dotenv').config()
const express = require("express");
const router = express.Router();
const fileControllers = require("../controllers/fileControllers");
const dbControllers = require("../controllers/databaseControllers")
const auth = require("../middleware/authenticate")

if(process.env.DEV == "production")router.use(auth.isAuthenticated);

router.get("/", fileControllers.homeData);
router.get("/allPatients", dbControllers.allPatients)
router.get("/getDetails", fileControllers.getDataByPatientId)
router.post("/getDetails", dbControllers.getDataByPatientId)
router.get("/insert", fileControllers.insertData);
router.post("/insert", dbControllers.insertData);
router.get("/update", fileControllers.updateDataByPatientID);
router.post("/update", dbControllers.updateDataByPatientID);
router.post("/authenticate", dbControllers.authenticate);
router.post("/logout", dbControllers.logout);

module.exports = router;