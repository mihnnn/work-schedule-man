import { User } from '../models/user.js';

export const resolveIndexByUserId = async (req, res, next) => {
    try {
        const {
            params: { id },
        } = req;
        console.log("id:", id);

        const findUser = await
        User.findById(id).exec();

        if (!findUser) return res.status(404).send("User not found");

        req.findUser = findUser;
        next();
    } catch (error) {
        console.error("Error in resolveIndexByUserId middleware:", error);
        return res.status(500).send("Internal Server Error");
    }
};