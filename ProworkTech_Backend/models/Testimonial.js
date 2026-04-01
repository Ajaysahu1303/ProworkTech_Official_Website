import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, default: 5 },
    avatar: { type: String, required: true },
    isApproved: { type: Boolean, default: false }
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
