import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUserFriends, FaBriefcase, FaPhotoVideo, FaSignOutAlt } from 'react-icons/fa';
import { auth } from './firebase/config'; // Asegúrate de que la ruta sea correcta
import { signOut } from 'firebase/auth'; // Importa la función signOut de Firebase
import './styles/navStyles.css';

const Default = () => {
  const navigate = useNavigate(); // Hook para la navegación

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión
      console.log("Usuario deslogueado");
      navigate('/'); // Redirige a la página principal
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

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
          <button onClick={handleLogout}><FaSignOutAlt color='black' /> Log out</button>
        </div>
      </div>
      <div className="tab-container">
        <Outlet />
      </div>
    </div>
  );
}

export default Default;
