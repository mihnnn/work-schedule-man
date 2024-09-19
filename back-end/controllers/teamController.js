import Team from "../db/schemas/team.js";
import User from "../db/schemas/user.js";

export const createTeam = async (req, res) => {
    try {
        const { teamName, userId } = req.body;

        if (!teamName || !userId) {
            return res.status(400).json({ message: "Team name and user ID are required" });
        }

        const teamExist = await Team.findOne({ name: teamName });
        if (teamExist) {
            return res.status(400).json({ message: "Team name already exists" });
        }

        const teamCode = Math.random().toString(36).substring(2, 9);

        const manager = await User.findById(userId);
        if (!manager) {
            return res.status(404).json({ message: "User not found" });
        }

        const newTeam = new Team({
            name: teamName,
            teamCode,
            managers: [manager._id],
            members: [
                {
                    user: manager._id,
                    role: null,
                }
            ],
        });

        await newTeam.save();

        manager.teamMemberships.push({
            team: newTeam._id,
            teamCode: newTeam.teamCode,
            role: null,
        });
        await manager.save();

        res.status(201).json({ message: "Team created successfully", team: newTeam });
    } catch (error) {
        console.error("Error in createTeam teamController", error);
        res.status(500).json({ error: "Internal server error (teamController)" });
    }
};

export const joinTeam = async (req, res) => {
    try {
        const { teamCode, userId, action } = req.body;

        if (!teamCode || !userId || !action) {
            return res.status(400).json({ message: "Team code, user ID, and action are required" });
        }

        const team = await Team.findOne({ teamCode });
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (action === "show") {
            return res.status(200).json({
                message: "Team found",
                teamInfo: {
                    teamName: team.name,
                    memberCount: team.members.length,
                },
            });
        }

        if (action === "join") {
            const isMember = team.members.some(member => member.user.toString() === userId);
            if (isMember) {
                return res.status(400).json({ message: "User is already a member of this team" });
            }

            team.members.push({ user: userId, role: null });
            await team.save();

            user.teamMemberships.push({
                team: team.name,
                teamCode: team.teamCode,
                role: null,
            });
            await user.save();

            return res.status(200).json({
                message: "User successfully enrolled in the team",
                team
            });
        }

        return res.status(400).json({ message: "Invalid action" });

    } catch (error) {
        console.error("Error in joinTeam", error);
        res.status(500).json({ error: "Internal server error (teamController)" });
    }
};
