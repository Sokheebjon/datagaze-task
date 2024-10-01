import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import useAuth from "@/hooks/useAuth.ts";
import {Layout} from "@/containers";
import loadable from "@/utils/loadable.tsx";


const NotFound = loadable(() => import('./NotFound'));
const Login = loadable(() => import('./Login'));
const Dashboard = loadable(() => import('./Dashboard'));

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const isAuth = useAuth();
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};


export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RequireAuth>
                <Layout />
            </RequireAuth>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            }
        ]
        // errorElement: <Navigate to="/404" replace />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);