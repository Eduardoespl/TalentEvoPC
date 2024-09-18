import './styles/login.css';
import { useNavigate } from 'react-router-dom'; // Corrige el import de react-router-dom

function Login() {
  const navigate = useNavigate();

  const acceder = () => {
    navigate('/main');
  }

  return (
    <div className='main'>
      <h1 className='title'>
        Talent<span className='title title-contrast'>Evo</span>
      </h1>
      <div className='login'>
        <div className='form'>
          <p>Usuario</p>
          <input
            type='text'
            id='email'
            name='email'
          />
          <p>Contraseña</p>
          <input
            type='password'
            id='password'
            name='password'
          />
          <div>
            <button onClick={acceder}>Acceder</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
