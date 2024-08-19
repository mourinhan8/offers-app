import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function Navbar() {
    const { userData, setUserData } = useAuthContext();
    const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem('token');
    }
    return (
        <nav className="bg-blue-600 p-4 fixed w-full">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-white text-xl font-bold">OfferApp</Link>
                <div>
                    {userData ? (
                        <>
                            <Link to="/admin" className="text-white mr-4">Admin</Link>
                            <button onClick={handleLogout} className="text-white">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white mr-4">Login</Link>
                            <Link to="/register" className="text-white">Register</Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
