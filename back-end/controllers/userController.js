import User from '../db/schemas/user.js'


export const user = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found (userController)" });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log("Error in me userController", err);
        res.status(500).json({ error: "Internal server error (userController)" });
    }
}