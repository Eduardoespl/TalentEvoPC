import './styles/App.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as firebase from './firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import image from './assets/office.jpg'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(firebase.auth, email, password);
            navigate('/');
        } catch (error: any) {
            setError(error.message || "Error al registrarse");
        }
    };

    return (
        <div className='main'>
            <h1 className='title'>Talent<span className='title title-contrast'>Evo</span></h1>
            <div className='login'>
                <form onSubmit={handleRegister}>
                    <p>Correo</p>
                    <input
                        type='email'
                        id='emailR'
                        name='emailR'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Correo'
                    />
                    <p>Contraseña</p>
                    <input
                        type='password'
                        id='passwordR'
                        name='passwordR'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Contraseña'
                    />
                    <button type='submit'>Registrarse</button>
                    {error && <p>{error}</p>}
                </form>
                <div className='image-container'>
                    <img src={image} alt='office' />
                </div>
            </div>
        </div>
    )
}

export default Login
