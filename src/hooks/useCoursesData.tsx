import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config'; // Importa la instancia de Firestore y Auth

interface MonthlyData {
    mes: string;
    total: number;
}

const useCoursesData = () => {
    const [courses, setCourses] = useState<MonthlyData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoursesData = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'completos'));
                const monthlyData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        mes: data.mes,
                        total: data.cursos?.length || 0,
                    };
                });
                setCourses(monthlyData);
            } catch (error) {
                console.error("Error fetching courses data: ", error);
            }
            setLoading(false);
        };

        fetchCoursesData();
    }, []);

    return { courses, loading };
};

export default useCoursesData;
