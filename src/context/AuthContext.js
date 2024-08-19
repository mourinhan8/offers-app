import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';
import axios from '../utils/axios';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const response = await axios.get('/user/profile');
                setUserData(response.data.id);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserId();
    }, [])

    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext was used outside the Provider");
    return context;
}

export { AuthContextProvider, useAuthContext };