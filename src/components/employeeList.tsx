import { useState } from 'react';
import EmployeeCard from './employeeCard';
import AddEmployeeModal from './addEmployeeModal';
import '../styles/employeeCardStyle.css';

const EmployeeList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <button className="add-button" onClick={openModal}>
                Agregar empleado
            </button>
            <div className="list-title">
                <p>Empleado</p>
                <p>Ocupación</p>
                <p>Telefono</p>
                <p>Usuario</p>
                <p>Administrar</p>
            </div>
            <div className="list-container">
                <EmployeeCard />
            </div>

            {/* Modal para agregar empleado */}
            <AddEmployeeModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default EmployeeList;
