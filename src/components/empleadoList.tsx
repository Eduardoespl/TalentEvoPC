// components/VacantesList.tsx
import React from 'react';
import useEmpleados from '../hooks/useEmpleados';
import EmpleadoCard from './empleadoCard';

const EmpleadosList: React.FC = () => {
    const { empleados, loading } = useEmpleados();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="vacantes-list">
            <h2>Empleados</h2>
            {empleados.map(empleado => (
                <EmpleadoCard
                    key={empleado.id}
                    nombre={empleado.nombre}
                    apellido={empleado.apellido}
                    posicion={empleado.posicion}
                />
            ))}
        </div>
    );
};

export default EmpleadosList;
