var express = require("express");
var router = express.Router();

var quizController = require("../controller/quizController");
var authController = require("../controller/authController");
var questionController = require("../controller/questionController");

// to delete questions

router.get("/:quizId/:questId/delete", authController.isUserloggedIn, questionController.deleteQuestion);

module.exports = router;