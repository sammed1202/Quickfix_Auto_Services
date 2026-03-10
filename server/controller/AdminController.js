
import { SpamUser } from "../models/SpamUser.js";
import User from "../models/UserModel.js";
export const findAllUsers=async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json({users});
    }catch(error){
        res.status(400).json({message:error});
    }
}
export const delUser=async(req,res)=>{
    try{
        const email=req.query.email;
        const users=await User.findOneAndDelete({email});
        await PropertyData.deleteMany({email});
        res.status(200).json({message:`email deleted`,user:users});
    }
    catch(error){
        const email=req.query.email;
        res.status(400).json({message:`error in deleting ${email}`});
    }
}
export const AddSpam=async(req,res)=>{
    try{
        const email=req.query.email;
        const spammer=new SpamUser({email:email});
        await spammer.save();
        res.status(200).json({message:'user banned'});
    }catch(error){
        res.status(400).json({message:error});
    }
}



// ✅ GET /admin/pending-shopowners
export const getPendingShopOwners = async (req, res) => {
  try {
    const pendingShopOwners = await User.find({
      role: "ShopOwner",
      userStatus: "Pending",
    });

    res.status(200).json(pendingShopOwners);
  } catch (error) {
    console.error("Error fetching pending shopowners:", error);
    res.status(500).json({ message: "Failed to fetch pending shopowners" });
  }
};

// ✅ PUT /admin/approve-shopowner/:id
export const approveShopOwnerById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { userStatus: "Approved" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Shop owner not found" });
    }

    res.status(200).json({ message: "Shop owner approved successfully" });
  } catch (error) {
    console.error("Error approving shopowner:", error);
    res.status(500).json({ message: "Failed to approve shopowner" });
  }
};
