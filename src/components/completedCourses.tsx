import useCompletedCourses from '../hooks/useCompletedCourses';

interface cardProps {
    totalCourses: number;
}

const CompletedCourses = ({totalCourses}:cardProps) => {
    const { completedCourses } = useCompletedCourses();

    function calculatePercentage(completedCourses: number) {
        return ((completedCourses / totalCourses) * 100).toFixed(0);
    }

    return (
        <div style={styles.cardContainer}>
            <div style={styles.textContainer}>
                <h2 style={styles.title}>Cursos completos este mes</h2>
            </div>
            <div style={styles.wheelContainer}>
                <p style={styles.text}>{calculatePercentage(completedCourses)} %</p>
            </div>
        </div>
    );
}

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
    }
};

export default CompletedCourses;