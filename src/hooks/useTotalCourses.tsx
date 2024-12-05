import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const useTotalCourses = () => {
    const [totalCourses, setTotalCourses] = useState(0);
    const [activeCourses, setActiveCourses] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoursesData = async () => {
            setLoading(true);
            try {
                // Query to get all courses
                const allCoursesQuery = query(collection(db, 'cursos'));
                const allCoursesSnapshot = await getDocs(allCoursesQuery);
                setTotalCourses(allCoursesSnapshot.size);

                // Query to get only active courses (show: true)
                const activeCoursesQuery = query(
                    collection(db, 'cursos'),
                    where('show', '==', true)
                );
                const activeCoursesSnapshot = await getDocs(activeCoursesQuery);
                setActiveCourses(activeCoursesSnapshot.size);
            } catch (error) {
                console.error("Error fetching courses data: ", error);
            }
            setLoading(false);
        };

        fetchCoursesData();
    }, []);

    return { totalCourses, activeCourses, loading };
};

export default useTotalCourses;