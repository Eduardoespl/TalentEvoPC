import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import useCoursesData from '../hooks/useCoursesData';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const CoursesChart: React.FC = () => {
    const { courses, loading } = useCoursesData();

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!courses.length) {
        return <p>Sin información disponible</p>;
    }

    const labels = courses.map(course => course.mes);
    const dataValues = courses.map(course => course.total);

    const data = {
        type: 'line',
        labels: labels,
        datasets: [
            {
                label: 'Cursos completados este mes',
                data: dataValues,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div style={styles.coursesChart}>
            <Line data={data} />
        </div>
    );
};

const styles = {
    coursesChart: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60rem',
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '1rem',
    }
};

export default CoursesChart;
