import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { urlCategoriesAll, urlWarehouseGetAll } from '../endpoints';

import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export const Tienda = () => {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);
    const [error, setError] = useState(null);
    const [categorias, setCategorias] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const handleChargeCategories = async () => {
            try {
                const responseCategories = await axios.get(urlCategoriesAll);
                if (responseCategories.data.success) {
                    setCategorias(responseCategories.data.category);
                    console.log(responseCategories.data.category);
                }
                else {
                    setError(responseCategories.data.message);
                    console.log(responseCategories)
                }

            }
            catch (error) {
                console.log(error);
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        handleChargeCategories();
    }, [])

    useEffect(() => {
        const handleChargeWarehouse = async () => {

            try {
                const responseWarehouse = await axios.get(urlWarehouseGetAll);

                if (responseWarehouse.data.success) {
                    setItem(responseWarehouse.data.warehouse);
                    console.log(responseWarehouse.data.warehouse);
                }
                else {
                    setError(responseWarehouse.data.message);
                    console.log(responseWarehouse);
                }
            }
            catch (error) {
                console.log(error);
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }

        handleChargeWarehouse();
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <div>
            <Box sx={{ /*maxWidth: { xs: 320, sm: 480, lg: 1280 },*/ bgcolor: 'background.paper' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.2 },
                        },
                    }}

                >
                    {categorias.map((categoria) => (
                        <Tab key={categoria.id} label={categoria.name}></Tab>
                    ))}

                </Tabs>
            </Box>
        </div>
    );
}

