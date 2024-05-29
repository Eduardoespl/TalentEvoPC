// components/PopularCourseCard.tsx
import React from 'react';
import '../styles/popularStyles.css';

interface PopularCourseCardProps {
    titulo: string;
    description: string;
    skills: string;
}

const PopularCourseCard: React.FC<PopularCourseCardProps> = ({ titulo, description, skills }) => {
    return (
        <div className="popular-course-card">
            <h3>{titulo}</h3>
            <p>{description}</p>
            <h4>Skills:</h4>
            <p>{skills}</p>
        </div>
    );
};

export default PopularCourseCard;
