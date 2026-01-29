import Service from "../models/Service.js"
import Review from "../models/Review.js"


//create
export const createReview = async(req, res) => {

    try {

        const { username, reviewText, rating } = req.body;
        const serviceId = req.params.id;

        const newReview = new Review({
            username,
            reviewText,
            rating,
            serviceId,
          });

        const savedReview = await newReview.save()      
        
        res.status(201).json({
            success: true,
            message: "Review added",
            data:savedReview,
        })
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          message: "Failed to create review",
        });
    }
}

