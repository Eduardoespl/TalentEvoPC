import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import {db} from '../firebase/config';

const useTotalCourses = () => {
    const [totalCourses, setTotalCourses] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotalCourses = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, 'cursos'));
                const querySnapshot = await getDocs(q);
                setTotalCourses(querySnapshot.size);
            } catch (error) {
                console.error("Error fetching total courses: ", error);
            }
            setLoading(false);
        };

        fetchTotalCourses();
    }, []);

    return { totalCourses, loading };
};

export default useTotalCourses;
