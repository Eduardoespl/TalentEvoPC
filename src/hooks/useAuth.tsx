import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const login = async (user: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, where('user', '==', user), where('password', '==', password));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setError('Usuario o contraseña incorrectos');
                setLoading(false);
                return;
            }

            const userData = querySnapshot.docs[0].data();

            // Guardar la información del usuario en localStorage
            localStorage.setItem('user', JSON.stringify({
                user: userData.user,
                admin: userData.admin,
            }));

            // Si el usuario es administrador
            if (userData.admin) {
                navigate('/main/dashboard');
            } else {
                // Si el usuario es normal
                navigate('/courses');
            }
        } catch (err) {
            console.error("Error en el login:", err);
            setError('Error en el inicio de sesión');
        } finally {
            setLoading(false);
        }
    };

    return { login, error, loading };
};

export default useAuth;
