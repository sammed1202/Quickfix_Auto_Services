import mongoose from 'mongoose';
const spamSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
    }
})
const SpamUser=mongoose.model('SpamUser',spamSchema);
export {SpamUser};