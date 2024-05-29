// components/PopularCourse.tsx
import React from 'react';
import usePopularCourse from '../hooks/usePopularCourse';
import PopularCourseCard from './popularCourseCard';
import '../styles/popularStyles.css'

const PopularCourse: React.FC = () => {
    const { popularCourse, loading } = usePopularCourse();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!popularCourse) {
        return <p>No popular course found.</p>;
    }

    return (
        <div className="popular-course">
            <PopularCourseCard
                titulo={popularCourse.titulo}
                description={popularCourse.description}
                skills={popularCourse.skills}
            />
        </div>
    );
};

export default PopularCourse;
