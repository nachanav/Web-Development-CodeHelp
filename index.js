//Create app
const express = require('express');
const app = express();

//Finding port 
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//Add middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//Connect with db
const dbConnect = require("./config/database");
dbConnect();

//Connect with cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//Mount api route 
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

//Activate or Start server
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
})

