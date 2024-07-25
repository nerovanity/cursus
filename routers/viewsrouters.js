const express = require("express");
const viewsController = require("./../controllers/viewsController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/overview").get(viewsController.loginPage);

router.route("/").get(viewsController.loginPage);

router.route("/homepage").get(viewsController.homepage);

router.route("/liste_admin").get(viewsController.listeadmin);

router.route("/cursus").get(viewsController.cursus);

router.route("/add_client").get(viewsController.addclient);

router.route("/add_admin").get(viewsController.addadmin);

router.route("/edit").get(viewsController.edit);

module.exports = router;
