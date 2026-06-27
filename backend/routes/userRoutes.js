import express from 'express';
import {login, signup} from '../controller/userController.js'

const userRouter = express.Router();

userRouter.post('/login', login)
userRouter.post('/signup',signup)

export default userRouter;