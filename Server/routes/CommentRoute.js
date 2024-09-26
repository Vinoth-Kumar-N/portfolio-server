const express = require('express');
const Comments = require('../models/CommentModel.js');

const router = express.Router();


router.get('/all', async (req, res) => {
    try {
        const data = await Comments.find();
        res.status(200).json(data);
    } catch (error) {
        res.json({ message: error }).status(500);
    }
})

router.post('/add', async (req, res) => {
    try {
        const newComment = new Comments(req.body);
        const { name, email, message } = newComment;
        if (!name || !email || !message) {
            return res.status(400).json({ message: "all fields Required" });
        }
        const savedata = await newComment.save();
        res.status(200).json(savedata);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const currentrecord = await Comments.findOne({ _id: id });
        if (!currentrecord) {
            res.status(400).json({ message: "record not found" });
        }
        const currentdata = await Comments.findByIdAndDelete(id);
        res.status(200).json(currentdata);
    }catch(error){
        res.status(500).json({message: error});
    }

})

module.exports = router;