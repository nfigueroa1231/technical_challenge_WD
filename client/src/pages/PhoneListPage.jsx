import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SERVER_URL = 'http://localhost:4000';

function PhoneListPage() {

    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(false); //for the spinner component

    const getAllPhones = () => {
        setLoading(true)
        axios
            .get(`${SERVER_URL}/phones`)
            .then((response) => {
                setPhones(response.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            });
    }

    useEffect(() => {
        getAllPhones();
    }, []);

    const getImages = (image) => `../assets/images/${image}`;

    return (
        <div className="container mt-3">
            <h1 className="mb-4">List of Phones</h1>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="row">
                    {phones &&
                        phones.map((phone, index) => (
                            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                                <div className="card h-100">
                                    <Link to={`/phones/${phone.id}`}>
                                        <img src={getImages(phone.imageFileName)} className="card-img-top" alt={phone.name} style={{ maxHeight: '200px' }} />
                                    </Link>

                                    <div className="card-body">
                                        <h5 className="card-title">{phone.name}</h5>
                                        <p className="card-text"><strong>Manufacturer:</strong> {phone.manufacturer}</p>
                                        <p className="card-text"><strong>Price:</strong> ${phone.price}</p>
                                    </div>

                                    <div className="card-footer">
                                        <Link to={`/phones/${phone.id}`} className="btn btn-primary">
                                            View phone details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
};

export default PhoneListPage;
