import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, )
        console.log("Connected to DB");
    } catch(err) {
        console.log (" Error connecting to DB", err.message);
    };
}

export default connectDB;