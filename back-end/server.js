//npm run server
import dotenv from "dotenv";
import express from "express";
import routes from "./routes/index.js"; //import routes from the index.js file
import cookieParser from "cookie-parser";
// import session from "express-session";
// import passport from "passport";
import connectDB from "./db/connectDB.js";
import { updateMeetingState } from "./middleware/meetingsMiddleware.js";


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIEPARSER_SECRET));

app.use(routes);


const PORT = process.env.PORT || 8888;

updateMeetingState();

app.get("/profile-pic", (req, res) => {
  res.send("Profile pic route");
});


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}.`);
});
