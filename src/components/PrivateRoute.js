import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function PrivateRoute() {
    const { userData } = useAuthContext();
    return userData ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
