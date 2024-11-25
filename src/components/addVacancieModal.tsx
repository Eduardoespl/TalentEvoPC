import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/modalStyles.css';

const AddVacancieModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [titulo, setTitulo] = useState('');
    const [empleado] = useState('');
    const [cursoId, setCursoId] = useState<string>(''); // Estado para el curso seleccionado
    const [cursos, setCursos] = useState<any[]>([]); // Estado para almacenar los cursos disponibles

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'cursos')); // Obtén los cursos de Firestore
                const cursosData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCursos(cursosData); // Almacena los cursos en el estado
            } catch (error) {
                console.error('Error al obtener cursos:', error);
            }
        };

        fetchCursos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Crear la nueva vacante con el curso seleccionado
        const nuevaVacante = {
            titulo,
            empleado,
            curso: cursoId, // Asignar el curso seleccionado
        };

        try {
            await addDoc(collection(db, 'vacantes'), nuevaVacante); // Agregar la vacante a Firestore
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
                        <br />
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Curso:
                        <br />
                        <select
                            value={cursoId}
                            onChange={(e) => setCursoId(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un curso</option>
                            {cursos.map((curso) => (
                                <option key={curso.id} value={curso.id}>
                                    {curso.titulo} {/* Aquí mostramos el título del curso */}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button type="submit">Agregar Vacante</button>
                </form>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default AddVacancieModal;
