import express from 'express';
import { createCourse } from '../controllers/CourseController.js';
import authMiddleware from '../middlewares/auth.js';

const courseRouter = express.Router();

// Định nghĩa các route liên quan đến khóa học tại đây
courseRouter.post('/create-course', authMiddleware, createCourse);

export default courseRouter;