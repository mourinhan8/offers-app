import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PublicStrictRoute = () => {
    const { userData } = useAuthContext();

    return userData ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicStrictRoute;