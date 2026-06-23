import { useState, useEffect } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");

  async function fetchTasks() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: token,
          },
        }
      );


      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function createTask() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            title,
            subject,
          }),
        }
      );

      if (response.ok) {
        setTitle("");
        setSubject("");
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTask(id) {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
        },
      }
    );

    fetchTasks();
  }

  async function deleteTask(id) {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    fetchTasks();
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  await fetch(
    "http://localhost:5000/api/subjects",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        name: subjectName,
      }),
    }
  );

  setSubjectName("");

  fetchSubjects();
};
  return (
    <div>
      <h1>Tasks</h1>

      {tasks.map((task) => (
        <div key={task._id}>
          <span>
            {task.title} {task.completed ? "✅" : "❌"}
          </span>

          <button onClick={() => updateTask(task._id)}>
            Complete
          </button>

          <button onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <button onClick={createTask}>
        Create Task
      </button>
    </div>
  );
}

export default Tasks;