import {useNavigate} from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
        <h1>StudyFlow</h1>
        <button type="button" onClick={() => navigate('/signup')}>Get Started</button>
        <button type="button" onClick={() => navigate('/login')}>Login</button>
    </nav>
  );
}

export default Navbar;