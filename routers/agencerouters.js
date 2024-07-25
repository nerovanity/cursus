const express = require("express");
const agenceController = require("../controllers/agenceController");

const router = express.Router();

router
.route("/")
.get(agenceController.getallagences)
.post(agenceController.creatagence);

router
.route("/:id")
.get(agenceController.getagencebyid)
.delete(agenceController.deleteagence)
.patch(agenceController.updateagence);

module.exports = router;