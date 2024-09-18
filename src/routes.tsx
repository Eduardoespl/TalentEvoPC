import Login from "./Login";
import Default from "./Default";

const routes = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/main",
        element: <Default />,
    },
];

export default routes;
