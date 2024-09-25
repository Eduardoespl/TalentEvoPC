import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import {db} from '../firebase/config';

const useTotalVacancies = () => {
    const [totalVacancies, setTotalVacancies] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotalVacancies = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, 'empleados'));
                const querySnapshot = await getDocs(q);
                setTotalVacancies(querySnapshot.size);
            } catch (error) {
                console.error("Error fetching total vacancies: ", error);
            }
            setLoading(false);
        };

        fetchTotalVacancies();
    }, []);

    return { totalVacancies, loading };
};

export default useTotalVacancies;
