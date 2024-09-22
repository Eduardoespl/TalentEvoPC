import CoursesChart from "./components/coursesChart";
import DataCard from "./components/dataCard";
import MonthCard from "./components/monthCard";
import CompletedCourses from "./components/completedCourses";
import {FaUserFriends, FaBriefcase, FaPhotoVideo} from 'react-icons/fa'; 
import './styles/dashboardStyles.css';

const Dashbord = () => {
    return (
        <div className="dashboard-container">
            <div className="cards-container">
                <DataCard number={8} label="Employees" icon={FaUserFriends}/>
                <DataCard number={3} label="Courses" icon={FaPhotoVideo}/>
                <DataCard number={2} label="Vacancies" icon={FaBriefcase}/>
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