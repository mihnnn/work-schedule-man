import Request from "../db/schemas/requests.js";
import User from "../db/schemas/user.js";

export const createRequest = async (req, res) => {
  try {
    const { type, date, details, team, maker } = req.body;

    const user = await User.findById(maker);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newRequest = new Request({
      maker,
      type,
      date,
      details,
      team,
    });

    await newRequest.save();

    return res.status(201).json({
      ...newRequest.toObject(),
      makerName: user.name,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Server error while creating request" });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const teamId = req.params.id;

    // Fetch all requests for the specified team and populate the maker field
    const requests = await Request.find({ team: teamId })
      .populate({
        path: 'maker',
        select: 'displayName', // Only fetch displayName for efficiency
      });

    // Map the requests to include only the maker's ID and displayName
    const formattedRequests = requests.map(request => ({
      ...request.toObject(),
      maker: {
        _id: request.maker ? request.maker._id : null, // User's ID
        displayName: request.maker ? request.maker.displayName : 'Unknown', // User's displayName
      },
    }));

    return res.status(200).json(formattedRequests);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Server error while fetching requests" });
  }
};