const mongoose = require("mongoose");

const Category = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})