import Service from '../models/Service.js'
import Uploading from '../models/Uploading.js'
import cloudinary from '../utils/cloudinary.js';
import mongoose from 'mongoose';


//create Service 
export const createService = async(req, res) => {

    await Uploading.deleteMany({
        status:'pending',
        createdAt: { $lt: new Date(Date.now() - 30 * 60 * 1000) }
    })
    
    try {       

        const {
            imageId,
            galleryIds = [],
            name,
            shortDesc,
            desc,
            price,
            duration,
            terms,
            benefits,
          } = req.body;

        if (!imageId) 
            return res.status(400).json({ success: false, message: 'No imageId' });

        const coverImage = await Uploading.findOne({public_id: imageId})

        if (!coverImage) 
            return res.status(400).json({ success: false, message: 'Invalid imageId' });

        if (coverImage.status !== 'used') {            
            coverImage.status = 'used'
            await coverImage.save();
        }

        const galleryImages = await Uploading.find({public_id: {$in: galleryIds}})
        const galleryUrls = galleryImages.map(img => img.url)

        await Uploading.updateMany(
            {public_id: {$in:galleryIds}, status:{$ne: 'used'}},
            {$set: {status:'used'}}
        )
        
        const newService = new Service({
            name,
            shortDesc,
            desc,
            price,
            duration,
            terms,
            benefits,
            image: coverImage.url,
            imageId,
            gallery: galleryUrls,
            galleryIds,
          });
        const savedService = await newService.save()

        return res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: savedService
          })           
       
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server error' 
        });
    }
}

//update Service
export const updateService = async(req, res) => {


    try {
        const {id} = req.params
        const existingService = await Service.findById(id)

        if(!existingService)
            return res.status(404).json({ success: false, message: 'Service not found' })

        const {imageId, galleryIds = [],...serviceData} = req.body

        if (existingService.imageId && existingService.imageId !== imageId) {
            await Uploading.updateOne({ public_id: existingService.imageId }, { status: 'pending' })
          }
        if (imageId) {
            await Uploading.updateOne({ public_id: imageId }, { status: 'used' })
          }

        
        const oldGalleryIds = existingService.galleryIds || []
        const toPending = oldGalleryIds.filter(id => !galleryIds.includes(id))
        const toUsed = galleryIds.filter(id => !oldGalleryIds.includes(id))
    
        if (toPending.length > 0) {
        await Uploading.updateMany({ public_id: { $in: toPending } }, { status: 'pending' })
        }
        if (toUsed.length > 0) {
        await Uploading.updateMany({ public_id: { $in: toUsed } }, { status: 'used' })
        }

        Object.assign(existingService, { ...serviceData, imageId, galleryIds })
        const updatedService = await existingService.save()

        await Uploading.deleteMany({
            status:'pending',
            createdAt: { $lt: new Date(Date.now() - 30 * 60 * 1000) }
        })

        return res.status(200).json({
            success: true,
            message: 'Service updated successfully',
            data: updatedService
        })
      
        

    } catch (err) {
        console.log(err)
        return res.status(500).json({ 
            success: false, 
            message: 'Update failed' })
    }
}

//delete Service
export const deleteService = async(req, res) => {

    const {id} = req.params.id

    try {

        const service = await Service.findById(id)
        if (!service)
            return res.status(404).json({ 
                success: false, 
                message: 'Service not found' 
            })

        const { imageId, galleryIds = [] } = service
        
        if (imageId) {
            await cloudinary.uploader.destroy(imageId)
            await Uploading.deleteOne({ public_id: imageId })
        }

        if (galleryIds.length > 0) {
            
            await Promise.all(galleryIds.map(id => cloudinary.uploader.destroy(id)))
      
            
            await Uploading.deleteMany({ public_id: { $in: galleryIds } })
          }

        await Service.findByIdAndDelete(id)
        res.status(200).json({
            success: true, 
            message: 'Successfully deleted',
           
        })

        
    } catch (err) {
        console.error("Error deleting tour:", err.message);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to delete. Try again'})

    }
}

//get singleService
export const getSingleService = async(req, res) => {

    const id = req.params

    try {
        const [service] = await Service.aggregate([
            {
                $match: {_id: new mongoose.Types.ObjectId(id)}
            },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'serviceId',
                    as: 'reviews'         
                }
            },
            {
                $addFields: {
                    reviewCount: {$size: '$reviews'},
                    averageRating: {
                        $cond: [
                            { $gt:[{$size:'$reviews'},0]},
                            {$round: [ { $avg: '$reviews.rating' }, 1 ]},
                            0

                        ]
                    }
                
                }
            }
        ])
        res.status(200).json({
            success: true,             
            message: 'Successful',
            data: service,
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({ 
            success: false, 
            message: 'not found'})
    }
}

//get all services
export const getAllServices = async (req, res) => {
    
    // const page = parseInt(req.query.page)
    // const pageSize = parseInt(req.query.pageSize)

    try {

        
        const services = await Service.aggregate([
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'serviceId',
                    as: 'reviews'         
                }
            },
            {
                $addFields: {
                    reviewCount: {$size: '$reviews'},
                    averageRating: {
                        $cond: [
                            { $gt:[{$size:'$reviews'},0]},
                            {$round: [ { $avg: '$reviews.rating' }, 1 ]},                          0
                            
                        ]
                    }
                
                }
            }
        ])
        // .skip(page * pageSize)
        // .limit(pageSize)


        res.status(200).json({
            success: true, 
            count: services.length,
            message: 'Successful',
            data: services,           
        })        
    } catch (err) {
        console.log(err)
        res.status(404).json({ 
            success: false, 
            message: 'not found'})
    }
}

//get services by search 
export const getServicesBySearch = async (req, res) => {

    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.pageSize)

    const { name } = req.query

    try {
        
        // const services = await Service.find({name: { $regex: name, $options: 'i' }})
        const services = await Service.aggregate([
            {
                $match: {
                    name: { $regex: name, $options: 'i' }
                  }
            },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'serviceId',
                    as: 'reviews'         
                }
            },
            {
                $addFields: {
                    reviewCount: {$size: '$reviews'},
                    averageRating: {
                        $cond: [
                            { $gt:[{$size:'$reviews'},0]},
                            { $round: [{$avg:'$reviews.rating'},1]},
                            0

                        ]
                    }
                
                }
            }
        ])
        .skip(page * pageSize)
        .limit(pageSize)

        res.status(200).json({
            success: true, 
            count: services.length,
            message: 'Successful',
            data: services,           
        })     
        
    } catch(err) {

        res.status(404).json({ 
            success: false, 
            message: 'not found'
        })
    }
}

//get service counts
export const getServiceCount = async(req, res) => {
    try {
        
        const serviceCount = await Service.estimatedDocumentCount();
        
        res.status(200).json({
            success: true,
            data: serviceCount
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message:'failed to fetch'
        })
    }
}
//get search count
export const getServiceBySearchCount = async (req, res) => {
    try {
      const name = req.query.name || '';
  
      const count = await Service.countDocuments({
        name: { $regex: name, $options: 'i' }
      });
  
      res.status(200).json({ data: count });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong', error: err });
    }
  };  
//recommended
export const getRecommendedService = async(req, res) => {
    
    try {
        const services = await Service.aggregate([
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'serviceId',
                    as: 'reviews'         
                }
            },
            {
                $addFields: {
                    reviewCount: {$size: '$reviews'},
                    averageRating: {
                        $cond: [
                            { $gt:[{$size:'$reviews'},0]},
                            {$round: [ { $avg: '$reviews.rating' }, 1 ]},
                            0
                        ]
                    }                
                }
            },
            {
                $match: {
                    
                    bookedCount: {$gte: 50},
                }
            },
            {
                $sort : {bookedCount: -1},
            },
            {
                $limit: 6,
            }
        ])   
      
        res.status(200).json({
            success:true,
            data:services,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message: "Error"
        })

    }
}
//get service by category
export const getServiceByCategory = async(req, res) => {

    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.pageSize)

    const categoryName = req.query.category

    try{
        const services = await Service.aggregate([ 
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                }
            },
            {
                $unwind: '$category'
            },
            {
                $match: {
                    'category.name': {$regex:categoryName, $options:'i'}
                }
            },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'serviceId',
                    as: 'reviews'         
                }
            },
            {
                $addFields: {
                    reviewCount: {$size: '$reviews'},
                    averageRating: {
                        $cond: [
                            { $gt:[{$size:'$reviews'},0]},
                            {$avg:'$reviews.rating'},
                            0

                        ]
                    }
                
                }
            },
  
        ])  

        res.status(200).json({
            success: true,
            data:services,
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            success:false,
            message: "not found"
        })
    }
}

//get service by filter
export const getServicesByFilter = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 8;
  
    const { name, category, minPrice, maxPrice } = req.query;
  
    const matchStage = {};
  
    // Lọc theo tên dịch vụ
    if (name) {
      matchStage.name = { $regex: name, $options: "i" };
    }
  
    // Lọc theo khoảng giá
    if (minPrice || maxPrice) {
      matchStage.price = {};
      if (minPrice) matchStage.price.$gte = parseInt(minPrice);
      if (maxPrice) matchStage.price.$lte = parseInt(maxPrice);
    }
  
    try {
      const services = await Service.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
  
        // Lọc theo name + price
        { $match: matchStage },
  
        // Lọc theo tên danh mục
        ...(category
          ? [
              {
                $match: {
                  "category.name": { $regex: category, $options: "i" },
                },
              },
            ]
          : []),
  
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "serviceId",
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviewCount: { $size: "$reviews" },
            averageRating: {
              $cond: [
                { $gt: [{ $size: "$reviews" }, 0] },
                { $round: [{ $avg: "$reviews.rating" }, 1] },
                0,
              ],
            },
          },
        },
  
        { $skip: page * pageSize },
        { $limit: pageSize },
      ]);
  
      res.status(200).json({
        success: true,
        count: services.length,
        data: services,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };


//get service by filter count 
export const getServiceFilterCount = async (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;
  
    const matchStage = {};
  
    if (name) {
      matchStage.name = { $regex: name, $options: "i" };
    }
  
    if (minPrice || maxPrice) {
      matchStage.price = {};
      if (minPrice) matchStage.price.$gte = parseInt(minPrice);
      if (maxPrice) matchStage.price.$lte = parseInt(maxPrice);
    }
  
    try {
      const countResult = await Service.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
            $unwind: {
              path: "$category",
              preserveNullAndEmptyArrays: true
            }
        },

        { $match: matchStage },
        ...(category
          ? [
              {
                $match: {
                  "category.name": { $regex: category, $options: "i" },
                },
              },
            ]
          : []),
        {
          $count: "total",
        },
      ]);
  
      res.status(200).json({
        success: true,
        data: countResult[0]?.total || 0,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  