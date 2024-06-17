import { Availability } from "../db/schemas/availability.js";

export const resolveIndexByAvailId = async (req, res ,next) => {
    try {
        const {
            params: { id }, 
        } = req;
        console.log("avail id:", id);

        const findAvailability = await Availability.findById(id).exec();

        if (!findAvailability) return res.status(404).send("Availability not found");

        req.findAvailability = findAvailability;
        next();
    } catch (error) {
        console.error("Error in resolveIndexByAvailId middleware:", error);
        return res.status(500).send("Internal Server Error");
    }
}