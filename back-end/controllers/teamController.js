import mongoose from "mongoose";
import Team from "../db/schemas/team.js";
import User from "../db/schemas/user.js";

export const createTeam = async (req, res) => {
  try {
    const { teamName, userId } = req.body;

    if (!teamName || !userId) {
      return res
        .status(400)
        .json({ message: "Team name and user ID are required" });
    }

    const teamExist = await Team.findOne({ name: teamName });
    if (teamExist) {
      return res.status(400).json({ message: "Team name already exists" });
    }

    const teamCode = Math.random().toString(36).substring(2, 9);

    const manager = await User.findById(userId).select("_id teamMemberships");
    if (!manager) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!manager.teamMemberships) {
      manager.teamMemberships = [];
    }

    const newTeam = new Team({
      name: teamName,
      teamCode,
      managers: [manager._id],
      members: [
        {
          user: manager._id,
          role: null,
        },
      ],
    });

    console.log("newTeam", newTeam);

    await newTeam.save();

    manager.teamMemberships.push({
      team: newTeam._id,
      teamName: newTeam.name,
      teamCode: newTeam.teamCode,
      role: null,
    });

    await manager.save();

    res.status(201).json({
      message: "Team created successfully",
      team: {
        id: newTeam._id,
        name: newTeam.name,
        teamCode: newTeam.teamCode,
        managers: newTeam.managers.map((managerId) => managerId.toString()),
        memberCount: newTeam.members.length,
      },
    });
  } catch (error) {
    console.error("Error in createTeam teamController", error);
    res.status(500).json({ error: "Internal server error (teamController)" });
  }
};

export const joinTeam = async (req, res) => {
  try {
    const { teamCode, userId, action } = req.body;

    if (!teamCode || !userId || !action) {
      return res
        .status(400)
        .json({ message: "Team code, user ID, and action are required" });
    }

    const team = await Team.findOne({ teamCode }).select(
      "_id name members managers teamCode"
    );
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const user = await User.findById(userId).select("_id name teamMemberships");
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
      const isMember = team.members.some(
        (member) => member.user.toString() === userId
      );
      if (isMember) {
        return res
          .status(400)
          .json({ message: "User is already a member of this team" });
      }

      team.members.push({ user: userId, role: null });
      await team.save();

      user.teamMemberships.push({
        team: team._id,
        teamName: team.name,
        teamCode: team.teamCode,
        role: null,
      });
      await user.save();

      return res.status(200).json({
        message: "User successfully enrolled in the team",
        team: {
          id: team._id,
          name: team.name,
          memberCount: team.members.length,
          role: null,
        },
      });
    }

    return res.status(400).json({ message: "Invalid action" });
  } catch (error) {
    console.error("Error in joinTeam", error);
    res.status(500).json({ error: "Internal server error (teamController)" });
  }
};
// /api/teams/:id
export const getTeamInfo = async (req, res) => {
  try {
    const teamId = req.params.id;
    console.log("teamId", teamId);

    const team = await Team.findById(teamId)
      .populate('managers', 'displayName email')
      .populate('members.user', 'displayName email');
      console.log("\nteam", team);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const managerIds = new Set(team.managers.map(manager => manager._id.toString()));
    console.log("managerIds", managerIds);

    const membersWithRole = team.members.map(member => ({
      id: member.user._id,
      name: member.user.displayName,
      email: member.user.email,
      role: member.role,
      isManager: managerIds.has(member.user._id.toString()),
    }));
    
    console.log("\n IsManager:", managerIds.has(team.members[0].user._id));


    res.status(200).json({
      team: {
        id: team._id,
        name: team.name,
        teamCode: team.teamCode,
        managers: team.managers.map(manager => ({
          name: manager.displayName,
          email: manager.email,
        })),
        members: membersWithRole,
        memberCount: team.members.length,
        roles: team.roles,
      },
    });
  } catch (error) {
    console.error("Error in getTeamInfo", error);
    res.status(500).json({ error: "Internal server error (teamController)" });
  }
};



// export const createTeamRole = async (req, res) => {
//   try {
//     const { teamId, roleName } = req.body;

//     if (!teamId || !roleName) {
//       return res
//         .status(400)
//         .json({ message: "Team ID and role name are required" });
//     }

//     const team = await Team.findById(teamId).select("roles");
//     if (!team) {
//       return res.status(404).json({ message: "Team not found" });
//     }

//     if (team.roles.includes(roleName)) {
//       return res
//         .status(400)
//         .json({ message: "Role name already exists in this team" });
//     }

//     team.roles.push(roleName);
//     await team.save();

//     res.status(201).json({ message: "Role created successfully" });
//   } catch (error) {
//     console.error("Error in createTeamRole", error);
//     res.status(500).json({ error: "Internal server error (teamController)" });
//   }
// };

// const editTeamRole = async (req, res) => {
//   try {
//     const { teamId, roleName, newRoleName } = req.body;

//     if (!teamId || !roleName || !newRoleName) {
//       return res
//         .status(400)
//         .json({
//           message: "Team ID, role name, and new role name are required",
//         });
//     }

//     const team = await Team.findById(teamId).select("roles");
//     if (!team) {
//       return res.status(404).json({ message: "Team not found" });
//     }

//     if (!team.roles.includes(roleName)) {
//       return res.status(400).json({ message: "Role not found" });
//     }

//     if (team.roles.includes(newRoleName)) {
//       return res
//         .status(400)
//         .json({ message: "New role name already exists in this team" });
//     }

//     const roleIndex = team.roles.indexOf(roleName);
//     team.roles[roleIndex] = newRoleName;
//     await team.save();

//     res.status(200).json({ message: "Role updated successfully" });
//   } catch (error) {
//     console.error("Error in editTeamRole", error);
//     res.status(500).json({ error: "Internal server error (teamController)" });
//   }
// };

// const deleteTeamRole = async (req, res) => {
//   try {
//     const { teamId, roleName } = req.body;

//     if (!teamId || !roleName) {
//       return res
//         .status(400)
//         .json({ message: "Team ID and role name are required" });
//     }

//     const team = await Team.findById(teamId).select("roles");
//     if (!team) {
//       return res.status(404).json({ message: "Team not found" });
//     }

//     if (!team.roles.includes(roleName)) {
//       return res.status(400).json({ message: "Role not found" });
//     }

//     team.roles = team.roles.filter((role) => role !== roleName);
//     await team.save();

//     res.status(200).json({ message: "Role deleted successfully" });
//   } catch (error) {
//     console.error("Error in deleteTeamRole", error);
//     res.status(500).json({ error: "Internal server error (teamController)" });
//   }
// };

// const assignRole = async (req, res) => {
//   try {
//     const { teamId, userId, roleName } = req.body;

//     if (!teamId || !userId || !roleName) {
//       return res
//         .status(400)
//         .json({ message: "Team ID, user ID, and role name are required" });
//     }

//     const team = await Team.findById(teamId).select("members roles");
//     if (!team) {
//       return res.status(404).json({ message: "Team not found" });
//     }

//     const userIndex = team.members.findIndex(
//       (member) => member.user.toString() === userId
//     );
//     if (userIndex === -1) {
//       return res.status(404).json({ message: "User not found in this team" });
//     }

//     if (!team.roles.includes(roleName)) {
//       return res.status(400).json({ message: "Role not found in this team" });
//     }

//     team.members[userIndex].role = roleName;
//     await team.save();

//     res.status(200).json({ message: "Role assigned successfully" });
//   } catch (error) {
//     console.error("Error in assignRole", error);
//     res.status(500).json({ error: "Internal server error (teamController)" });
//   }
// };
