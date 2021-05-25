const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {

        username: {
            type: String,
            unique: true,
            required: [true, "email is required"],
        },

        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;
