import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardList = () => {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const limit = 10; // Number of cards per page

    const fetchCards = async (page) => {
        setLoading(true); // Set loading state
        setError(null); // Reset error state
        try {
            const response = await axios.get(`http://localhost:8080/api/user/cards?page=${page}&limit=${limit}`);
            setCards(response.data.response.cards); // Set cards from the response
            setTotalPages(response.data.totalPages); // Set total pages from the response
            setCurrentPage(page); // Update current page
        } catch (err) {
            console.error('Error fetching cards:', err);
            setError('Failed to fetch cards.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        fetchCards(currentPage); // Fetch cards when component mounts or currentPage changes
    }, [currentPage]);

    return (
        <div>
            <h1>Card List</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="card-container">
                {cards.map((card) => (
                    <div key={card._id} className="card">
                        <h2>{card.name}</h2>
                        {/* <p>{card.description}</p> */}
                        <div className='row p-2'>

                            <p className='col'>Name:</p>
                            <p className='col'>{card.name}</p>
                        </div>
                        <div className='row p-2'>
                            <p className='col'>JobTitle:</p>
                            <p className='col'>{card.jobTitle}</p>
                        </div>
                        <div className='row p-2'>
                            <p className='col'>CompanyName:</p>
                            <p className='col'>{card.companyName}</p>
                        </div>
                        <div className='row p-2'>
                            <p className='col'>EmailAddress:</p>
                            <p className='col'>{card.emailAddress}</p>
                        </div>
                        <div className='row p-2'>
                            <p className='col'>PhoneNumber:</p>
                            <p className='col'>{card.phoneNumber}</p>
                        </div>
                        <div className='row p-2'>
                            <p className='col'>Address:</p>
                            <p className='col'> {card.address}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        disabled={currentPage === index + 1} // Disable the button for the current page
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CardList;
