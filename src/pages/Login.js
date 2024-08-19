import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const { setUserData } = useAuthContext();

    const validateForm = () => {
        if (!form.email || !form.password) {
            toast.error("Email and password are required!");
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await axios.post('user/login', form);
            const { data } = response;
            setUserData(data.id);
            toast.success('Login successful!');
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (error) {
            const { data } = error.response;
            const { errors, message } = data;
            if (errors) {
                errors.forEach(err => {
                    toast.error(err.msg);
                });
                return;
            } else {
                toast.error(message || "An error occurred during login.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-full bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
