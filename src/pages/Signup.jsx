import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  function handleConfirmPasswordChange(value) {
    setConfirmPassword(value);

    if (value !== "" && password !== value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }

  return (
    <div>
      <h1>SignUp</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <br />

      <button type="button">SignUp</button>

      <h2>Already Have An Account?</h2>
      <button type="button" onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
}

export default SignUp;