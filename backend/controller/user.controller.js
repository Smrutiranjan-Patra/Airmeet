const express = require("express");
const user = require("../model/user.model");
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        let shop = await user.find().limit(10).lean().exec();
        return res.status(201).send(shop);
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let shop = await user.findById(req.params.id).lean().exec();
        return res.status(201).send(shop);
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }
});

module.exports = router;
