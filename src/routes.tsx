import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

const routes = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    }
];

export default routes;
