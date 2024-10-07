import Schedule from "../db/schemas/schedules.js";
// Create a new schedule
export const createSchedule = async (req, res) => {
  const { title, description, time, assignedDays, assignedEmployees, team } = req.body;

  try {
    const newSchedule = new Schedule({
      title,
      description,
      time,
      assignedDays,
      assignedEmployees,
      team,
    });

    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: "Error creating schedule", error });
  }
};

// Get all schedules
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("team").populate("assignedEmployees.user");
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving schedules", error });
  }
};

// Get a single schedule by ID
export const getScheduleById = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await Schedule.findById(id).populate("team").populate("assignedEmployees.user");

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving schedule", error });
  }
};

// Update a schedule
export const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { title, description, time, assignedDays, assignedEmployees, team } = req.body;

  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      { title, description, time, assignedDays, assignedEmployees, team },
      { new: true } // Returns the updated document
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: "Error updating schedule", error });
  }
};

// Delete a schedule
export const deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting schedule", error });
  }
};
