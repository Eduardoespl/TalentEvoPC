import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from './firebase/config'; // Asegúrate de importar tu configuración de Firebase

interface CourseVideoProps {
    courseId: string;
    classId: string;
}

const CourseVideo: React.FC<CourseVideoProps> = ({ courseId, classId }) => {
    const [courseTitle, setCourseTitle] = useState('');
    const [classTitle, setClassTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchCourseAndClass = async () => {
            try {
                // Obtener el título del curso
                const courseRef = doc(db, `cursos/${courseId}`);
                const courseSnap = await getDoc(courseRef);
                if (courseSnap.exists()) {
                    setCourseTitle(courseSnap.data().titulo); // Asegúrate de que el campo sea "title"
                }
                // Obtener el título de la clase y la URL del video
                const classRef = doc(db, `cursos/${courseId}/clases/${classId}`);
                const classSnap = await getDoc(classRef);
                if (classSnap.exists()) {
                    setClassTitle(classSnap.data().titulo); // Asegúrate de que el campo sea "title"
                    const videoPath = classSnap.data().url; // Ruta al video en Firebase Storage
                    // Obtener la URL de descarga del video desde Firebase Storage
                    const storage = getStorage();
                    const videoRef = ref(storage, videoPath);
                    const videoUrl = await getDownloadURL(videoRef);
                    setVideoUrl(videoUrl);
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchCourseAndClass();
    }, [courseId, classId]);

    return (
        <div>
            <h1>{courseTitle}</h1>
            <h2 style={{color:'white'}}>{classTitle}</h2>
            {videoUrl ? (
                <video controls width="700">
                    <source src={videoUrl} type="video/mp4" />
                    Tu navegador no soporta la reproducción de videos.
                </video>
            ) : (
                <p>Cargando video...</p>
            )}
        </div>
    );
};

export default CourseVideo;
