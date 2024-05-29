// components/CompletedCourses.tsx
import React from 'react';
import useCompletedCourses from '../hooks/useCompletedCourses';
import CompletedCoursesCard from './completedCoursesCard';

const CompletedCourses: React.FC = () => {
    const { completedCourses, loading } = useCompletedCourses();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="completed-courses">
            <CompletedCoursesCard count={completedCourses} />
        </div>
    );
};

export default CompletedCourses;
