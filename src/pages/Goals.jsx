import { useEffect, useState } from "react";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editTarget, setEditTarget] = useState("");

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [subjectId, setSubjectId] = useState("");

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
    fetchGoals();
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        target,
        deadline,
        subjectId,
      }),
    });

    setTitle("");
    setTarget("");
    setDeadline("");
    setSubjectId("");

    fetchGoals();
  };

  const deleteGoal = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/goals/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    fetchGoals();
  };

  const updateGoal = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(
    `http://localhost:5000/api/goals/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: editTitle,
        target: editTarget,
      }),
    }
  );

  setEditingId(null);
  fetchGoals();
};
  return (
    <div>
      <h1>Goals</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        >
          <option value="">
            Select Subject
          </option>

          {subjects.map((subject) => (
            <option
              key={subject._id}
              value={subject._id}
            >
              {subject.name}
            </option>
          ))}
        </select>

        <button type="submit">
          Add Goal
        </button>
      </form>

      <ul>
  {goals.map((goal) => (
    <li key={goal._id}>
      {editingId === goal._id ? (
        <>
          <input
            value={editTitle}
            onChange={(e) =>
              setEditTitle(e.target.value)
            }
          />

          <input
            value={editTarget}
            onChange={(e) =>
              setEditTarget(e.target.value)
            }
          />

          <button
            onClick={() =>
              updateGoal(goal._id)
            }
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3>{goal.title}</h3>

          <p>
            Progress: {goal.progress}/{goal.target}
          </p>

          <button
            onClick={() => {
              setEditingId(goal._id);
              setEditTitle(goal.title);
              setEditTarget(goal.target);
            }}
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteGoal(goal._id)
            }
          >
            Delete
          </button>
        </>
      )}
    </li>
  ))}
</ul>
    </div>
  );
}

export default Goals;