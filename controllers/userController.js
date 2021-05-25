const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports.signUp = async (req, res) => {
    try {
        let hash = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hash;
        let user = await User.create(req.body);
        user = user.toObject();
        delete user.password;
        // console.log(user);
        let token = jwt.sign(user, process.env.JWT_KEY, {
            expiresIn: process.env.JWT_EXPIRY,
        });
        return res.status(201).json({
            success: true,
            jwt: token,
        });
    } catch (err) {
        console.log("error", err);
        return res.status(500).json({
            success: false,
            error: err,
        });
    }
};

module.exports.login = async (req, res) => {
    try {


        let user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res
                .status(422)
                .json({ success: false, error: "Inavlid username or password" });
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            user = user.toObject();
            delete user.password;
            return res.status(200).json({
                success: true,
                msg: "Sign in successful, here is your token, please keep it safe!",
                jwt: jwt.sign(user, process.env.JWT_KEY, {
                    expiresIn: process.env.JWT_EXPIRY,
                }),
            });
        } else {
            return res
                .status(422)
                .json({ success: false, error: "Inavlid username or password" });
        }
    } catch (err) {
        console.log("error", err);
        return res.status(500).json({ success: false, error: err });
    }
};