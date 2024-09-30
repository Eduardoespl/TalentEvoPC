import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore imports
import { db, auth } from "./firebase/config"; // Firebase config import
import CourseCard from "./components/courseCard";
import { useNavigate } from "react-router-dom"; // Navigation import
import { signOut } from "firebase/auth"; // Auth import for logout

const CoursesEmployee = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [subscribedCourses, setSubscribedCourses] = useState<any[]>([]);
    const [notSubscribedCourses, setNotSubscribedCourses] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("myCourses"); // Controla la pestaña activa
    const navigate = useNavigate();
    const [userUid, setUserUid] = useState<string | null>(null); // UID del usuario autenticado

    useEffect(() => {
        const fetchUser = async () => {
            const user = auth.currentUser;
            if (user) {
                setUserUid(user.uid); // Almacena el UID del usuario autenticado
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesCollection = collection(db, "cursos");
            const q = query(coursesCollection, where("show", "==", true)); // Filtra cursos visibles
            const querySnapshot = await getDocs(q);
            const coursesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCourses(coursesList); // Guardamos todos los cursos
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (userUid) {
            const subscribed = courses.filter(course =>
                course.subscribed && course.subscribed.includes(userUid)
            );
            const notSubscribed = courses.filter(course =>
                !course.subscribed || !course.subscribed.includes(userUid)
            );

            setSubscribedCourses(subscribed); // Cursos suscritos
            setNotSubscribedCourses(notSubscribed); // Cursos no suscritos
        }
    }, [courses, userUid]);

    const handleLogout = async () => {
        try {
            await signOut(auth); // Cierra la sesión
            console.log("Usuario deslogueado");
            navigate('/'); // Redirige a la página principal
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const handleSubscribeChange = (courseId: string, isSubscribed: boolean) => {
        if (isSubscribed) {
            // Mueve el curso de no suscritos a suscritos
            const subscribedCourse = notSubscribedCourses.find(course => course.id === courseId);
            if (subscribedCourse) {
                setSubscribedCourses([...subscribedCourses, subscribedCourse]);
                setNotSubscribedCourses(notSubscribedCourses.filter(course => course.id !== courseId));
            }
        } else {
            // Mueve el curso de suscritos a no suscritos
            const notSubscribedCourse = subscribedCourses.find(course => course.id === courseId);
            if (notSubscribedCourse) {
                setNotSubscribedCourses([...notSubscribedCourses, notSubscribedCourse]);
                setSubscribedCourses(subscribedCourses.filter(course => course.id !== courseId));
            }
        }
    };

    const renderCourses = (courseList: any[]) => {
        return (
            <div>
                {courseList.length > 0 ? (
                    courseList.map((course) => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            titulo={course.title}
                            url={course.img}
                            lessons={course.lessons}
                            show={course.show}
                            isAdmin={false}
                            subscribedUsers={course.subscribed || []}
                            onSubscribeChange={handleSubscribeChange} // Pasamos la función para manejar el cambio de suscripción
                            onToggleShow={() => { }} // No se usa para empleados
                        />
                    ))
                ) : (
                    <p>No hay cursos disponibles.</p>
                )}
            </div>
        );
    };

    return (
        <div>
            <div>
                <button onClick={() => setActiveTab("myCourses")}>Mis Cursos</button>
                <button onClick={() => setActiveTab("availableCourses")}>Colección de Cursos</button>
            </div>
            {activeTab === "myCourses" ? renderCourses(subscribedCourses) : renderCourses(notSubscribedCourses)}
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default CoursesEmployee;
