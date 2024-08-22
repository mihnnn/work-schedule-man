import User from "../db/schemas/user.js";
import bcryptjs from "bcryptjs";
import generateToken from '../utils/generateToken.js';

import dotenv from "dotenv";
dotenv.config();

const clientUrl = process.env.CLIENT_URL;

export const signup = async (req, res) => {
  const { displayName, username, password, confirmPassword, email } = req.body;
  if (!displayName || !username || !password || !confirmPassword || !email || displayName === "" || username.trim() === "" || password.trim() === "" || confirmPassword.trim() === "" || email.trim() === "") {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password no match" });
    }

    //if email exists:
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //Hash password:
    const hashedPassword = bcryptjs.hashSync(password, 10);

    //placeholder profile pic link from local with get request
    const placeHolderProfilePic = `http://localhost:8888/profile-pic?username=${username}`;

    const newUser = new User({
      displayName,
      username,
      password: hashedPassword,
      email,
      profilePic: placeHolderProfilePic,
    });

    if (newUser) {
      await newUser.save();

      res.status(201).json(
        { success: "Signup successful"}
    );
    } else {
      res.status(400).json({ error: "bad request" });
    }
  } catch (err) {
    console.log("Error in signup controller", err);
    res.status(500).json({ error: "Internal server error", err });
  }
};

export const login = async (req, res) => {
  if (req.cookies && req.cookies.jwt) {
    return res
      .status(400)
      .json({ error: "User is already logged in (login controller)" });
  }
  const { username, password } = req.body;

  if (
    !username ||
    !password ||
    username.trim() === "" ||
    password.trim() === ""
  ) {
    return res.status(400).json({ error: "All fields are required (authController)" });
  }
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    const validPassword = bcryptjs.compareSync(password, findUser.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateToken(findUser._id, res);
    const { password: pass, ...rest } = findUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (err) {
    console.log("Error in login controller", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    console.log("Error in logout controller", err);
    res.status(500).json({ error: "Internal server error(logout)" });
  }
};


export const googleLogin = async (req, res) => {

  /* this snippet belongs to passport.js if it is used */
  // try {
  //   if (req.cookies && req.cookies.jwt) {
  //     return res
  //       .status(400)
  //       .json({ error: "User is already logged in (google login controller)" });
  //   }

  //   const { user } = req;
  //   const token = generateToken(user._id, res);
  //   res.cookie("access_token", token);
  //   res.redirect(clientUrl);
  // } catch (err) {
  //   console.log("Error in google login controller", err);
  //   res.status(500).json({ error: "Internal server error" });
  // }

  // This snippet belongs to firebase auth
  const { name, email, googlePhotoURL } = req.body;
  try {
    const findUser = await User.findOne( {email} );
    if (findUser) {
      const token = generateToken(findUser._id, res);
      const { password: pass, ...rest } = findUser._doc;
      res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
    } else {
      const generatePassword = bcryptjs.hashSync(email, 10);

      const newUser = new User({
        displayName: name,
        username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
        password: generatePassword,
        email,
        profilePic: googlePhotoURL
      }); 
      if (newUser) {
        await newUser.save();
        const token = generateToken(newUser._id, res);
        const { password: pass, ...rest } = newUser._doc;


        res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
      } else {
        res.status(400).json({ error: "bad request, new user cant be created" });
      }
    }
  } catch (error) {
    console.log("Error in google login controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
