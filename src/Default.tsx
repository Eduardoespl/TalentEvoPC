import { Outlet, NavLink } from 'react-router-dom';
import { FaHome, FaUserFriends, FaBriefcase, FaPhotoVideo, FaSignOutAlt } from 'react-icons/fa';
import './styles/navStyles.css';

const Default = () => {
  return (
    <div className="main-container">
      <div className="nav-container">
        <h1>Talent<span>Evo</span></h1>
        <div className="nav">
          <ul>
            <li className="card">
              <NavLink
                to="dashboard"
                className={({ isActive }) => (isActive ? 'active' : 'card')}
              >
                <FaHome />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li className="card">
              <NavLink
                to="employees"
                className={({ isActive }) => (isActive ? 'active' : 'card')}
              >
                <FaUserFriends />
                <p>Employees</p>
              </NavLink>
            </li>
            <li className="card">

              <NavLink
                to="vacancies"
                className={({ isActive }) => (isActive ? 'active' : 'card')}
              >
                <FaBriefcase />
                <p>Vacancies</p>
              </NavLink>
            </li>
            <li className="card">
              <NavLink
                to="coursesScreen"
                className={({ isActive }) => (isActive ? 'active' : 'card')}
              >
                <FaPhotoVideo />
                <p>Courses</p>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="logout-button">
          <button><FaSignOutAlt color='black' /> Log out</button>
        </div>
      </div>
      <div className="tab-container">
        <Outlet /> {/* Aquí se mostrarán las rutas hijas */}
      </div>
    </div>
  );
}

export default Default;
