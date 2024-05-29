import VacantesList from "./components/vacancyList";
import EmpleadosList from "./components/empleadoList";
import CompletedCourses from "./components/completedCourses";
import PopularCourse from "./components/PopularCourse";
import CoursesChart from "./components/coursesChart";
import './styles/dashboardStyles.css';
import { useNavigate } from "react-router-dom";
import { auth } from './firebase/config';
import { signOut } from 'firebase/auth';

function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirige al usuario a la página de inicio de sesión
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };
    return (
        <div>
            <div className="nav-container">
                <h1>Dashboard</h1>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="list-container">
                <div className="top-container">
                    <CompletedCourses />
                    <PopularCourse />
                </div>
                <h2>Numero de vistas por curso</h2>
                <CoursesChart />
                <div className="bottom-container">
                    <VacantesList />
                    <EmpleadosList />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;