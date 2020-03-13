import mongoose from 'mongoose'

const disease = mongoose.model('disease', {
    name: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    symptoms: {
        type: [{
        	type: String,
        	lowercase: true
        }],
        required: true
    }
});

export default disease;