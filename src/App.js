import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Offers from './pages/Offers';
import Admin from './pages/Admin';
import PrivateRoute from './components/PrivateRoute';
import PublicStrictRoute from './components/PublicStrictRoute';
import NotFound from './pages/NotFound';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div className='h-screen'>
      <AuthContextProvider>
        <Navbar />
        <div className='pt-14 h-full'>
          <Routes>
            <Route path="/" element={<Offers />} />
            <Route element={<PublicStrictRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

      </AuthContextProvider>
    </div>
  );
}

export default App;
