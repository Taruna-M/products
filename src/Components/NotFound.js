import './_error.scss';
import { useNavigate } from 'react-router-dom';

function NotFound() {
const navigate = useNavigate();
  return (
    <div className='error'>
      <div className="noise"></div>
      <div className="overlay"></div>
      <div className="terminal">
        <h1>Error <span className="errorcode">404</span></h1>
        <p className="output">You are an unauthorised user!</p>
        <p className="output">Please return to <button onClick={()=>navigate('/')}>login</button> or <button onClick={()=>navigate('/signUp')}>sign up</button>.</p>
        <p className="output">Good luck.</p>
      </div>
    </div>
  );
}

export default NotFound;
