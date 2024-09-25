import '../styles/employeeCardStyle.css';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import useVacantes from '../hooks/useVacantes';

const VacancieCard = () => {
    const { vacantes, loading } = useVacantes();

    if (loading) {
        return <p>Cargando vacantes...</p>; // Muestra un mensaje mientras se cargan las vacantes
    }

    return (
        <>
            {vacantes.map((vacante) => (
                <div className="employee-card">
                    <p className="employee-name">{vacante.titulo}</p>
                    <div className='icon-container'>
                        <FaEdit className='icon edit' />
                        <p style={{ fontSize: '40px', color: 'white', opacity: '0.5' }}>|</p>
                        <FaRegTrashAlt className='icon trash' />
                    </div>
                </div>
            ))}
        </>
    )
}

export default VacancieCard;