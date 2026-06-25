import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styledashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [goals, setGoals] = useState([]);

const fetchSubjects = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/subjects",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const data = await response.json();
  setSubjects(data);
};

useEffect(() => {
  fetchSubjects();
}, []);

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

  const fetchGoals = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/goals",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const data = await response.json();

  setGoals(data);
};
useEffect(() => {
  fetchGoals();
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
      

      <button className="view tasks-button"
        onClick={() => navigate("/task")}
      >
        Click Here To View Tasks
      </button>
      </div>
      <div className="box goals-box">
        <h1 className="title">Goals</h1>
         {goals.slice(0, 3).map((goal) => (
    <div key={goal._id}>
      <p>
        {goal.title}
      </p>

      <p>
        {goal.progress}/{goal.target}
      </p>
    </div>
  ))}
  <button className="view goals-button"
  onClick={() => navigate("/goals")}
>
  View All
</button>
      </div>
      <div className="box subjects-box">
  <h1 className="title">Subjects</h1>

  {subjects.slice(0, 3).map((subject) => (
    <p key={subject._id}>
      {subject.name}
    </p>
  ))}
  <button className="view subject-button"
  onClick={() => navigate("/subjects")}
>
  View All
</button>
      </div>
    </div>
  </div>
  );
}

export default Dashboard;