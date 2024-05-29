// components/VacanteCard.tsx
import React from 'react';
import '../styles/vacancyStyles.css'
import { FaTrash } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";

interface EmpleadoCardProps {
    nombre: string;
    apellido: string;
    posicion: string;
    // Otros campos según la estructura de tu colección 'vacantes'
}

const EmpleadoCard: React.FC<EmpleadoCardProps> = ({ nombre, apellido, posicion }) => {
    return (
        <div className="vacante-card">
            <div>
                <h3>{nombre} {apellido}</h3>
                <p>Posición: {posicion}</p>
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

export default EmpleadoCard;
