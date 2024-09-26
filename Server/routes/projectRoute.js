const express = require('express');
const Projects = require('../models/projectModel.js')


const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const fetchProjects = await Projects.find();
        res.json(fetchProjects);
    } catch (error) {
        res.json({ message: error }).status(500);
    }
})

router.post('/add', async (req, res) => {
    try {

        const newproject = new Projects(req.body)
        const { title, desc, covImg, link } = newproject;
        // newproject.covImg.data = fs.readFileSync(req.files.userPhoto.path)
        // newproject.covImg.contentType = 'image / png';
        if (!title || !desc || !covImg || !link) {
            return res.status(400).json({ message: "Title and desc Required" });
        }
        const savedata = await newproject.save();
        // console.log(savedata);
        res.status(201).json(savedata);
        // res.json({ message: "Projects added successfully" });

    } catch (error) {
        res.status(500).json({ message: error });
    }
})



router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const currentrecord = await Projects.findOne({ _id: id });
        if (!currentrecord) {
            res.status(400).json({ message: "record not found" });
        }
        const updateddata = await Projects.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateddata).status(201);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const currentrecord = await Projects.findOne({ _id: id });
        if (!currentrecord) {
            res.status(400).json({ message: "record not found" });
        }
        const currentdata = await Projects.findByIdAndDelete(id);
        res.status(200).json(currentdata);
    } catch (error) {
        res.status(500).json({ message: error });
    }

})

module.exports = router;