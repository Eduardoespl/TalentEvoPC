import '../styles/employeeCardStyle.css';
import { FaRegTrashAlt } from 'react-icons/fa';
import useEmpleados from '../hooks/useEmpleados';
import { db } from '../firebase/config'; // Importa tu configuración de Firebase
import { doc, deleteDoc } from 'firebase/firestore';

const EmployeeCard = () => {
    const { empleados, loading } = useEmpleados();

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("¿Estás seguro de que deseas eliminar este empleado?");
        if (confirm) {
            try {
                await deleteDoc(doc(db, "empleados", id));
                alert("Empleado eliminado correctamente.");
                
                // Refresca la página para obtener la lista actualizada
                window.location.reload();
            } catch (error) {
                console.error("Error eliminando empleado:", error);
                alert("Hubo un problema al eliminar el empleado.");
            }
        }
    };

    if (loading) {
        return <p>Cargando empleados...</p>;
    }

    return (
        <>
            {empleados.map((empleado) => (
                <div className="employee-card" key={empleado.id}>
                    <p className="employee-name">{`${empleado.nombre} ${empleado.apellido}`}</p>
                    <p className="employee-data">{empleado.posicion}</p>
                    <p className="employee-data">{empleado.phone}</p>
                    <p className="employee-data">{empleado.user}</p>
                    <div className="icon-container">
                        <p style={{ fontSize: '40px', color: 'white', opacity: '0.5' }}>|</p>
                        <FaRegTrashAlt
                            className="icon trash"
                            onClick={() => handleDelete(empleado.id)}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default EmployeeCard;
