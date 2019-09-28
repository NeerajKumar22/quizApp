var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title: String,
    answers: [{
        key:{
            type: String,
        },
        correct:{
            type: Boolean
        }
    }],
},{timestamps: true});

module.exports = mongoose.model("Question", questionSchema);