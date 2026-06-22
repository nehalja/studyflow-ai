import {useState} from 'react';
import{useNavigate} from 'react-router-dom';
function Login() {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();
  async function handleLogin() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      return;
    }

    localStorage.setItem("token", data.token);

    navigate("/dashboard");
  } catch (error) {
    setError("Something went wrong");
  }
}
  return(
    <div>
      <h1>Login</h1>
      <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <br/>
      <input
      type="password"
      placeholder="Enter Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      /> 
      <br/> 
      <button type="button" onClick={handleLogin}>
  Login
</button>
      <h2>Dont Have An Account?</h2>
      <button type="button" onClick={()=>navigate('/signup')}>SignUp</button>
    </div>
  );
}

export default Login;