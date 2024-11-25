// addEmployeeModal.tsx
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/modalStyles.css';

const AddEmployeeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [posicion, setPosicion] = useState('');
    const [phone, setPhone] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Generar el correo electrónico
        const email = `${nombre.charAt(0).toLowerCase()}${apellido.toLowerCase()}@talentevo.com`;
        const password = '123456';
        
        // Generar el user con la primera letra del nombre y el apellido
        const user = `${nombre.charAt(0)}${apellido}`.toLowerCase();

        try {
            // Crear el usuario en Firebase Authentication
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid; // Obtener el UID del usuario creado

            // Agregar el nuevo empleado a la colección 'empleados'
            const nuevoEmpleado = {
                nombre,
                apellido,
                posicion,
                phone,
                user, // Almacenar el user en el documento del empleado
                isAdmin, // Almacenar si es admin
                uid // Almacenar el UID del usuario
            };
            await addDoc(collection(db, 'empleados'), nuevoEmpleado);

            alert('Empleado agregado exitosamente');
            window.location.reload();
            onClose();
        } catch (error) {
            console.error('Error al agregar el empleado:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Agregar nuevo empleado</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <br />
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Apellido:
                        <br />
                        <input
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Ocupación:
                        <br />
                        <input
                            type="text"
                            value={posicion}
                            onChange={(e) => setPosicion(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Teléfono:
                        <br />
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Admin:
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={() => setIsAdmin(!isAdmin)}
                        />
                    </label>
                    <button type="submit">Agregar Empleado</button>
                </form>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
