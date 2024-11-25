import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, getDocs, collection, updateDoc, query, where, arrayUnion } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db, auth } from './firebase/config';
import { FaHome } from "react-icons/fa";
import LessonCard from './components/lessonCard';

interface Lesson {
    id: string;
    titulo: string;
    url: string;
}

const CourseVideo: React.FC = () => {
    const { courseId, classId } = useParams();
    const [userUid, setUserUid] = useState<string | null>(null); // UID del usuario autenticado
    const [courseTitle, setCourseTitle] = useState('');
    const [classTitle, setClassTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [lessons, setLessons] = useState<Lesson[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const user = auth.currentUser;
            if (user) {
                setUserUid(user.uid);
                console.log("Usuario autenticado:", user.uid);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                if (courseId) {
                    const courseRef = doc(db, `cursos/${courseId}`);
                    const courseSnap = await getDoc(courseRef);
                    if (courseSnap.exists()) {
                        setCourseTitle(courseSnap.data().titulo);
                    }

                    const lessonsRef = collection(db, `cursos/${courseId}/clases`);
                    const lessonsSnap = await getDocs(lessonsRef);
                    const fetchedLessons: Lesson[] = lessonsSnap.docs.map(doc => ({
                        id: doc.id,
                        titulo: doc.data().titulo,
                        url: doc.data().url,
                    }));
                    setLessons(fetchedLessons);
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchCourseData();
    }, [courseId]);

    useEffect(() => {
        const fetchVideoUrl = async () => {
            if (courseId && classId) {
                try {
                    setVideoUrl('');
                    setClassTitle('');
                    const classRef = doc(db, `cursos/${courseId}/clases/${classId}`);
                    const classSnap = await getDoc(classRef);
                    if (classSnap.exists()) {
                        setClassTitle(classSnap.data().titulo);
                        const videoPath = classSnap.data().url;
                        const storage = getStorage();
                        const videoRef = ref(storage, videoPath);
                        const videoUrl = await getDownloadURL(videoRef);
                        setVideoUrl(videoUrl);
                    }
                } catch (error) {
                    console.error('Error al obtener el video:', error);
                }
            }
        };

        fetchVideoUrl();
    }, [courseId, classId]);

    const handleGoHome = () => {
        navigate('/courses');
    };

    const currentIndex = lessons.findIndex(lesson => lesson.id === classId);

    useEffect(() => {
        const updateCourseProgress = async () => {
            if (userUid && courseId && lessons.length > 0) {
                try {
                    // Consulta para obtener el documento del empleado por UID
                    const employeesRef = collection(db, 'empleados');
                    const employeeQuery = query(employeesRef, where('uid', '==', userUid));
                    const querySnapshot = await getDocs(employeeQuery);
        
                    if (!querySnapshot.empty) {
                        const employeeDoc = querySnapshot.docs[0];
                        const employeeRef = doc(db, 'empleados', employeeDoc.id);
                        const employeeData = employeeDoc.data();
        
                        // Progresos actuales del empleado
                        const currentProgress = employeeData.progresos?.[courseId] || [];
        
                        // Actualización del progreso del curso
                        await updateDoc(employeeRef, {
                            [`progresos.${courseId}`]: arrayUnion(classId),
                        });
        
                        // Verificar si todas las lecciones están completadas
                        const updatedProgress = [...currentProgress, classId];
                        if (updatedProgress.length === lessons.length) {
                            // Obtener el mes actual
                            const currentMonth = new Date().toLocaleString("default", { month: "long" });
        
                            // Agregar el curso a "completos"
                            await updateDoc(employeeRef, {
                                completos: arrayUnion(courseId),
                            });
        
                            // Actualizar la colección "completos" con el mes y curso
                            const completeDocRef = doc(db, "completos", currentMonth);
                            const completeDocSnap = await getDoc(completeDocRef);
        
                            if (completeDocSnap.exists()) {
                                // Si ya existe un registro para este mes, actualiza la lista de cursos
                                await updateDoc(completeDocRef, {
                                    cursos: arrayUnion(courseId),
                                });
                            } else {
                                // Si no existe, crea un nuevo documento para este mes
                                await setDoc(completeDocRef, {
                                    mes: currentMonth,
                                    cursos: [courseId],
                                });
                            }
        
                            console.log(`Curso ${courseId} marcado como completo para el empleado.`);
                        } else {
                            console.log(`Clase ${classId} agregada al progreso del curso ${courseId}.`);
                        }
                    } else {
                        console.log("No se encontró un empleado con este UID.");
                    }
                } catch (error) {
                    console.error("Error al actualizar el progreso del curso:", error);
                }
            }
        };

        updateCourseProgress();
    }, [userUid, courseId, classId, lessons.length]);

    const handleNavigate = (direction: 'previous' | 'next') => {
        const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (newIndex >= 0 && newIndex < lessons.length) {
            const newClassId = lessons[newIndex].id;
            navigate(`/course/${courseId}/${newClassId}`);
        }
    };

    return (
        <div>
            <button style={{ backgroundColor: "transparent", cursor: "pointer", border: "none", position: "absolute", left: 50 }} onClick={handleGoHome}>
                <FaHome size={30} color='white' />
            </button>
            <h1>{courseTitle}</h1>
            <div>
                <progress value={currentIndex + 1} max={lessons.length} style={{ width: 800, margin: '20px auto' }} />
            </div>
            {videoUrl ? (
                <video controls width="700">
                    <source src={videoUrl} type="video/mp4" />
                    Tu navegador no soporta la reproducción de videos.
                </video>
            ) : (
                <p>Cargando video...</p>
            )}
            <h2 style={{ color: 'white', fontFamily: "sans-serif", textAlign: "left", marginLeft: 400 }}>{classTitle}</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: 800, margin: '20px auto' }}>
                <button style={{ backgroundColor: currentIndex >= 1 ? "#29282F" : "#858487", color: "white", border: "none", borderRadius: 8, width: 300, height: 50, cursor: currentIndex >= 1 ? "pointer" : "auto", fontWeight: 600, fontSize: 20 }} onClick={() => handleNavigate('previous')} disabled={currentIndex <= 0}>Anterior</button>
                <button
                    style={{
                        backgroundColor: "#29282F",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        width: 300,
                        height: 50,
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 20,
                    }}
                    onClick={() => {
                        if (currentIndex === lessons.length - 1) {
                            alert("Curso completado satisfactoriamente");
                            navigate("/courses");
                        } else {
                            handleNavigate("next");
                        }
                    }}
                >
                    {currentIndex === lessons.length - 1 ? "Terminar" : "Siguiente"}
                </button>
            </div>

            <div style={{ marginTop: '20px', justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", padding: 35, gap: 10 }}>
                {lessons.map((lesson) => (
                    <LessonCard key={lesson.id} id={courseId!} classID={lesson.id} title={lesson.titulo} />
                ))}
            </div>
        </div>
    );
};

export default CourseVideo;
