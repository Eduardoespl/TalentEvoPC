import Login from "./Login";
import Default from "./Default";
import CourseVideo from "./Courses";

const routes = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/main",
        element: <Default />,
    },
    {
        path: "/courses",
        element: <CourseVideo courseId='DkS5F29a5nVkyYhOEx5Z' classId='y9xDcRWBiyTkP4V3nQtW'/>,
    }
];

export default routes;
