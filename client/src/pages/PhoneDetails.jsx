import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PhoneDetails() {
    const { phoneId } = useParams(); // Obtenemos el ID del parámetro de la URL
    const [phone, setPhone] = useState([]); // Estado para almacenar los detalles del teléfono

    useEffect(() => {
        // Hacemos la solicitud GET al servidor para obtener los detalles del teléfono con el ID específico
        // axios.get(`http://tu-servidor/api/phones/${id}`)
        axios.get(`${SERVER_URL}/phones/${phoneId}`)

            .then(response => {
                setPhone(response.data); // Almacenamos los detalles del teléfono en el estado
            })
            .catch(error => {
                console.error('Error fetching phone details:', error);
            });
    }, [phoneId]); // Ejecutamos este efecto cada vez que el ID cambia

    // Verificamos si estamos esperando los datos del teléfono
    if (!phone) {
        return <div>Cargando...</div>;
    }

    // Mostramos los detalles del teléfono
    return (
        <div>
            <h2>{phone.name}</h2>
            <p>Manufacturer: {phone.manufacturer}</p>
            <p>Description: {phone.description}</p>
            <p>Color: {phone.color}</p>
            <p>Price: ${phone.price}</p>
            <p>Screen: {phone.screen}</p>
            <p>Processor: {phone.processor}</p>
            <p>Ram: {phone.ram} GB</p>
            <img src={phone.imageFileName} alt={phone.name} />
        </div>
    );
}

export default PhoneDetails;






// function PhoneDetailsPage() {

//     const [phone, setPhone] = useState([]);
//     const { phoneId } = useParams();
//     const navigate = useNavigate();

//     const getPhone = () => {
//         axios
            // .get(`${SERVER_URL}/phones/${phoneId}`)
//             .then((response) => {
//                 console.log(response.data)
//                 setPhone(response.data)
//             })
//             .catch((error) => console.log(error));
//     }

//     useEffect(() => {
//         getPhone();
//     }, [phoneId]);

//     const getImage = (image) => `../assets/images/${image}`;

//     return(
//         <div className="container mt-4">
//             {phone && (
//                 <div className="card">
//                     <img src={getImage(phone.imageFileName)} alt={phone.name} />

//                     <div className="card-body">
//                         <h3>{phone.name}</h3>
//                         <p><strong>Manufacturer:</strong> {phone.manufacturer}</p>
//                         <p><strong>Description:</strong> {phone.description}</p>
//                         <p><strong>Color:</strong> {phone.color}</p>
//                         <p><strong>Price:</strong> ${phone.price}</p>
//                         <p><strong>Screen:</strong> {phone.screen}</p>
//                         <p><strong>Processor:</strong> {phone.processor}</p>
//                         <p><strong>RAM:</strong> {phone.ram}</p>
//                     </div>
//                     <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
//                 </div>    
//             )}
//         </div>
//     )
// }

// export default PhoneDetailsPage;