import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "./firebase/config";
import CourseCard from "./components/courseCard";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";

const CoursesEmployee = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [subscribedCourses, setSubscribedCourses] = useState<any[]>([]);
    const [notSubscribedCourses, setNotSubscribedCourses] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("myCourses"); // Controla la pestaña activa
    const [userData, setUserData] = useState<any>(null); // Guarda la info del usuario
    const [userUid, setUserUid] = useState<string | null>(null); // UID del usuario autenticado
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controla si se muestra la tarjeta emergente
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const user = auth.currentUser;
            if (user) {
                setUserUid(user.uid);
                console.log("Usuario autenticado:", user.uid);
                const userDoc = await getDocs(query(collection(db, "users"), where("uid", "==", user.uid)));
                const userData = userDoc.docs[0]?.data();
                setUserData(userDoc);
                console.log("Datos del usuario:", userData);
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
            const subscribedCourse = notSubscribedCourses.find(course => course.id === courseId);
            if (subscribedCourse) {
                setSubscribedCourses([...subscribedCourses, subscribedCourse]);
                setNotSubscribedCourses(notSubscribedCourses.filter(course => course.id !== courseId));
            }
        } else {
            const notSubscribedCourse = subscribedCourses.find(course => course.id === courseId);
            if (notSubscribedCourse) {
                setNotSubscribedCourses([...notSubscribedCourses, notSubscribedCourse]);
                setSubscribedCourses(subscribedCourses.filter(course => course.id !== courseId));
            }
        }
    };

    const renderCourses = (courseList: any[]) => {
        return (
            <div style={styles.mainContainer}>
                {courseList.length > 0 ? (
                    courseList.map((course) => (
                        <CourseCard
                            key={course.id}
                            classId="1"
                            id={course.id}
                            titulo={course.titulo}
                            url={course.img}
                            lessons={course.lessons}
                            show={course.show}
                            isAdmin={false}
                            subscribedUsers={course.subscribed || []}
                            onSubscribeChange={handleSubscribeChange}
                            onToggleShow={() => {}}
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
            <div style={styles.header}>
                <div style={styles.buttonContainer}>
                    <button
                        style={{
                            ...styles.button,
                            borderBottom: activeTab === "myCourses" ? "3px solid #14E8EB" : "none"
                        }}
                        onClick={() => setActiveTab("myCourses")}
                    >
                        <p style={styles.buttonLabel}>Mis Cursos</p>
                    </button>
                    <span style={{ fontSize: "30px", fontWeight: "700", color: "#fff" }}>|</span>
                    <button
                        style={{
                            ...styles.button,
                            borderBottom: activeTab === "availableCourses" ? "3px solid #14E8EB" : "none"
                        }}
                        onClick={() => setActiveTab("availableCourses")}
                    >
                        <p style={styles.buttonLabel}>Colección</p>
                    </button>
                </div>

                {/* Icono de usuario */}
                <div style={styles.userIconContainer}>
                    <FaUserCircle size={40} color="#fff" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ cursor: "pointer" }} />
                    
                    {isDropdownOpen && (
                        <div style={styles.dropdownCard}>
                            {userData ? (
                                <div>
                                    <p style={styles.userName}>{userData.nombre} {userData.apellido}</p>
                                    <button style={styles.logoutButton} onClick={handleLogout}>Cerrar Sesión</button>
                                </div>
                            ) : (
                                <p>Cargando datos...</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {activeTab === "myCourses" ? renderCourses(subscribedCourses) : renderCourses(notSubscribedCourses)}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    mainContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "25px",
    },
    button: {
        backgroundColor: "transparent",
        color: "#FFFFFF",
        border: "none",
        cursor: "pointer",
        fontFamily: 'Montserrat, sans-serif',
        marginTop: "15px",
        paddingBottom: "10px",
    },
    buttonContainer: {
        marginBottom: "30px",
        borderBottom: "1px solid #667A8A",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: "25px",
        alignItems: "center",
        textAlign: "center",
    },
    buttonLabel: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: "20px",
        fontWeight: 700,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userIconContainer: {
        position: "relative",
    },
    dropdownCard: {
        position: "absolute",
        top: "50px",
        right: "0",
        backgroundColor: "#fff",
        padding: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        zIndex: 1000,
    },
    userName: {
        marginBottom: "10px",
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#E74C3C",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        fontFamily: 'Montserrat, sans-serif',
    }
};

export default CoursesEmployee;
