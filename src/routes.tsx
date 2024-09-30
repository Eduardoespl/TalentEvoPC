import Login from "./Login";
import Default from "./Default"; // Importa el nuevo layout
import Dashbord from './Dashboard';
import Vacancies from './Vacancies';
import EmployeeList from './components/employeeList';
import CoursesScreen from './CoursesScreen';
import CourseVideo from './Courses';
import CoursesEmployee from "./CoursesEmployee";

const routes = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/main",  // Todas las rutas dentro de "main" usarán el layout
        element: <Default />,  // Aquí usamos el layout que mantiene el menú lateral
        children: [
            { path: "dashboard", element: <Dashbord /> },
            { path: "employees", element: <EmployeeList /> },
            { path: "vacancies", element: <Vacancies /> },
            { path: "coursesScreen", element: <CoursesScreen /> },

        ],
    },
    {
        path: "/courses",
        element: <CoursesEmployee />
    },
    {
        path: "/course",
        element: <CourseVideo courseId='DkS5F29a5nVkyYhOEx5Z' classId='y9xDcRWBiyTkP4V3nQtW' />
    },
    
];

export default routes;
