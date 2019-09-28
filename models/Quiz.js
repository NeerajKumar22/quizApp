var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var quizSchema = new Schema({
    title: String,
    userId: {type: Schema.Types.ObjectId,ref:"User"},
    question: [{type: Schema.Types.ObjectId, ref: "Question"}],
},{timestamps: true});

module.exports = mongoose.model("Quiz", quizSchema); 