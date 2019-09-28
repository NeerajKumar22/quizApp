var Quiz = require("./../models/Quiz");
var User = require("./../models/User");
var Question = require("./../models/Question");

exports.deleteQuestion = (req, res, next) => {
    console.log("test delete question")
    var quizId = req.params.quizId;
    var questId = req.params.questId;

    Quiz.findByIdAndUpdate(quizId, {$pull:{question: questId}},(err)=>{
        if(!err){
            Question.findByIdAndDelete(questId, (err,result) => {
                if(err) return next(err);
                res.redirect("/quizs/" +quizId) ;
            });
        };
    });

    
};