import Category from "../models/Category.js";
import Uploading from "../models/Uploading.js";
import cloudinary from '../utils/cloudinary.js';
import mongoose from 'mongoose';



//create
export const createCategory = async (req, res) => {
   
    try {

        const {imageId, ...categoryData} = req.body

        if (!imageId)
          return res.status(400).json({
              success:false,
              message:'No img-data'
          })

        const uploadedImage = await Uploading.findOne({public_id: imageId})
        if (!uploadedImage)
          return res.status(400).json({
              success:false,
              message:'Invalid img'
          })

        categoryData.image = uploadedImage.url
        categoryData.imageId = imageId
        

        if (uploadedImage.status != 'used') {
          uploadedImage.status = 'used'
          await uploadedImage.save();
        }

        const newCategory = new Category(categoryData)
        const savedCategory = await newCategory.save()

        res.status(200).json({
          success:true,
          message: 'Successfully created',
          data: savedCategory,
        })             

    } catch (err)
    {
      console.error(err)
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create. Try again' 
        });
    }
    
}

//update
export const updateCategory = async (req, res) => {
    const id = req.params.id;
    const { imageId, ...categoryData } = req.body;
  
    let uploadedImage = null;
    let oldImageId = null;
  
    try {
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }
  
    oldImageId = category.imageId;
  
      if (imageId && imageId !== oldImageId) {
        uploadedImage = await Uploading.findOne({ public_id: imageId });
        if (!uploadedImage) {
          return res.status(400).json({
            success: false,
            message: 'Invalid image',
          });
        }
  
        await Uploading.updateOne({ public_id: imageId }, { status: 'used' });
        
        categoryData.image = uploadedImage.url;
        categoryData.imageId = imageId;        
        }
        
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { $set: categoryData },
            { new: true }
        );


        if (imageId && imageId !== oldImageId && oldImageId) {
        await Uploading.updateOne({ public_id: oldImageId }, { status: 'pending' });
        }

        res.status(200).json({
        success: true,
        message: 'Successfully updated',
        data: updatedCategory,
        });

    } catch (err) {
        console.error(err.message);

        if (uploadedImage) {
        await Uploading.updateOne({ public_id: uploadedImage.public_id }, { status: 'pending' });
        }

        if (oldImageId) {
        await Uploading.updateOne({ public_id: oldImageId }, { status: 'used' });
        }

  
      res.status(500).json({
        success: false,
        message: 'Failed to update. Try again',
      });
    }
  };
  
//getAllCategory

export const getAllCategory = async(req, res) => {
  
  try {
    const categories = await Category.find({})

    res.status(200).json({
      success: true, 
      data: categories
    })

  } catch (err) {
    console.log(err)
    res.status(404).json({ 
        success: false, 
        message: 'not found'})
  }
}

//delete
export const deleteCategory = async(req, res) => {

  const {id}= req.params

  try {
    const category = await Category.findById(id)

    if (!category)
      return res.status(404).json({
        success:false,
        message:"Category not found"
      })

    const { imageId} = category
    
    if (imageId) {
      await cloudinary.uploader.destroy(imageId)
      await Uploading.deleteOne({ public_id: imageId })
    }
    
    await Category.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: "Deleted"
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ 
        success: false, 
        message: 'error'})
  }
}
