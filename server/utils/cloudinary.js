const cloudinary = require('cloudinary').v2;

const cdUpload = async (file,folder) => {
    return (await cloudinary.uploader.upload(file,{
        folder,
        resource_type: 'auto',
    })).secure_url
}