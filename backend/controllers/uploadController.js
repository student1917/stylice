import Uploading from '../models/Uploading.js';
import cloudinary from '../utils/cloudinary.js';

export const uploadImage = async(req, res)=> {
    try{

        const uploadedImages = [];

        if (req.file) {
            const base64 =req.file.buffer.toString('base64')
            const dataUri = `data:${req.file.mimetype};base64,${base64}`
    
            const result = await cloudinary.uploader.upload(dataUri, {folder:'stylicle'})
    
            const uploaded = await Uploading.create({
                url: result.secure_url,
                public_id: result.public_id,
                status: 'pending'
            })
            
            return res.status(200).json({
                success: true,
                image: {
                    url: uploaded.url,
                    public_id: uploaded.public_id
                }
                
            })
        }      
        
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const base64 = file.buffer.toString('base64')
                const dataUri = `data:${file.mimetype};base64,${base64}`
        
                const result = await cloudinary.uploader.upload(dataUri, {folder:'stylicle'})
        
                const uploaded = await Uploading.create({
                    url: result.secure_url,
                    public_id: result.public_id,
                    status: 'pending'
                })

                uploadedImages.push({
                    url: uploaded.url,
                    public_id: uploaded.public_id
                })
            }

            return res.status(200).json({
                success: true,
                images: uploadedImages,
              });
        }

        return res.status(400).json({
            success: false,
            message: 'No data',
          });
     
    } catch (err) {     
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Upload failed. Please try again."
        })       

    }
}