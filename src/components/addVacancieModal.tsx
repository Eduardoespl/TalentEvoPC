import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/modalStyles.css';

const AddVacancieModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [titulo, setTitulo] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nuevaVacante = {
            titulo,
        };

        try {
            await addDoc(collection(db, 'vacantes'), nuevaVacante);

            alert('Vacante agregada exitosamente');
            onClose();
        } catch (error) {
            console.error('Error al agregar la vacante:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Agregar nueva vacante</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Titulo:
                        <br></br> 
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Agregar Vacante</button>
                </form>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default AddVacancieModal;
