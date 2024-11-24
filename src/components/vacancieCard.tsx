import '../styles/employeeCardStyle.css';
import { FaRegTrashAlt } from 'react-icons/fa';
import useVacantes from '../hooks/useVacantes';
import { db } from '../firebase/config'; // Importa la configuración de Firebase
import { doc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';
import SelectEmployee from './selectEmployee';

const VacancieCard = () => {
    const { vacantes, loading } = useVacantes();
    const [selectedVacancieId, setSelectedVacancieId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta vacante?");
        if (confirm) {
            try {
                await deleteDoc(doc(db, "vacantes", id));
                alert("Vacante eliminada correctamente.");
            } catch (error) {
                console.error("Error eliminando vacante:", error);
                alert("Hubo un problema al eliminar la vacante.");
            }
        }
    };

    const toggleSelectEmployee = (vacancieId: string) => {
        setSelectedVacancieId(selectedVacancieId === vacancieId ? null : vacancieId);
    };

    if (loading) {
        return <p>Cargando vacantes...</p>;
    }

    return (
        <>
            {vacantes.map((vacante) => (
                <div key={vacante.id}>
                    <div className="employee-card" onClick={() => toggleSelectEmployee(vacante.id)}>
                        <p className="employee-name">{vacante.titulo}</p>
                        <div className="icon-container">
                            <p style={{ fontSize: '40px', color: 'white', opacity: '0.5' }}>|</p>
                            <FaRegTrashAlt
                                className="icon trash"
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita abrir el selector al eliminar
                                    handleDelete(vacante.id);
                                }}
                            />
                        </div>
                    </div>
                    {selectedVacancieId === vacante.id && (
                        <SelectEmployee cursoId={vacante.curso} />
                    )}
                </div>
            ))}
        </>
    );
};

export default VacancieCard;
