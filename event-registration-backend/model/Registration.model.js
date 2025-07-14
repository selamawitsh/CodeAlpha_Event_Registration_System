import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model('Registration', registrationSchema);
