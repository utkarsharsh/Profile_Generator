import express from 'express'
import { Post, SignUp,Userdetail } from '../controllers/main.js'

const router=express.Router();

router.post('/signup',SignUp);
router.post('/post/:page',Post);
router.post('/profile',Userdetail);
export default router;