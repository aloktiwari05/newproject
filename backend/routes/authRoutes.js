import express from 'express';
import {login, signup, refresh, getUser, logout} from '../controllers/authController.js'
import {auth} from '../middlewares/authMiddleware.js'

const userRouter = express.Router();

userRouter.post('/login', login)
userRouter.post('/signup', signup)
userRouter.post('/refresh', refresh)
userRouter.get('/getuser', auth, getUser)
userRouter.post('/logout', logout)

export default userRouter;