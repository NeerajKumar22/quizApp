var User = require("../models/User");

exports.findUser = function(req, res, next){
    User.find({}, (err, users) => {
        if(err) return next(err);
        res.render("user", {users: users});
    });
};

exports.registrationForm = function(req, res, next){
    res.render("registrationForm");
};

exports.loginForm = function(req, res, next){
    res.render("loginForm");
};

exports.login = function(req, res, next){
    var {email,password} = req.body;
    if(!email || !password) {
        return res.redirect("/login");
    }
    User.findOne({email: email}, (err, user) => {
        console.log(user);
        if(err) return next(err);
        if(!user){
            return res.redirect("/login");
        };
        if(!user.validatePassword(password)) return res.redirect("/login");
        //create session
        req.session.userId = user._id;
        res.redirect("/dashboard");
    });
};

exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/");
};

exports.userNew = function(req, res, next){
    User.create(req.body, (err, user) => {
        console.log(err, user);
        if(err) return next(err);
        res.redirect("/login");
    });
};

exports.userFindById = function(req, res, next) {
    var id = req.params.id;
    User.findById(id).populate("quizs").exec((err, result) => {
        if(err) return next(err);
        res.render("singleUser", {user: result});
    });
};

exports.userEdit = function(req, res, next){
    var id = req.params.id;
    User.findById(id, (err, user) => {
        if(err) return next(err);
        res.render("editUser", {user: user});
    });
};

exports.userUpdate = function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndUpdate(id, (err, user) => {
        if(err) return next(err);
        res.render("updateUser", {user: user});
    });
};

exports.userDelete = function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndDelete(id, (err, user) => {
        if(err) return next(err);
        res.redirect("/users/");
    });
};