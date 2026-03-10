import express from 'express';
import  {getFeedbacks, saveContact}  from '../controller/ContactController.js';
const contactRouter=express.Router();
contactRouter.post('/',saveContact);
contactRouter.get('/feedback',getFeedbacks);
export default contactRouter;