import React from 'react';

function obtenerMesActual(): string {
    const meses: string[] = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const fechaActual: Date = new Date();
    const mesActual: number = fechaActual.getMonth();
    return meses[mesActual];
}

const MonthCard: React.FC = () => {
    const mesActual = obtenerMesActual();

    return (
        <div style={styles.container}>
            <h1>{mesActual}</h1>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        height: '160px',
        backgroundColor: '#29282F',
        borderRadius: '8px',
        boxShadow: '10px 10px 5px rgba(255, 255, 255, 0.10)',
    }
};

export default MonthCard;
