import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/config'; // Importa solo lo que necesitas
import './styles/App.css';
import image from './assets/office.jpg';
import { useNavigate } from 'react-router-dom'; // Corrige el import de react-router-dom

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso');
      navigate('/dashboard'); // Navega al dashboard
    } catch (error: any) {
      setError(error.message || "Error al iniciar sesión");
    }
  };

  const handleLink = () => {
    navigate('/register');
  }

  return (
    <div className='main'>
      <h1 className='title'>
        Talent<span className='title title-contrast'>Evo</span>
      </h1>
      <div className='login'>
        <form onSubmit={handleLogin}>
          <p>Correo electrónico</p>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            name='email'
            placeholder='Correo electrónico'
          />
          <p>Contraseña</p>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id='password'
            name='password'
            placeholder='Contraseña'
          />
          <a onClick={handleLink} href='#'>No tengo una cuenta</a>
          <button type='submit'>Iniciar sesión</button>
          {error && <p>{error}</p>}
        </form>
        <div className='image-container'>
          <img src={image} alt='office' />
        </div>
      </div>
    </div>
  );
}

export default Login;
