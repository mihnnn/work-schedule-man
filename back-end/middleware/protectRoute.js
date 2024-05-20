import jwt from 'jsonwebtoken'
import { User } from '../db/schemas/user.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);
        if (!token) {
            return res.status(401).send('Not authorized, no token');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).send('Not authorized, token failed');
        }

        const user = await User.findById(decoded.userId).select('-password');
        console.log(user);
        if (!user) {
            return res.status(404).send('User not found');
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).send('Not authorized, token failed');
    }
}

