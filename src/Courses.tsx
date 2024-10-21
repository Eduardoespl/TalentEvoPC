import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook para obtener los parámetros de la URL
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from './firebase/config';

const CourseVideo: React.FC = () => {
    const { courseId, classId } = useParams(); // Obtenemos courseId y classId de la URL
    const [courseTitle, setCourseTitle] = useState('');
    const [classTitle, setClassTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchCourseAndClass = async () => {
            try {
                if (courseId && classId) {
                    // Obtenemos el título del curso
                    const courseRef = doc(db, `cursos/${courseId}`);
                    const courseSnap = await getDoc(courseRef);
                    if (courseSnap.exists()) {
                        setCourseTitle(courseSnap.data().titulo); // Ajusta el campo según tu estructura
                    }
                    
                    // Obtenemos la clase de la subcolección 'clases'
                    const classRef = doc(db, `cursos/${courseId}/clases/${classId}`);
                    const classSnap = await getDoc(classRef);
                    if (classSnap.exists()) {
                        setClassTitle(classSnap.data().titulo); // Ajusta el campo según tu estructura
                        const videoPath = classSnap.data().url;  // Supongo que tienes un campo 'url' en la clase
                        
                        // Obtenemos la URL del video desde Firebase Storage
                        const storage = getStorage();
                        const videoRef = ref(storage, videoPath);
                        const videoUrl = await getDownloadURL(videoRef);
                        setVideoUrl(videoUrl);
                    } else {
                        console.error('No se encontró la clase');
                    }
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
