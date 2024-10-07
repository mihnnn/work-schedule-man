import Request from "../db/schemas/requests.js";
import User from "../db/schemas/user.js";

export const createRequest = async (req, res) => {
  try {
    const { maker, type, date, details, team } = req.body;


    const user = await User.findById(maker);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new request document
    const newRequest = new Request({
      maker,
      type,
      date,
      details,
      team,
      // managerAction and actionTakenOn will be handled later
    });

    // Save the request to the database
    await newRequest.save();

    // Optionally, you can include the maker's name in the response
    return res.status(201).json({
      ...newRequest.toObject(),
      makerName: user.name, // Include maker's name in the response if needed
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Server error while creating request" });
  }
};
