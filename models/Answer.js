var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var answerSchema = new Schema({
    key: String,
    correct: Boolean,
    question: [{type: Schema.Types.ObjectId, ref: "Question"}],
},{timestamps: true});

module.exports = mongoose.model("Answer", answerSchema);