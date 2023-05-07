const File = require("../models/File");
const cloundinary = require("cloudinary").v2;

//localfileupload -> handler function

exports.localFileUpload = async(req, res) => {
    try{
        //fetch file from request
        const file = req.files.file;
        console.log("File Uploaded -> ", file);

        //Create path where file need to stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`; 
        console.log("Path -> ",path);

        //Add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        //Create a successful response
        res.json({
            success: true,
            message: "Local File Uploded Successfully",
        });

    }
    catch(error){
        console.log("Not able to upload file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type, suportedTypes){
    return suportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder){
    const options = (folder);
    console.log("file ", file.tempFilePath);

    return await cloundinary.uploader.upload(file.tempFilePath, options);
}

// async function uploadFileToCloudinary(file, folder, quality){
//     const options = (folder);
//     console.log("file ", file.tempFilePath);

//     if(quality){
//         options.quality = quality;
//     }

//     options.resource_type = "auto";
//     return await cloundinary.uploader.upload(file.tempFilePath, options);
// }

//Image Uploader
exports.imageUpload = async (req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const suportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("fileType -> ", fileType);


        if(!isFileTypeSupported(fileType, suportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported
        console.log("Uploading to CodeHelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //Save in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            // imageUrl:response.secure_url,
            message:"Image Successfully uploaded",
        })

    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'went wrong while uploading image',
        })
    }
}

//Video Upload
exports.videoUpload = async(req,res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        
        const suportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        //Validation
        if(!isFileTypeSupported(fileType, suportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported
        console.log("Uploading to CodeHelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");

        //Save in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl
        })

        res.json({
            success:true,
            imageUrl: response.imageUrl,
            message:"Image Successfully uploaded",
        })
        
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'Something went wrong while uploading video',
        })
    }
}

exports.imageSizeUploader = async (req,res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        const suportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("fileType -> ", fileType);

        //Validation
        if(!isFileTypeSupported(fileType, suportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported
        console.log("Uploading to CodeHelp");
        const response = await uploadFileToCloudinary(file, "Codehelp", 30);
        console.log(response);

        //Save in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl
        })

        res.json({
            success:true,
            // videoUrl: response.,
            message:"Reduce image file Successfully uploaded",
        })

    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'Something went wrong while resizing and uploading video',
        })
    }
}
