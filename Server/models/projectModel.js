//prepare the schema for the projects

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    covImg: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})


//passing the model
const Projects = mongoose.model('Projects', projectSchema);
module.exports = Projects;
