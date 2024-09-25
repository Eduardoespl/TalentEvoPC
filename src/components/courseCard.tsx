import React from "react";
import { RiStackLine } from "react-icons/ri";


interface CourseCardProps {
    titulo: string;
    url: string;
    lessons: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ titulo, url, lessons }) => {
    return (
        <div style={styles.mainContainer}>
            <div style={styles.imageContainer}>
                <img src={url} alt="course image" style={styles.image as React.CSSProperties} />
            </div>
            <div style={styles.courseDataContainer}>
                <h3 style={styles.titulo}>{titulo}</h3>
                <div style={styles.lessonsContainer}>
                    <RiStackLine color="#FF4173" size={35}/>
                    <p style={styles.lessons}> {lessons} lessons</p>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    mainContainer: {
        backgroundColor: '#D9D9D9',
        width: '288px',
        height: '300px',
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '259px',
        height: '170px',
        overflow: 'hidden',
        margin: 'auto',
        marginTop: '15px',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    titulo:{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '700',
        fontSize: '20px',
        textAlign: 'left',
    },
    lessons:{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '500',
        fontSize: '20px',
    },
    lessonsContainer:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '10px',
    },
    courseDataContainer:{
        marginLeft: '15px',
    },
};

export default CourseCard;
