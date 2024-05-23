import User from "../db/schemas/user.js";

export const checkUsername = async (username) => {
    try {
        const user = await User.findOne({ username });
        return !!user; // Convert the result to a boolean
    } catch (error) {
        console.error(error);
        return false;
    }
}
