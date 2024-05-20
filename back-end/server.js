//npm run server
import express from 'express';
import dotenv from 'dotenv'; //read .env file
import routes from './routes/index.js'; //import routes from the index.js file
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import connectDB from './db/connectDB.js';
import { protectRoute } from './middleware/protectRoute.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(routes);

const PORT = process.env.PORT || 8888;
dotenv.config();


app.get('/profile-pic', protectRoute, (req, res) => {
    res.send('Profile pic route');
})

app.get('/api/auth/login', (req, res) => {
    res.send('Login route');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}.`);
    }
);