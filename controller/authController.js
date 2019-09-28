var User = require("../models/User");

exports.isUserloggedIn = (req, res, next) => {
    if(req.session && req.session.userId){
        next();
    }else {
        return res.redirect("/login");
    };
};

exports.userSession = (req, res, next) => {
    if(req.session && req.session.userId){
        User.findById(req.session.userId, (err, user) => {
            if(err) return next(err);
            req.user = user;
            res.locals.user = user;
            next()
        });

    } else {
        req.user = null;
        res.localsl.user = null;
        next();
    };
};

exports.logout = (req, res, next) => {
    if(req.session && req.session.userId){
        req.session.destroy(function(err){
            if(err){
                return next(err);
            }
            else{
                res.redirect("/");
            };
        });
    };
};