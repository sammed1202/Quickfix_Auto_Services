import Contact from "../models/Contact.js";
export const saveContact=async(req,res)=>{
    try{
    const userContact=new Contact({...req.body});
    await userContact.save();
    res.status(200).json({message:'data saved successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message});
    }
}

export const getFeedbacks=async(req,res)=>{
    try{
        const feedbacks=await Contact.find();
        res.status(200).json({feedbacks});
    }catch(error){
        res.status(400).json({message:"error in getting user feedbacks"});
    }
}