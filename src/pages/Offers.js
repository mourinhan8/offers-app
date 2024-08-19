import { useEffect, useState } from 'react';

function Offers() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách offers
        // Ví dụ giả lập dữ liệu:
        const dummyOffers = [
            {
                id: 1,
                title: 'Summer Sale',
                description: 'Get 50% off on all items',
                discountPercentage: 50,
                originalPrice: 100,
                discountedPrice: 50,
            },
            // Thêm các offer khác
        ];
        setOffers(dummyOffers);
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Available Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {offers.map(offer => (
                    <div key={offer.id} className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                        <p className="text-gray-700 mb-2">{offer.description}</p>
                        <p className="text-gray-700 mb-2">Discount: {offer.discountPercentage}%</p>
                        <p className="text-gray-700 mb-2">Original Price: ${offer.originalPrice}</p>
                        <p className="text-gray-700 mb-4">Discounted Price: ${offer.discountedPrice}</p>
                        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Buy Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Offers;
