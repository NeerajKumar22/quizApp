var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bcrypt = require("bcrypt");

var userSchema = new Schema({
    name: {
        type: "String",
        require: [true, "Name is required"]
    },

    email: {
        type: "String",
        require: true,
        unique: [true, "Email is required"]
    },

    password: {
        type: "String",
        require: true,
        minlength: 6,
        maxlength: 10,
    },

    // quizs: [{type:Schema.Types.ObjectId, ref: "Quiz"}]
}, {timestamps: true});

userSchema.pre("save", function(next) {
    if(!this.isModified("password")) return next(); 
    // hash password using bcrypt.hashSync
    this.password = bcrypt.hashSync(this.password, 10);
    // call next

    return next();
});

userSchema.methods.validatePassword = function(password){
    // compare password using bcrypt.compareSync
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("User", userSchema);