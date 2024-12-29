// models/User.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    auth0Id: { 
        type: String, 
        required: true, 
        unique: true,
        index: true
    },
    walletAddress: { 
        type: String, 
        required: true, 
        unique: true,
        index: true
    },
    role: { 
        type: Number, 
        required: true,
        enum: [0, 1, 2] // 0: ADMIN, 1: PATIENT, 2: MEDICAL_CENTER
    },
    email: String,
    name: String,
    profileComplete: {
        type: Boolean,
        default: false
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Automatically update the updatedAt field
UserSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
