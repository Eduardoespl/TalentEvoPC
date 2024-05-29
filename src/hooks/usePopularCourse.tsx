// hooks/usePopularCourse.ts
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import {db} from '../firebase/config';

interface Course {
  id: string;
  titulo: string;
  description: string;
  skills: string;
  times: number;
}

const usePopularCourse = () => {
  const [popularCourse, setPopularCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularCourse = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'cursos'), orderBy('times', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);
            const courseData = querySnapshot.docs[0]?.data() as Course;
            if (courseData) {
                const { id, ...rest } = courseData;
                setPopularCourse({ id: querySnapshot.docs[0].id, ...rest });
            }
        } catch (error) {
            console.error("Error fetching popular course: ", error);
        }
        setLoading(false);
    };

    fetchPopularCourse();
  }, []);

  return { popularCourse, loading };
};

export default usePopularCourse;
