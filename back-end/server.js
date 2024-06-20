//npm run server
import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv"; //read .env file
import routes from "./routes/index.js"; //import routes from the index.js file
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import { protectRoute } from "./middleware/protectRoute.js";

dotenv.config({});
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(routes);

const PORT = process.env.PORT || 8888;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

app.get("/profile-pic", protectRoute, (req, res) => {
  res.send("Profile pic route");
});

app.get("/google", (req, res) => {
  console.log(process.env.GOOGLE_CLIENT_ID);

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
});

app.get("/google/redirect"), async (req, res) => {
    // const code = req.query.code;
    // console.log(code);
    // const { tokens } = await oauth2Client.getToken(code);
    // console.log(tokens);
    // oauth2Client.setCredentials(tokens);
    // res.redirect("http://localhost:3000");
    res.send({msg: "Redirected"})
    

};


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}.`);
});
