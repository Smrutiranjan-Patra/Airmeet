const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        profile: { type: String, required: true },
        id: { type: Number, required: true }
    },
    {

        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("user", userSchema);