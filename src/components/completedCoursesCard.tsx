// components/CompletedCoursesCard.tsx
import React from 'react';
import '../styles/completedCoursesStyles.css';

interface CompletedCoursesCardProps {
    count: number;
}

const CompletedCoursesCard: React.FC<CompletedCoursesCardProps> = ({ count }) => {
    return (
        <div className="completed-courses-card">
            <h3>Cursos Completados</h3>
            <p>{count}</p>
        </div>
    );
};

export default CompletedCoursesCard;
