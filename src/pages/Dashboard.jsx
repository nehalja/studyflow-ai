import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styledashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  async function fetchStats() {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/tasks/stats",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await res.json();
    setStats(data);
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="heading">Welcome Back!!</h1>
    <div className="top-row">
      <div className="box tasks-box">
        <h1 className="title">Tasks</h1>
        <div className="stats-card">
        <h2>Total Tasks: {stats?.totalTasks}</h2>
        </div>
        <div className="stats-card">
          <h2>Completed: {stats?.completedTasks}</h2>
        </div>
        <div className="stats-card">
          <h2>Pending: {stats?.pendingTasks}</h2>
        </div>
      

      <button className="view-tasks-button"
        onClick={() => navigate("/task")}
      >
        Click Here To View Tasks
      </button>
      </div>
      <div className="box goals-box">
        <h1 className="title">Goals</h1>
      </div>
      <div className="box subjects-box">
        <h1 className="title">Subjects</h1>
      </div>
    </div>
  </div>
  );
}

export default Dashboard;