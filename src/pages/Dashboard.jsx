import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styledashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [goals, setGoals] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [streak, setStreak] = useState({currentStreak: 0,longestStreak: 0,});

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

const fetchSessions = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/study-sessions",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const data = await response.json();

  setSessions(data);
};
useEffect(() => {
  fetchSessions();
}, []);
const totalMinutes = sessions.reduce(
  (sum, session) =>
    sum + session.duration,
  0
);

const totalHours = (
  totalMinutes / 60
).toFixed(1);

const today = new Date();

today.setHours(0, 0, 0, 0);

const todayMinutes = sessions
  .filter(
    (session) =>
      new Date(session.createdAt) >= today
  )
  .reduce(
    (sum, session) =>
      sum + session.duration,
    0
  );

const todayHours = (
  todayMinutes / 60
).toFixed(1);

const fetchStreak = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/stats/streak",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await response.json();

    setStreak(data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchStreak();
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
      <div className="box sessions-box">
  <h1 className="title">
    Study Sessions
  </h1>

  <div className="stats-card">
    <h2>
      Today's Hours: {todayHours}
    </h2>
  </div>

  <div className="stats-card">
    <h2>
      Total Hours: {totalHours}
    </h2>
  </div>

  <div className="stats-card">
    <h2>
      Sessions: {sessions.length}
    </h2>
  </div>

  <button
    className="view"
    onClick={() =>
      navigate("/sessions")
    }
  >
    View Sessions
  </button>
</div>
    </div>
    <div className="stat-card">
  <h3>🔥 Current Streak</h3>
  <p>{streak.currentStreak} Days</p>
</div>
<div className="stat-card">
  <h3>🏆 Longest Streak</h3>
  <p>{streak.longestStreak} Days</p>
</div>
  </div>
  );
}

export default Dashboard;