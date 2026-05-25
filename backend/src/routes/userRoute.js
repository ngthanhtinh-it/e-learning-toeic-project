import express from 'express';
import { loginUser, registerUser , getUserInfo} from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.get('/get-info', authMiddleware, getUserInfo);

export default userRouter;