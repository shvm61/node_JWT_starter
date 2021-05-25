const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        return res.status(200).json({
            msg: "Authenticated",
        });
    }
);
router.post("/login", userController.login);
router.post("/signup", userController.signUp);


module.exports = router;