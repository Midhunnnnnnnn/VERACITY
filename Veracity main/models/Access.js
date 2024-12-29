// models/Access.js

import mongoose from 'mongoose';

const AccessSchema = new mongoose.Schema({
    patientId:{ 
      type : mongoose.Schema.Types.ObjectId , 
      ref : 'User',
      required : true
   },
   medicalProviderId:{ 
      type : mongoose.Schema.Types.ObjectId , 
      ref : 'User',
      required : true
   },
   status:{
      type : String ,
      enum:['active','expired','revoked'],
      default:'active'
   },
   accessLevel:{
      type:String ,
      enum:['full','readonly','limited'],
      default:'readonly'
   },
   recordTypes:[{
       type:String ,
       enum:['general','lab','prescription','imaging','vaccination','other']
   }],
   grantedAt:{ 
       type : Date , 
       default : Date.now  
   },
   expiresAt:{ 
       type : Date , 
       required : true  
   },
   revokedAt : Date ,
   blockchainTx : String ,
   metadata:{
       grantedBy:String ,
       reason:String ,
       notes:String  
   }
});

AccessSchema.index({ patientId :1 , medicalProviderId :1 });
AccessSchema.index({ expiresAt :1 },{ expireAfterSeconds :0 });

const Access = mongoose.models.Access || mongoose.model('Access', AccessSchema);
export default Access;
