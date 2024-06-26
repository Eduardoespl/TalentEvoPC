// components/CoursesChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import useCoursesData from '../hooks/useCoursesData';
import '../styles/dashboardStyles.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const CoursesChart: React.FC = () => {
    const { courses, loading } = useCoursesData();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!courses.length) {
        return <p>No data available</p>;
    }

    const labels = courses.map(course => course.titulo);
    const dataValues = courses.map(course => course.times);

    const data = {
        type: 'line',
        labels: labels,
        datasets: [
            {
                label: 'Times Viewed',
                data: dataValues,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
            },
        ],
    };

    console.log('Chart data:', data); // Verificar los datos del gráfico
    return (
        <div className="courses-chart">
            <Line data={data} />
        </div>
    );
};

export default CoursesChart;
