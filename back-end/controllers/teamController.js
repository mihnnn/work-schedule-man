import mongoose from "mongoose";
import Team from "../db/schemas/team.js";
import User from "../db/schemas/user.js";

// /api/teams/create-team
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


// /api/teams/:id
export const getTeamInfo = async (req, res) => {
  try {
    const teamId = req.params.id;

    const team = await Team.findById(teamId)
      .populate('managers', 'displayName email')
      .populate('members.user', 'displayName email');

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const managerIds = new Set(team.managers.map(manager => manager._id.toString()));

    const membersWithRole = team.members.map(member => ({
      id: member.user._id,
      name: member.user.displayName,
      email: member.user.email,
      role: member.role,
      isManager: managerIds.has(member.user._id.toString()),
    }));
    


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

// /api/teams/join-team
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

// api/teams/:id/
export const updateTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    console.log("teamId", teamId);

    const { teamName, roles } = req.body;

    console.log("teamName", teamName);
    console.log("roles", roles);

    // Find the team by ID
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Update the team name if provided
    if (teamName) {
      team.name = teamName;
    }

    // Update roles if provided
    if (roles && Array.isArray(roles)) {
      team.roles = roles;
    }

    // Save updated team
    await team.save();

    res.status(200).json({ message: "Team updated successfully", team });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// api/teams/:id/
export const deleteTeam = async (req, res) => {
  try {
    const teamId = req.params.id;

    // Find and delete the team
    const team = await Team.findByIdAndDelete(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Remove the team from each user's teamMemberships
    await User.updateMany(
      { "teamMemberships.team": teamId },
      { $pull: { teamMemberships: { team: teamId } } }
    );

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// /api/teams/:id/create-role
export const createRole = async (req, res) => {
  try {
    const { userId, roleName } = req.body;
    const teamId = req.params.id;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    const isManager = team.managers.includes(userId);
    if (!isManager) {
      return res.status(403).json({ message: "You are not authorized to create roles for this team" });
    }
    const existingRole = team.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
    if (existingRole) {
      return res.status(400).json({ message: "Role with the same name already exists in this team" });
    }
    const newRole = {
      name: roleName,
      description: "",
    };
    team.roles.push(newRole);
    await team.save();
    return res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    console.error("Error creating role:", error);
    return res.status(500).json({ message: "Server error, could not create role" });
  }
};


// /api/teams/id/delete-role
export const deleteRole = async (req, res) => {
  try {

    const teamId = req.params.id; 
    const roleId = req.params.roleId;

    const userId = req.body.userId;


    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    
    const isManager = team.managers.includes(userId);
    if (!isManager) {
      return res.status(403).json({ message: "You are not authorized to delete roles for this team" });
    }
    const roleIndex = team.roles.findIndex(role => role._id.toString() === roleId);
    if (roleIndex === -1) {
      return res.status(404).json({ message: "Role not found" });
    }
    team.roles.splice(roleIndex, 1);
    await team.save();
    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    return res.status(500).json({ message: "Server error, could not delete role" });
  }
};

export const assignRole = async (req, res) => {
  try {
    const teamId = req.params.id;
    const { userId, roleId } = req.body;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const member = team.members.find((m) => m.user.toString() === userId);
    if (!member) {
      return res.status(404).json({ message: "User is not a member of this team" });
    }

    // Assign the role or remove the role
    member.role = roleId === null ? null : roleId;  // Set to null if roleId is null
    await team.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's teamMemberships
    const teamMembershipIndex = user.teamMemberships.findIndex(
      (membership) => membership.team.toString() === teamId
    );

    if (teamMembershipIndex > -1) {
      // If the user is already a member, update their role
      user.teamMemberships[teamMembershipIndex].role = roleId === null ? null : roleId;  // Set to null if roleId is null
    }

    await user.save();

    res.status(200).json({ message: "Role assigned successfully", team });
  } catch (error) {
    console.error("Error assigning role:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// PATCH /api/teams/:teamId/managers
export const updateManager = async (req, res) => {
  try {
    const { currentUserId, userId } = req.body;
    const { teamId } = req.params;


    const isManager = await Team.findOne({ _id: teamId, managers: currentUserId });
    if (!isManager) {
      return res.status(403).json({ message: "You are not authorized to update managers" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const memberExists = team.members.some(member => member.user.toString() === userId);
    if (!memberExists) {
      return res.status(404).json({ message: "User is not a member of the team" });
    }

    const isAlreadyManager = team.managers.includes(userId);

    if (isAlreadyManager) {
      team.managers = team.managers.filter(managerId => managerId.toString() !== userId);
      await team.save();
      return res.status(200).json({ message: "User demoted from manager successfully" });
    } else {
      team.managers.push(userId);
      await team.save();
      return res.status(200).json({ message: "User promoted to manager successfully" });
    }

  } catch (error) {
    console.error("Error updating manager status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




