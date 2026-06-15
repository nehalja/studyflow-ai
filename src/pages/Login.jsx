import {useState} from 'react';
import{useNavigate} from 'react-router-dom';
function Login() {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();
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
      <button type="button">Login</button>
      <h2>Dont Have An Account?</h2>
      <button type="button" onClick={()=>navigate('/signup')}>SignUp</button>
    </div>
  );
}

export default Login;