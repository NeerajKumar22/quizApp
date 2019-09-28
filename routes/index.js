var express = require('express');
var router = express.Router();

var userController = require("../controller/userController");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("registrationForm");
});

router.get('/dashboard', function(req, res, next) {
  res.render("dashboard");
});

router.get("/login", userController.loginForm);
router.get("/logout", userController.logout);



module.exports = router;
