import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>The Ultimate Study Companion</h1>
      <p>Track your study sessions and boost your productivity with StudyFlow.</p>
      <button type="button" onClick={() => navigate('/study-tips')}>StudyTips</button>
      <button type="button" onClick={() => navigate('/features')}>Features</button>
    </div>
  );
}

export default Hero;