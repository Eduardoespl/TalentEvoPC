import useCoursesData from '../hooks/useCoursesData';

interface CardProps {
    totalCourses: number;
}

const CompletedCourses = ({ totalCourses }: CardProps) => {
    const { courses, loading } = useCoursesData();

    // Obtener el mes actual en formato de texto completo (ej: "noviembre")
    const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });

    // Filtrar los cursos completados del mes actual
    const currentMonthCourses = courses.filter(course => course.mes.toLowerCase() === currentMonth.toLowerCase());

    // Sumar los cursos completados en el mes actual
    const totalCompletedThisMonth = currentMonthCourses.reduce((sum, course) => sum + course.total, 0);

    // Calcular el porcentaje de cursos completados en el mes actual
    function calculatePercentage(completed: number) {
        if (totalCourses === 0) return 0; // Evitar divisiones por 0
        return ((completed / totalCourses) * 100).toFixed(0);
    }

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    return (
        <div style={styles.cardContainer}>
            <div style={styles.textContainer}>
                <h2 style={styles.title}>Cursos completos este mes</h2>
            </div>
            <div style={styles.wheelContainer}>
                <p style={styles.text}>{calculatePercentage(totalCompletedThisMonth)} %</p>
            </div>
        </div>
    );
};

import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
    cardContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '1000px',
        height: '160px',
        backgroundColor: '#29282F',
        borderRadius: '8px',
        boxShadow: '10px 10px 5px rgba(255, 255, 255, 0.10)',
    },
    title: {
        color: 'white',
        fontSize: '45px',
        textAlign: 'start',
        fontFamily: 'Montserrat, sans-serif',
    },
    wheelContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: '100%',
    },
    text: {
        color: '#14E8EB',
        fontSize: '80px',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        height: '100%',
    },
};

export default CompletedCourses;
