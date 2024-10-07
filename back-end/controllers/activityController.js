import ActivityLog from '../db/schemas/activityLog.js'; // Adjust the path based on your folder structure

// Controller to create a new activity log
export const createActivityLog = async (req, res) => {
  try {
    const { type, notice, date, team } = req.body;

    // Create a new activity log document
    const newActivityLog = new ActivityLog({
      type,
      notice,
      date,
      team,
    });

    // Save the activity log to the database
    await newActivityLog.save();

    return res.status(201).json(newActivityLog); // Return the newly created activity log with 201 status
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error while creating activity log" });
  }
};
