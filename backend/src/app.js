import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import courseRouter from './routes/CourseRoute.js';



const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
export default app;