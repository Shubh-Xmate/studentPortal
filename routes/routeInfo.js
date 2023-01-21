const express = require("express");
const router = express.Router();
const fileControllers = require("../controllers/fileControllers");
const dbControllers = require("../controllers/databaseControllers")
const validate = require("../controllers/validate")

router.get("/", fileControllers.homeData);
router.get("/allPatients", dbControllers.allPatients)
router.get("/getDetails", fileControllers.getDataByPatientId)
router.post("/getDetails", dbControllers.getDataByPatientId)
router.get("/insert", fileControllers.insertData);
router.post("/insert", dbControllers.insertData);
router.get("/update", fileControllers.updateDataByPatientID);
router.post("/update", dbControllers.updateDataByPatientID);

module.exports = router;