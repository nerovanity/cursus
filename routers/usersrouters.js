const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

// router.post('/signup', authController.signup);
router.post("/login", authController.login);
router.get("/check",authController.check_isLogged);
router.post("/login_mobile", authController.login_mobile);


router
.route("/")
.get(authController.protect,
    authController.restrictTo('admin','employ'),
    userController.getallusers);

router
.route("/logout")
.get(authController.logout);

router
.route("/adduser")
.post(authController.protect,
authController.restrictTo('admin','employ'),
userController.adduser);

router
.route("/:id")
.get(authController.protect,authController.restrictTo('admin','employ'),userController.getuserbyId)
.patch(authController.protect,authController.restrictTo('admin','employ'),userController.updateUser)
.delete(authController.protect,authController.restrictTo('admin','employ'),userController.deleteUser)


router
.route("/profile/:id")
.get(authController.profileprotect,userController.getuserbyId);

module.exports = router;
