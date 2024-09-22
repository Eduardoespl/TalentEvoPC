import Dashbord from './Dashboard';
import './styles/navStyles.css';
import EmployeeList from './components/employeeList';
import { FaHome, FaUserFriends, FaSignOutAlt, FaBriefcase, FaPhotoVideo} from 'react-icons/fa';

const Default = () => {
  return (
    <div className="main-container">
      <div className="nav-container">
        <h1>Talent<span>Evo</span></h1>
        <div className="nav">
          <ul>
            <li className="card selected">
              <FaHome/>
              <a href="#">Dashboard</a>
            </li>
            <li className="card">
              <FaUserFriends/>
              <a href="#">Employees</a>
            </li>
            <li className="card">
              <FaBriefcase/>
              <a href="#">Vacancies</a>
            </li>
            <li className="card">
              <FaPhotoVideo/>
              <a href="#">Courses</a>
            </li>
          </ul>
        </div>
        <div className="logout-button">
          <button><FaSignOutAlt color='black'/> Log out</button>
        </div>
      </div>
      <div className="tab-container">
        {/* <Dashbord /> */}
        <EmployeeList />
      </div>
    </div>
  );
}

export default Default;