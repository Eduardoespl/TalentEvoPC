import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase/config";
import CourseCard from "./components/courseCard";

const CoursesScreen = () => {
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesCollection = collection(db, "cursos");
            const querySnapshot = await getDocs(coursesCollection);
            const coursesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCourses(coursesList);
        };
        fetchCourses();
    }, []);

    const toggleShow = async (courseId: string, currentShow: boolean) => {
        const courseRef = doc(db, "cursos", courseId);
        await updateDoc(courseRef, {
            show: !currentShow,
        });
        setCourses(courses.map(course => course.id === courseId ? { ...course, show: !currentShow } : course));
    };

    return (
        <div>
            <h1>Cursos</h1>
            <div style={styles.mainContainer}>
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        titulo={course.titulo}
                        url={course.img}
                        lessons={course.lessons}
                        show={course.show}
                        isAdmin={true} // Administradores pueden ver el botón
                        onToggleShow={() => toggleShow(course.id, course.show)}
                        onSubscribeChange={() => { /* Add your handler logic here */ }}
                    />
                ))}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    mainContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
};

export default CoursesScreen;
