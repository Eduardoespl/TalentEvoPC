import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/modalStyles.css';

const AddEmployeeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [posicion, setPosicion] = useState('');
    const [phone, setPhone] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = `${nombre.charAt(0)}${apellido}`.toLowerCase();

        const nuevoEmpleado = {
            nombre,
            apellido,
            posicion,
            phone,
            user
        };

        try {
            await addDoc(collection(db, 'empleados'), nuevoEmpleado);

            await addDoc(collection(db, 'users'), {
                user,
                password: '123',
                admin: isAdmin
            });

            alert('Empleado agregado exitosamente');
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
                        <br></br> 
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Apellido:
                        <br></br>
                        <input
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Ocupación:
                        <br></br>
                        <input
                            type="text"
                            value={posicion}
                            onChange={(e) => setPosicion(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Teléfono:
                        <br></br>
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
