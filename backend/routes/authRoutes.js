import express from 'express';
import {login, signup, refresh, getUser, logout} from '../controller/authController.js'
import {auth} from '../middleware/authMiddleware.js'

const userRouter = express.Router();

userRouter.post('/login', login)
userRouter.post('/signup', signup)
userRouter.post('/refresh', refresh)
userRouter.get('/getuser', auth, getUser)
userRouter.get('/logout', logout)

export default userRouter;