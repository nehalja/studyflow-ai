import { useEffect, useState } from "react";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [editingId, setEditingId] = useState(null);
const [editName, setEditName] = useState("");

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
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  await fetch("http://localhost:5000/api/subjects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      name: subjectName,
    }),
  });

  setSubjectName("");
  fetchSubjects();
};

useEffect(() => {
  fetchSubjects();
}, []);

const deleteSubject = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(
    `http://localhost:5000/api/subjects/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  fetchSubjects();
};

const updateSubject = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(
    `http://localhost:5000/api/subjects/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        name: editName,
      }),
    }
  );

  setEditingId(null);
  setEditName("");

  fetchSubjects();
};

  return (
  <div>
      <h1>Subjects</h1>
    
    <form onSubmit={handleSubmit}>
      <input
    type="text"
    placeholder="Enter subject"
    value={subjectName}
    onChange={(e) => setSubjectName(e.target.value)}
  />

  <button type="submit">
    Add Subject
  </button>
    </form>
   <ul>
  {subjects.map((subject) => (
    <li key={subject._id}>
  {editingId === subject._id ? (
    <>
      <input
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
      />

      <button
        onClick={() =>
          updateSubject(subject._id)
        }
      >
        Save
      </button>
    </>
  ) : (
    <>
      {subject.name}

      <button
        onClick={() => {
          setEditingId(subject._id);
          setEditName(subject.name);
        }}
      >
        Edit
      </button>

      <button
        onClick={() =>
          deleteSubject(subject._id)
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

export default Subjects;