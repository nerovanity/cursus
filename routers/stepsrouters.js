const express = require('express');
const stepsController = require('../controllers/etapsController');


const router = express.Router();


router
.route('/')
.get(stepsController.getallsteps)
.post(stepsController.creatstep);

router
.route("/:id")
.get(stepsController.getstepbyid)
.delete(stepsController.deletestep)
.patch(stepsController.updatestep);




module.exports = router;