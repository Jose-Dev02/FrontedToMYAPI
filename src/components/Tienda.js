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

import Tooltip from '@mui/material/Tooltip';
import { Favorite, ShoppingCart } from '@mui/icons-material';

export const Tienda = () => {
    const [state, setState] = useState({
        value: 0,
        loading: true,
        items: [],
        error: null,
        categories: [],
        selectedCategoryId: 1,
        filteredItems: [],
    });

    const handleChange = (event, newValue) => {
        setState((prevState) => ({
            ...prevState,
            value: newValue,
        }));
    };

    const filterItems = (items, categoryId) => items.filter((item) => item.product.categoryId === categoryId);

    const handleSelect = (e, categoryId) => {
        setState((prevState) => {
            if (prevState.selectedCategoryId !== categoryId) {
                return {
                    ...prevState,
                    selectedCategoryId: categoryId,
                    filteredItems: filterItems(prevState.items, categoryId),
                };
            }
            return prevState;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, warehouseResponse] = await Promise.all([
                    axios.get(urlCategoriesAll),
                    axios.get(urlWarehouseGetAll),
                ]);

                if (categoriesResponse.data.success && warehouseResponse.data.success) {
                    const categories = categoriesResponse.data.category;
                    const items = warehouseResponse.data.warehouse;
                    const selectedCategoryId = categories[0]?.id || 1;
                    const filteredItems = filterItems(items, selectedCategoryId);

                    setState({
                        value: 0,
                        loading: false,
                        items: items,
                        error: null,
                        categories: categories,
                        selectedCategoryId: selectedCategoryId,
                        filteredItems: filteredItems,
                    });

                } else {
                    let errors
                    errors.Add(categoriesResponse.data.message);
                    errors.Add(warehouseResponse.data.message);
                    setState((prevState) => {

                        return {
                            ...prevState,
                            loading: false,
                            error: errors,
                        }

                    });
                }
            } catch (error) {
                setState((prevState) => ({
                    ...prevState,
                    loading: false,
                    error: error.message,
                }));
            }
        };

        fetchData();
    }, []);

    if (state.loading) {
        return <div>Loading...</div>;
    }

    if (state.error) {
        return <div>Error: {state.error}</div>;
    }

    console.log(state.items);
    return (
        <div>
            <div>
                <Box sx={{ bgcolor: 'background.paper' }}>
                    <Tabs
                        value={state.value}
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
                        {state.categories.map((categoria) => (
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
                        {state.filteredItems.map((item) => (
                            <Grid item xs={12} sm={6} md={3} key={item.id}>
                                <Card sx={{
                                    maxWidth: '100%',
                                    '@media (max-width:600px)': {
                                        maxWidth: 345,
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
                                        alt={item.product.name}
                                        height="140"
                                        image={item.product.mediaURL}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {item.product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.primary" >
                                            {`${item.product.price}$`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Tooltip title='Favorito' >

                                            <Button size='small' sx={{ p: 0, color: '#fa4529', }}>

                                                <Favorite />

                                            </Button>

                                        </Tooltip>

                                        <Box sx={{ flexGrow: 1 }} />
                                        <Tooltip title='Agreagar al carrito' >

                                            <Button size='small' sx={{ p: 0, color: '#000', }}>

                                                <ShoppingCart />
                                            </Button>

                                        </Tooltip>
                                    </CardActions>
                                </Card>

                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div >
        </div>
    );
}

