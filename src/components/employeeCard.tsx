import '../styles/employeeCardStyle.css';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import useEmpleados from '../hooks/useEmpleados';

const EmployeeCard = () => {
    const { empleados, loading } = useEmpleados();

    if (loading) {
        return <p>Cargando empleados...</p>; // Muestra un mensaje mientras se cargan los empleados
    }

    return (
        <>
            {empleados.map((empleado) => (
                <div className="employee-card" key={empleado.id}>
                    <p className="employee-name">{`${empleado.nombre} ${empleado.apellido}`}</p>
                    <p className="employee-data">{empleado.posicion}</p>
                    <p className="employee-data">{empleado.phone}</p>
                    <p className="employee-data">{empleado.user}</p>
                    <div className='icon-container'>
                        <FaEdit className='icon edit' />
                        <p style={{ fontSize: '40px', color: 'white', opacity: '0.5' }}>|</p>
                        <FaRegTrashAlt className='icon trash' />
                    </div>
                </div>
            ))}
        </>
    );
};

export default EmployeeCard;
