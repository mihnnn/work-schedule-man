import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../db/schemas/user.js'
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { displayName, username, password, confirmPassword, email } = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({error: "password no match"})
        }

        const user = await User.findOne({username});

        if (user) {
            return res.status(400).json({error: "username already exists"})
        }
        //Hash password:
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        //placeholder profile pic link from local with get request
        const placeHolderProfilePic = `http://localhost:8888/profile-pic?username=${username}`;

        const newUser = new User ({
            displayName,
            username,
            password: hashedPassword,
            email,
            profilePic: placeHolderProfilePic,
        })

        if(newUser) {
            //generate jwt token
            generateTokenAndSetCookie(newUser._id, res); //create a cookie with jwt token, name: jwt, value: token

            await newUser.save();
            res.status(201).json(newUser); 
        } else {
            res.status(400).json({error: "bad request"});
        }

    } catch (err) {
        console.log("Error in signup controller", err);
        res.status(500).json({error: "Internal server error"});
    
    } 
}

export const login = async (req, res) => {
    try {
        // Check if there is an active session
        if (req.cookies && req.cookies.jwt) {
            return res.status(400).json({ error: "User is already logged in" });
        }

        const { username, password } = req.body;

        const findUser = await User.findOne({ username });
        const comparePassword = await bcrypt.compare(password, findUser?.password || "");
        if (!findUser || !comparePassword) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(findUser._id, res);

        res.status(200).json(findUser);
    } catch (err) {
        console.log("Error in login controller", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        if (req.cookies && req.cookies.jwt) {
            res.cookie("jwt", "", { maxAge: 0 });
            return res.status(200).json({ msg: "Logged out successfully" });
        } else {
            return res.status(400).json({ error: "No active session" });
        }
    } catch (err) {
        console.log("Error in logout controller", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
