import User from '../db/schemas/user.js';

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found (userController)" });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log("Error in getUserById userController", err);
        res.status(500).json({ error: "Internal server error (userController)" });
    }
};

export const updateOnboardProfile = async (req, res) => {
    try {
        const findUser = await User.findByIdAndUpdate(
            req.params.id,
            {displayName: req.body.displayName, email: req.body.email, role: req.body.role},
            {new: true}
        ).select("-password");

        if (!findUser) {
            return res.status(404).json({ error: "User not found (userController)" });
        }
        res.status(200).json({ user: findUser });
    } catch (err) {
        console.log("Error in updateOnboardProfile userController", err);
        res.status(500).json({ error: "Internal server error (userController)" });
    }
}

export const finishBoarding = async (req, res) => {
    try {
        const findUser = await User.findByIdAndUpdate(
            req.params.id, 
            { hasCompletedBoarding: true }, 
            { new: true }
        ).select("-password");
        
        if (!findUser) {
            return res.status(404).json({ error: "User not found (userController)" });
        }

        res.status(200).json({ hasCompletedBoarding: findUser.hasCompletedBoarding });
    } catch (err) {
        console.log("Error in finishBroading userController", err);
        res.status(500).json({ error: "Internal server error (userController)" });
    }
};
