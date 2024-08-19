import { useEffect, useState } from 'react';
import axios from '../utils/axios';

function Admin() {
    const [offers, setOffers] = useState([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        discountPercentage: '',
        originalPrice: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentOfferId, setCurrentOfferId] = useState(null);

    useEffect(() => {
        // Gọi API để lấy danh sách offers
        const fetchMyOffers = async () => {
            try {
                const response = await axios.get('/offer/my-offers');
                setOffers(response.data.data);
            } catch (error) {
                console.error(error);
            }

        }
        fetchMyOffers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            // Gọi API để cập nhật offer
        } else {
            // Gọi API để tạo mới offer
        }
        // Reset form
        setForm({
            title: '',
            description: '',
            discountPercentage: '',
            originalPrice: '',
        });
        setIsEditing(false);
        setCurrentOfferId(null);
    };

    const handleEdit = (offer) => {
        setForm({
            title: offer.title,
            description: offer.description,
            discountPercentage: offer.discountPercentage,
            originalPrice: offer.originalPrice,
        });
        setIsEditing(true);
        setCurrentOfferId(offer.id);
    };

    const handleDelete = (id) => {
        // Gọi API để xóa offer
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel</h2>
            <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
                <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Offer' : 'Add Offer'}</h3>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Discount Percentage</label>
                    <input
                        type="number"
                        name="discountPercentage"
                        value={form.discountPercentage}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Original Price</label>
                    <input
                        type="number"
                        name="originalPrice"
                        value={form.originalPrice}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    {isEditing ? 'Update Offer' : 'Add Offer'}
                </button>
            </form>

            <h3 className="text-2xl font-bold mb-4">My Offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {offers.map(offer => (
                    <div key={offer.id} className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                        <p className="text-gray-700 mb-2">{offer.description}</p>
                        <p className="text-gray-700 mb-2">Discount: {offer.discountPercentage}%</p>
                        <p className="text-gray-700 mb-2">Original Price: ${offer.originalPrice}</p>
                        <p className="text-gray-700 mb-4">Discounted Price: ${offer.discountedPrice}</p>
                        <div className="flex justify-between">
                            <button onClick={() => handleEdit(offer)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
                            <button onClick={() => handleDelete(offer.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;
