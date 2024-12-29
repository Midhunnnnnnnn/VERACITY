// models/MedicalRecord.js

import mongoose from 'mongoose';

const MedicalRecordSchema = new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
        index: true
    },
    title: { 
        type: String, 
        required: true 
    },
    description: String,
    recordDate: { 
        type: Date, 
        required: true 
    },
    recordType: {
        type: String,
        required: true,
        enum: ['general', 'lab', 'prescription', 'imaging', 'vaccination', 'other']
    },
    blockchainTx: {
        type: String,
        required: true,
        unique: true
    },
    encryptedDataHash: {
        type: String,
        required: true
    },
    ipfsHash: String,
    metadata: {
        doctorName: String,
        facility: String,
        diagnosis: [String],
        procedures: [String],
        medications:[{
            name:String,
            dosage:String,
            frequency:String,
            duration:String
         }]
     },
     attachments:[{
         name:String,
         type:String,
         hash:String,
         url:String
     }],
     createdAt:{ 
         type : Date , 
         default : Date.now 
     },
     updatedAt:{ 
         type : Date , 
         default : Date.now 
     }
});

MedicalRecordSchema.index({ patientId :1 , recordDate : -1 });

const MedicalRecord = mongoose.models.MedicalRecord || mongoose.model('MedicalRecord', MedicalRecordSchema);
export default MedicalRecord;
