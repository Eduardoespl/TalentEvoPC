import React, { useState } from "react";
import { RiStackLine } from "react-icons/ri";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../firebase/config"; // Importa la autenticación para obtener el usuario actual

interface CourseCardProps {
    id: string; // ID del curso
    titulo: string;
    url: string;
    lessons: number;
    show: boolean;
    isAdmin: boolean;
    subscribedUsers?: string[];
    onToggleShow: () => void;
    onSubscribeChange: (id: string, isSubscribed: boolean) => void; // Nueva prop para manejar el cambio de suscripción
}

const CourseCard: React.FC<CourseCardProps> = ({ id, titulo, url, lessons, show, isAdmin, subscribedUsers = [], onToggleShow, onSubscribeChange }) => {
    const [isSubscribed, setIsSubscribed] = useState(subscribedUsers.includes(auth.currentUser?.uid || ""));

    const handleSubscribeToggle = async () => {
        const userId = auth.currentUser?.uid;

        // Verifica si hay un usuario autenticado
        if (!userId) {
            alert("Por favor, inicia sesión para suscribirte a este curso.");
            return;
        }

        const courseRef = doc(db, "cursos", id);

        try {
            if (isSubscribed) {
                await updateDoc(courseRef, {
                    subscribed: arrayRemove(userId),
                });
                console.log("Usuario eliminado de la suscripción");
                onSubscribeChange(id, false); // Actualiza la lista de cursos
            } else {
                await updateDoc(courseRef, {
                    subscribed: arrayUnion(userId),
                });
                console.log("Usuario añadido a la suscripción");
                onSubscribeChange(id, true); // Actualiza la lista de cursos
            }
            setIsSubscribed(!isSubscribed);
        } catch (error) {
            console.error("Error al actualizar la suscripción:", error);
        }
    };

    return (
        <div style={styles.mainContainer}>
            <div style={styles.imageContainer}>
                <img src={url} alt="course image" style={styles.image as React.CSSProperties} />
            </div>
            <div style={styles.courseDataContainer}>
                <h3 style={styles.titulo}>{titulo}</h3>
                <div style={styles.lessonsContainer}>
                    <RiStackLine color="#FF4173" size={35} />
                    <p style={styles.lessons}> {lessons} lecciones</p>
                </div>
                {isAdmin ? (
                    <button onClick={onToggleShow}>
                        {show ? "Quitar" : "Agregar"}
                    </button>
                ) : (
                    <button onClick={handleSubscribeToggle}>
                        {isSubscribed ? "Desuscribir" : "Suscribir"}
                    </button>
                )}
            </div>
        </div>
    );
};

// Estilos se mantienen igual
const styles: { [key: string]: React.CSSProperties } = {
    mainContainer: {
        backgroundColor: "#D9D9D9",
        width: "288px",
        height: "300px",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    imageContainer: {
        width: "259px",
        height: "170px",
        overflow: "hidden",
        margin: "auto",
        marginTop: "15px",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    titulo: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
        fontSize: "20px",
        textAlign: "left",
    },
    lessons: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "500",
        fontSize: "20px",
    },
    lessonsContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginTop: "10px",
        gap: "10px",
    },
    courseDataContainer: {
        marginLeft: "15px",
    },
};

export default CourseCard;
