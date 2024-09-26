import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config'; // Importa la instancia de Firestore y Auth

interface Course {
  id: string;
  mes: string;
  total: number;
}

const useCoursesData = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoursesData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'completos'));
        const coursesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            mes: data.mes,
            total: data.total,
          } as Course;
        });
        setCourses(coursesData);
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
