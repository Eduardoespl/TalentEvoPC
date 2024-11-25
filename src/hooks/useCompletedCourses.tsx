// hooks/useCompletedCourses.ts
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {db} from '../firebase/config';

const useCompletedCourses = () => {
    const [completedCourses, setCompletedCourses] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompletedCourses = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, 'completos');
                const querySnapshot = await getDocs(q);
                setCompletedCourses(querySnapshot.size);
            } catch (error) {
                console.error("Error fetching completed courses: ", error);
            }
            setLoading(false);
        };

        fetchCompletedCourses();
    }, []);

    return { completedCourses, loading };
};

export default useCompletedCourses;
