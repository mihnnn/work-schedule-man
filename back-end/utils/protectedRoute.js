import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // console.log("JWT_SECRET:", process.env.JWT_SECRET);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification error:", err.message);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = user;
        next();
    });
};
