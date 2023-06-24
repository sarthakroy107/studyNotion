const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ["Male", "Female", "Others", "Prefer not to say"],
    },
    dateOfBirth: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    about: {
        type: String
    }
});

module.exports = mongoose.model("Profile", profileSchema);