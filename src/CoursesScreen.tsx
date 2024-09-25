import { useState, useEffect } from 'react';
import CourseCard from './components/courseCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/config'; // Asegúrate de importar tu configuración de Firebase

const CoursesScreen = () => {
    interface Course {
        titulo: string;
        url: string;
        lessons: number;
    }

    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesRef = collection(db, 'cursos');
                const coursesSnapshot = await getDocs(coursesRef);
                const coursesData = coursesSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        titulo: data.titulo,
                        url: data.img,
                        lessons: data.lessons,
                    } as Course;
                });
                setCourses(coursesData);
                console.log(coursesData);
            } catch (error) {
                console.error('Error al obtener los cursos:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div style={styles.mainContainer}>
            <h1 style={styles.title}>Cursos</h1>
            <div style={styles.coursesContainer}>
                {courses.map((course, index) => (
                    <CourseCard
                        key={index} // Asegúrate de proporcionar una key única
                        titulo={course.titulo}
                        url={course.url}
                        lessons={course.lessons}
                    />
                ))}
            </div>
        </div>
    );
};

import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    coursesContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
    },
};

export default CoursesScreen;
