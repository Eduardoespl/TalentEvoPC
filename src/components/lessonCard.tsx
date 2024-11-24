import React from 'react';
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

interface LessonCardProps {
    id: string;
    classID: string;
    title: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ id, classID, title }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/course/${id}/${classID}`);
    };

    return (
        <div>
            <div style={{ backgroundColor: "#29282F", width: "600px", display: "flex", alignItems: "center", height: "65px", borderRadius: "8px", cursor: "pointer", paddingLeft:15}}
                onClick={handleClick}>
                <h2 style={{ color: "white", fontFamily:"sans-serif", fontSize:20 }}>{title}</h2>
                <div style={{ display:"flex", marginLeft:"auto", marginRight:20}}>
                    <FaPlayCircle size={30} color="#FF824A" />
                </div>
            </div>
        </div>
    );
};

export default LessonCard;
