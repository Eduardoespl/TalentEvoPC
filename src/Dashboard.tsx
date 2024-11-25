import CoursesChart from "./components/coursesChart";
import DataCard from "./components/dataCard";
import CompletedCourses from "./components/completedCourses";
import { FaUserFriends, FaBriefcase, FaPhotoVideo } from "react-icons/fa";
import "./styles/dashboardStyles.css";
import useTotalEmployees from "./hooks/useTotalEmployees";
import useTotalVacancies from "./hooks/useTotalVacancies";
import useTotalCourses from "./hooks/useTotalCourses";
import { useState, useEffect } from "react";
import { db } from "./firebase/config"; // Asegúrate de configurar correctamente Firebase
import { doc, setDoc, getDoc } from "firebase/firestore";

const Dashboard = () => {
    const { totalEmployees } = useTotalEmployees();
    const { totalVacancies } = useTotalVacancies();
    const { totalCourses } = useTotalCourses();
    const [metaCursos, setMetaCursos] = useState(0);
    const [buttonVisible, setButtonVisible] = useState(true);

    const month = new Date().toLocaleString("es-ES", { month: "long" });

    // Cargar meta del mes actual desde Firestore al montar el componente
    useEffect(() => {
        const fetchMeta = async () => {
            const docRef = doc(db, "completos", month);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setMetaCursos(docSnap.data().meta);
                setButtonVisible(false); // Ocultar botón si ya hay meta para este mes
            }
        };

        fetchMeta();
    }, [month]);

    function defineMetaCursos() {
        let value = Number(prompt("Inserta la meta de cursos a completar este mes"));
        if (!isNaN(value) && value >= 0) {
            const metaData = { mes: month, meta: value };

            // Guardar en Firestore
            setDoc(doc(db, "completos", month), metaData)
                .then(() => {
                    setMetaCursos(value); // Actualizar estado local
                    setButtonVisible(false); // Ocultar botón después de guardar
                    alert("Meta guardada correctamente.");
                    window.location.reload(); // Recargar la página para reflejar los cambios
                })
                .catch((error) => {
                    console.error("Error al guardar la meta:", error);
                    alert("Hubo un error al guardar la meta.");
                });
        } else {
            alert("Por favor, ingresa un número válido.");
        }
    }

    return (
        <div className="dashboard-container">
            <div className="cards-container">
                <DataCard number={totalEmployees} label="Employees" icon={FaUserFriends} />
                <DataCard number={totalCourses} label="Courses" icon={FaPhotoVideo} />
                <DataCard number={totalVacancies} label="Vacancies" icon={FaBriefcase} />
            </div>
            <div className="courses-container">
                <CompletedCourses totalCourses={metaCursos} />
            </div>
            {buttonVisible && (
                <button
                    onClick={defineMetaCursos}
                    style={{ cursor: "pointer", padding: 10, borderRadius: 8, margin: -25 }}
                >
                    Definir meta de cursos completos
                </button>
            )}
            <CoursesChart />
        </div>
    );
};

export default Dashboard;
