import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase/config";
import CourseCard from "./components/courseCard";

const CoursesEmployee = () => {
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesCollection = collection(db, "cursos");
            const q = query(coursesCollection, where("show", "==", true));
            const querySnapshot = await getDocs(q);
            const coursesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCourses(coursesList);
        };
        fetchCourses();
    }, []);

    return (
        <div>
            <h1>Mis Cursos</h1>
            <div>
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id} // Asegúrate de pasar el ID
                        titulo={course.title}
                        url={course.img}
                        lessons={course.lessons}
                        show={course.show}
                        isAdmin={false} // Cambia a true si el usuario es administrador
                        onToggleShow={() => { }} // Callback vacío si no es admin
                    />
                ))}
            </div>
        </div>
    );
};

export default CoursesEmployee;
