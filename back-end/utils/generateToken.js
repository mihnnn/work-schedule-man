import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign( {userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    console.log("token", token);
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
        httpOnly: true, //cookie is accessible via http(s) only
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie;