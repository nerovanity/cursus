const express = require("express");
const stepsController = require("./../controllers/stepscontroller");

const router = express.Router();

router.route("/").get(stepsController.getallsteps);

module.exports = router;