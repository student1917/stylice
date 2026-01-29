// models/Service.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    shortDesc: {
      type: String,
      trim: true
    },
    desc: {
      type: String,
      trim: true
    },
    bookedCount: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    duration: {
      type: Number, 
      default: 60
    },
    imageId: {
      type: String,
      required: true,
    },
    galleryIds: [
      {
        type: String,
        required: true,
      }
    ],
    image: {
      type: String ,
      required: true,
    },
    gallery: [
      {
        type: String ,
        required: true,
      }
    ],
    terms: [
      {
        type: String 
      }
    ],
    benefits: [
      {
        type: String 
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Service', serviceSchema);


