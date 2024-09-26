require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express()
app.use(express.json());

// const fs = require('fs');
// const  multer = require('multer');


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from Vite
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // If you need to allow credentials like cookies
}));

const dbConn = require('./config/db.js');
const projectRoute = require('./routes/projectRoute.js');
const commentRoute = require('./routes/CommentRoute.js');


const port = process.env.PORT || 5173;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/projects', projectRoute);
app.use('/comments', commentRoute);


