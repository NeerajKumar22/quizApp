var Quiz = require("./../models/Quiz");
var User = require("./../models/User");
var Question = require("./../models/Question");


exports.myQuizList = (req, res, next) => {
    Quiz.find({userId:req.session.userId}, (err, quizs) => {
        if (err) {
            return next(err);
        };
        res.render("myQuiz", {quizs: quizs});
    });
};

exports.quizList = (req, res, next) => {
    Quiz.find({}, (err, quizs) => {
        if (err) {
            return next(err);
        };
        res.render("quiz", {quizs: quizs});
    });
};

exports.newQuiz = (req, res, next) => {
    const {title} = req.body;
    const userId = req.session.userId;
    const newQuiz = new Quiz({
        title,
        userId
    })
    newQuiz.save((err, quiz) => {
        res.redirect("/quizs/me")
    })
} 

exports.playMenu = (req, res, next) => {
    const quizId = req.params.quizId // quiz ID

    Quiz.findById(quizId, (err, quiz) => {
        if (err) {
            return next(err);
        };
        res.render("play", {quiz: quiz});
    });
};

exports.firstQuestion = (req, res, next) => {

    const questionNumber = req.params.QNO
    const quizId = req.params.quizId // quiz ID

    Quiz.findById(quizId).populate('question').exec((err, quiz) => {
        if (err) {
            return next(err);
        };
        res.render("singleQuestion", {quizId,question: quiz.question[questionNumber - 1],length:quiz.question.length,index:questionNumber,score:0});
    });
};
exports.followingQuestion = (req, res, next) => {

    const questionNumber = req.params.QNO
    const quizId = req.params.quizId // quiz ID
    const prevAns = +(req.body.answer);
    let score = +req.body.score;

    Quiz.findById(quizId).populate('question').exec((err, quiz) => {
        if (err) {
            return next(err);
        };
        
        score = (quiz.question[questionNumber-2].answers[prevAns].correct) ? score + 10 : score;

        if(questionNumber > quiz.question.length){
            return res.render('result',{score,total:quiz.question.length*10});
        }else{
            res.render("singleQuestion", {quizId,question: quiz.question[questionNumber - 1],length:quiz.question.length,index:questionNumber,score});

        }
    });
};

exports.newQuestion = (req, res, next) => {
    const quizId = req.params.quizId // quiz ID
    const userId = req.session.userId // logged in user
    User.findById(userId, (err, user) => {
        res.render("questionForm", {user: user,quizId});
    });
};

exports.createQuestion = (req, res, next) => {
    const quizId = req.params.quizId;
    const answerArr = [
        {key: req.body.answer1, correct: req.body.answer == "answer1"},
        {key: req.body.answer2, correct: req.body.answer == "answer2"},
        {key: req.body.answer3, correct: req.body.answer == "answer3"},
        {key: req.body.answer4, correct: req.body.answer == "answer4"}
    ];
    newQuestion = new Question({
        title: req.body.title,
        answers: answerArr,
    })
    newQuestion.save((err, savedQuestion) => {
        Quiz.findByIdAndUpdate(quizId, {$push:{question: savedQuestion._id}},(err,updatedQuiz)=>{
            res.redirect('/quizs/'+quizId);
        })
    })

}

exports.quizUpdate = (req, res, next) => {
    Quiz.create(req.body, (err, quiz) => {
        if(err) return next(err);
        res.redirect("/quizs");
    });
};

exports.singleQuizFind = (req, res, next) => {
    var id = req.params.id;
    Quiz.findById(id).populate("userId").populate('question').exec((err, result) => {
        if(err) return next(err);
        res.render("singleQuiz", {quiz: result});
    });
};

exports.editQuiz = (req, res, next) => {
    var id = req.params.id;
    Quiz.findById(id, (err, quiz) => {
        if (err) return next(err);
        res.render("editQuiz", {quiz: quiz});
    });
};

exports.updateQuiz = (req, res, next) => {
    var id = req.params.id;
    Quiz.findByIdAndUpdate(id, req.body, {new: true}, (err, quiz) => {
        if(err) return next(err);
        res.redirect("/quizs/", + quiz._id);
    });
};

exports.deleteQuiz = (req, res, next) => {
    var id = req.params.id;
    Quiz.findByIdAndDelete(id, (err,result) => {
        if(err) return next(err);
        res.redirect("/quizs/me");
    });
};