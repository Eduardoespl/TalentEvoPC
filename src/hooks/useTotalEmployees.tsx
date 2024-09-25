import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import {db} from '../firebase/config';

const useTotalEmployees = () => {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotalEmployees = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, 'empleados'));
                const querySnapshot = await getDocs(q);
                setTotalEmployees(querySnapshot.size);
            } catch (error) {
                console.error("Error fetching total employees: ", error);
            }
            setLoading(false);
        };

        fetchTotalEmployees();
    }, []);

    return { totalEmployees, loading };
};

export default useTotalEmployees;
