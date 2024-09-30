// useAuth.tsx
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
            // Intentar iniciar sesión con Firebase Authentication
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, user, password);
            const uid = userCredential.user.uid;

            // Obtener datos del usuario de Firestore
            const usersCollection = collection(db, 'empleados');
            const q = query(usersCollection, where('uid', '==', uid)); // Consulta basada en el uid
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setError('Usuario no encontrado en la base de datos');
                return;
            }

            const userData = querySnapshot.docs[0].data();

            // Navegación según el rol
            if (userData.isAdmin) {
                navigate('/main/dashboard');
            } else {
                navigate('/courses');
            }
        } catch (err) {
            console.error("Error en el login:", err);
            setError('Usuario o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return { login, error, loading };
};

export default useAuth;
