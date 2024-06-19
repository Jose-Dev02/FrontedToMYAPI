import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { urlCategoriesAll, urlWarehouseGetAll } from '../endpoints';

import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export const Tienda = () => {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);
    const [error, setError] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [selectValue, setSelectValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSelect = (e, categoriaId) => {
        if (selectValue !== categoriaId) {
            setSelectValue(categoriaId);
            console.log(categoriaId);
        }
    };

    useEffect(() => {
        const handleChargeData = async () => {
            try {
                const [responseCategories, responseWarehouse] = await Promise.all([
                    axios.get(urlCategoriesAll),
                    axios.get(urlWarehouseGetAll)
                ]);

                if (responseCategories.data.success) {
                    setCategorias(responseCategories.data.category);
                    setSelectValue(responseCategories.data.category[0]?.id || 1);
                } else {
                    setError(responseCategories.data.message);
                }

                if (responseWarehouse.data.success) {
                    setItem(responseWarehouse.data.warehouse);
                } else {
                    setError(responseWarehouse.data.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        handleChargeData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <div>
            <div>
                <Box sx={{ bgcolor: 'background.paper' }}>
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
                            <Tab
                                key={categoria.id}
                                label={categoria.name}
                                onClick={e => handleSelect(e, categoria.id)}
                            ></Tab>
                        ))}

                    </Tabs>
                </Box>
            </div>

            <div>
                <Box sx={{ flexGrow: 1, padding: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                maxWidth: '100%',
                                '@media (max-width:600px)': {
                                    maxWidth: 400,
                                },
                                '@media (min-width:600px)': {
                                    maxWidth: 400,
                                },
                                '@media (min-width:960px)': {
                                    maxWidth: 345,
                                },

                            }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>

                        </Grid>

                        {/* Agrega más tarjetas aquí */}
                    </Grid>
                </Box>


            </div >

        </div>

    );
}

