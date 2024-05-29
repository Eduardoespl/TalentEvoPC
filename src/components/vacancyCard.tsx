// components/VacanteCard.tsx
import React from 'react';
import '../styles/vacancyStyles.css'
import { FaTrash } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";

interface VacanteCardProps {
    titulo: string;
    skills: string;
    // Otros campos según la estructura de tu colección 'vacantes'
}

const VacanteCard: React.FC<VacanteCardProps> = ({ titulo, skills }) => {
    return (
        <div className="vacante-card">
            <div>
                <h3>{titulo}</h3>
                <p>Skills: {skills}</p>
            </div>
            {/* Otros campos que quieras mostrar */}
            <div className='btn-container'>
                <button className='btn-eliinar'>
                    <FaTrash size={15} color='white'/>
                </button>
                <button id='btn-detalles'>
                    <TbListDetails size={15} color='white'/>
                </button>
            </div>
        </div>
    );
};

export default VacanteCard;
