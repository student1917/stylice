import mongoose from 'mongoose'

const uploadingSchema = new mongoose.Schema({
    url: String,
    public_id: String,
    status: {
        type: String,
        enum: ['pending', 'used'],
        default: 'pending'
    }
}, { timestamps: true })

export default mongoose.model('Uploading', uploadingSchema)