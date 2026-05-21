import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';


dotenv.config();
connectDB();
const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});