import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { urlWarehouseGetAll } from '../endpoints';

export const Warehouse = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                // axios.defaults.withCredentials = true; // Configuración global de Axios
                const response = await axios.get(urlWarehouseGetAll);
                setWarehouses(response.data);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error en la solicitud', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWarehouses();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Warehouses</h1>
            <ul>
                {warehouses.map((warehouse, index) => (
                    <li key={index}>{warehouse.name}</li>
                ))}
            </ul>
        </div>
    );
};
