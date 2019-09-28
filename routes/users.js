var express = require('express');
var router = express.Router();

var userController = require("../controller/userController");

router.get("/", userController.findUser);

router.get("/new", userController.registrationForm);


router.post("/login", userController.login);

router.post("/new", userController.userNew);

router.get("/:id",userController.userFindById);

router.get("/:id/edit", userController.userEdit);

router.post("/:id/update", userController.userUpdate);

router.get("/:id/delete", userController.userDelete);

module.exports = router;
