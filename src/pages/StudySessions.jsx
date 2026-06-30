import { useEffect, useState } from "react";

function StudySessions() {
  const [sessions, setSessions] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editDuration, setEditDuration] =
    useState("");
  const [editNotes, setEditNotes] =
    useState("");

  const [subjectId, setSubjectId] =
    useState("");
  const [duration, setDuration] =
    useState("");
  const [notes, setNotes] = useState("");

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
    fetchSessions();
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const now = new Date();

    await fetch(
      "http://localhost:5000/api/study-sessions",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          subjectId,
          duration,
          notes,
          startTime: now,
          endTime: now,
        }),
      }
    );

    setSubjectId("");
    setDuration("");
    setNotes("");

    fetchSessions();
  };

  const deleteSession = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/study-sessions/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    fetchSessions();
  };

  const updateSession = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/study-sessions/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          duration: editDuration,
          notes: editNotes,
        }),
      }
    );

    setEditingId(null);

    fetchSessions();
  };

  return (
    <div>
      <h1>Study Sessions</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={subjectId}
          onChange={(e) =>
            setSubjectId(e.target.value)
          }
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

        <input
          type="number"
          placeholder="Duration (mins)"
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
        />

        <button type="submit">
          Add Session
        </button>
      </form>

      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            {editingId ===
            session._id ? (
              <>
                <input
                  value={editDuration}
                  onChange={(e) =>
                    setEditDuration(
                      e.target.value
                    )
                  }
                />

                <input
                  value={editNotes}
                  onChange={(e) =>
                    setEditNotes(
                      e.target.value
                    )
                  }
                />

                <button
                  onClick={() =>
                    updateSession(
                      session._id
                    )
                  }
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>
                  {
                    session.subjectId
                      ?.name
                  }
                </h3>

                <p>
                  Duration:{" "}
                  {session.duration} mins
                </p>

                <p>
                  Notes:{" "}
                  {session.notes}
                </p>

                <button
                  onClick={() => {
                    setEditingId(
                      session._id
                    );
                    setEditDuration(
                      session.duration
                    );
                    setEditNotes(
                      session.notes
                    );
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteSession(
                      session._id
                    )
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

export default StudySessions;