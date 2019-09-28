var express = require("express");
var router = express.Router();

var quizController = require("../controller/quizController");
var authController = require("../controller/authController");

/* GET quiz listing. */


router.get("/me", quizController.myQuizList);
router.get("/", quizController.quizList);

router.post("/new", authController.isUserloggedIn, quizController.newQuiz);


router.get("/:quizId/new", authController.isUserloggedIn, quizController.newQuestion);
router.post("/:quizId/new", authController.isUserloggedIn, quizController.createQuestion);

router.get("/:quizId/play", authController.isUserloggedIn, quizController.playMenu);
router.get("/:quizId/play/:QNO", authController.isUserloggedIn, quizController.firstQuestion);
router.post("/:quizId/play/:QNO", authController.isUserloggedIn, quizController.followingQuestion);


router.post("/", authController.isUserloggedIn, quizController.quizUpdate);

router.get("/:id", quizController.singleQuizFind);

router.use(authController.isUserloggedIn);

router.get("/:id/edit", quizController.editQuiz);

router.post("/:id/update", quizController.updateQuiz);

router.get("/:id/delete", quizController.deleteQuiz);

router.get("/:id/logout", quizController.quizList);

module.exports = router;
