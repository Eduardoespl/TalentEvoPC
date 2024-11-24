import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const SelectEmployee = ({ cursoId }: { cursoId: string }) => {
    const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);

    const fetchEmployeesMatch = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'empleados'));
            const employeesData = querySnapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter((employee: any) =>
                    employee.completos?.includes(cursoId) // Filtrar por curso completado
                );
            setFilteredEmployees(employeesData);
        } catch (error) {
            console.error('Error fetching employees data: ', error);
        }
    };

    useEffect(() => {
        fetchEmployeesMatch();
    }, [cursoId]);

    return (
        <div>
            <select>
                {filteredEmployees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                        {`${employee.nombre} ${employee.apellido}`}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectEmployee;
