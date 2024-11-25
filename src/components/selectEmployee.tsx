import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const SelectEmployee = ({ cursoId, vacancieId }: { cursoId: string, vacancieId: string }) => {
    const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]); // Estado para almacenar los empleados filtrados
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null); // Estado para el empleado seleccionado

    // Función para obtener los empleados cuyo campo "completos" incluye el cursoId
    const fetchEmployeesMatch = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'empleados'));
            const employeesData = querySnapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter((employee: any) =>
                    employee.completos?.includes(cursoId) // Filtrar empleados por el curso completado
                );
            setFilteredEmployees(employeesData); // Establecer los empleados filtrados
        } catch (error) {
            console.error('Error fetching employees data: ', error);
        }
    };

    // Ejecutar la función de fetch cuando el cursoId cambie
    useEffect(() => {
        fetchEmployeesMatch();
    }, [cursoId]);

    // Manejar el cambio de empleado seleccionado
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEmployee(event.target.value);
    };

    // Función para asignar el empleado a la vacante seleccionada
    const handleAssignEmployee = async () => {
        if (selectedEmployee) {
            try {
                // Actualiza la vacante con el empleado seleccionado
                const vacancieRef = doc(db, 'vacantes', vacancieId);
                await updateDoc(vacancieRef, {
                    empleado: selectedEmployee // Asignar el empleado a la vacante
                });
                alert('Empleado asignado a la vacante correctamente.');
                window.location.reload(); // Recargar la página para reflejar los cambios
            } catch (error) {
                console.error('Error asignando empleado:', error);
                alert('Hubo un problema al asignar el empleado.');
            }
        } else {
            alert('Por favor, selecciona un empleado.');
        }
    };

    return (
        <div>
            <select onChange={handleSelectChange} value={selectedEmployee || ''}>
                <option value="">Selecciona un empleado</option>
                {filteredEmployees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                        {`${employee.nombre} ${employee.apellido}`}
                    </option>
                ))}
            </select>
            <button onClick={handleAssignEmployee} disabled={!selectedEmployee}>
                Asignar empleado
            </button>
        </div>
    );
};

export default SelectEmployee;
