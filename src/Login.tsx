// Login.tsx
import { useState } from 'react';
import useAuth from './hooks/useAuth'; // Ajusta la ruta de importación según tu estructura de carpetas

function Login() {
    const { login, error, loading } = useAuth();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await login(user+"@talentevo.com", password); // Espera la resolución de la promesa
    };

    return (
        <div style={styles.main}>
            <h1 style={styles.title}>
                Talent<span style={styles.titleContrast}>Evo</span>
            </h1>
            <div style={styles.login}>
                <div style={styles.form}>
                    <p style={styles.p}>Usuario</p>
                    <input
                        type='text'
                        id='user'
                        name='user'
                        style={styles.input}
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <p style={styles.p}>Contraseña</p>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div>
                        <button style={styles.button} onClick={handleLogin} disabled={loading}>
                            {loading ? 'Cargando...' : 'Acceder'}
                        </button>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </div>
    );
}

import { CSSProperties } from 'react';

// Aquí van los estilos...
const styles: { [key: string]: CSSProperties } = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#010104',
        padding: '2rem',
        maxWidth: '1280px',
        margin: '0 auto',
    },
    title: {
        fontSize: '68px',
        fontWeight: 900,
        fontFamily: 'Montserrat, sans-serif',
        color: '#fff',
    },
    titleContrast: {
        color: '#14E8EB',
    },
    login: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '315px',
        height: '472px',
        borderRadius: '15px',
        backgroundColor: '#29282f',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    button: {
        width: '210px',
        height: '58px',
        margin: '10px 0',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#FF824A',
        color: '#fff',
        fontSize: '20px',
        fontWeight: 700,
        fontFamily: 'Montserrat, sans-serif',
        cursor: 'pointer',
        marginTop: '100px',
    },
    p: {
        color: '#fff',
        fontSize: '20px',
        fontWeight: 900,
        fontFamily: 'Montserrat, sans-serif',
        textAlign: 'left',
    },
    input: {
        width: '250px',
        height: '54px',
        padding: '0 10px',
        border: 'none',
        borderRadius: '10px',
        fontSize: '18px',
    }
};

export default Login;
