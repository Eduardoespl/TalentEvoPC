import CoursesChart from "./components/coursesChart";
import DataCard from "./components/dataCard";
import MonthCard from "./components/monthCard";
import CompletedCourses from "./components/completedCourses";
import {FaUserFriends, FaBriefcase, FaPhotoVideo} from 'react-icons/fa'; 
import './styles/dashboardStyles.css';
import useTotalEmployees from "./hooks/useTotalEmployees";
import useTotalVacancies from "./hooks/useTotalVacancies";
import useTotalCourses from "./hooks/useTotalCourses";

const Dashbord = () => {
    const { totalEmployees } = useTotalEmployees();
    const { totalVacancies } = useTotalVacancies();
    const { totalCourses } = useTotalCourses();

    return (
        <div className="dashboard-container">
            <div className="cards-container">
                <DataCard number={totalEmployees} label="Employees" icon={FaUserFriends}/>
                <DataCard number={totalCourses} label="Courses" icon={FaPhotoVideo}/>
                <DataCard number={totalVacancies} label="Vacancies" icon={FaBriefcase}/>
            </div>
            <div className="courses-container">
                <CompletedCourses/>
                <MonthCard/>
            </div>
            <CoursesChart />
        </div>
    );
}

export default Dashbord;