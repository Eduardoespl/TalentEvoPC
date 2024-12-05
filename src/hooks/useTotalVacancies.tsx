import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const useTotalVacancies = () => {
    const [totalVacancies, setTotalVacancies] = useState(0);
    const [coveredVacancies, setCoveredVacancies] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVacanciesData = async () => {
            setLoading(true);
            try {
                // Query to get all vacancies
                const allVacanciesQuery = query(collection(db, 'vacantes'));
                const allVacanciesSnapshot = await getDocs(allVacanciesQuery);
                setTotalVacancies(allVacanciesSnapshot.size);

                // Query to get covered vacancies (empleado not empty)
                const coveredVacanciesQuery = query(
                    collection(db, 'vacantes'),
                    where('empleado', '!=', '')
                );
                const coveredVacanciesSnapshot = await getDocs(coveredVacanciesQuery);
                setCoveredVacancies(coveredVacanciesSnapshot.size);
            } catch (error) {
                console.error("Error fetching vacancies data: ", error);
            }
            setLoading(false);
        };

        fetchVacanciesData();
    }, []);

    return { totalVacancies, coveredVacancies, loading };
};

export default useTotalVacancies;
