import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config'; // Importa la instancia de Firestore y Auth

interface Course {
  id: string;
  titulo: string;
  times: number;
}

const useCoursesData = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoursesData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'cursos'));
        const coursesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            titulo: data.titulo,
            times: data.times,
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
