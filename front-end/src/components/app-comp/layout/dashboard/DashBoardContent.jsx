import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashBoardSchedule from "./dashboard-routes/DashBoardSchedule";
import DashBoardActivity from "./dashboard-routes/DashBoardActivity";
import DashBoardTeam from "./dashboard-routes/DashBoardTeam";


function DashBoardContent() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Navigate to="team" />} />
        <Route path="team" element ={<DashBoardTeam /> }/>
        <Route path="schedule" element={<DashBoardSchedule />} />
        <Route path="activity" element={<DashBoardActivity />} />
      </Routes>
    </div>
  );
}

export default DashBoardContent;