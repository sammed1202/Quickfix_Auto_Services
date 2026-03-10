import express from "express";
import { AddSpam, approveShopOwnerById, delUser, findAllUsers, getPendingShopOwners } from "../controller/AdminController.js";
const adminRouter=express.Router();
adminRouter.get("/dashboard",findAllUsers);
adminRouter.delete("/deluser",delUser);
adminRouter.post("/spam",AddSpam);
adminRouter.get("/pending-shopowners", getPendingShopOwners);
adminRouter.put("/approve-shopowner/:id", approveShopOwnerById);
export default adminRouter;