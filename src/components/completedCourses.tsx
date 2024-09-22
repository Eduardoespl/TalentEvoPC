const CompletedCourses = () => {

    return (
        <div style={styles.cardContainer}>
            <div style={styles.textContainer}>
                <h2 style={styles.title}>Courses completed this month</h2>
            </div>
            <div style={styles.wheelContainer}>
                <p style={styles.text}>45%</p>
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
        width: '660px',
        height: '160px',
        backgroundColor: '#29282F',
        borderRadius: '8px',
        boxShadow: '10px 10px 5px rgba(255, 255, 255, 0.10)',
    },
    title: {
        color: 'white',
        fontSize: '35px',
        textAlign: 'start',
        fontFamily: 'Montserrat, sans-serif',
    },
    wheelContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '10%',
        height: '100%',
    },
    text: {
        color: '#14E8EB',
        fontSize: '35px',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 'bold',
    },
    textContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        height: '100%',
    }
};

export default CompletedCourses;