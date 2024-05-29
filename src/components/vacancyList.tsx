// components/VacantesList.tsx
import React from 'react';
import useVacantes from '../hooks/useVacantes';
import VacanteCard from './vacancyCard';

const VacantesList: React.FC = () => {
    const { vacantes, loading } = useVacantes();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="vacantes-list">
            <h2>Vacantes</h2>
            {vacantes.map(vacante => (
                <VacanteCard
                    key={vacante.id}
                    titulo={vacante.titulo}
                    skills={vacante.skills}
                />
            ))}
        </div>
    );
};

export default VacantesList;
