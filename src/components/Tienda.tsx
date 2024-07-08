import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { urlCategoriesAll, urlWarehouseGetAll } from '../endpoints.tsx';

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
import { AddShoppingCart, Favorite, FavoriteBorder, Check } from '@mui/icons-material';
import { ICartItem } from './interface/ICartItem';
import { IItem } from './interface/IItem';
import { ICategory } from './interface/ICategory';

interface TiendaProps {
    carrito: ICartItem[];
    setCarrito: React.Dispatch<React.SetStateAction<ICartItem[]>>;
    SLS: (carrito: ICartItem[]) => void; // Función para guardar en localStorage
    //GFLS: () => ICartItem[]; // Función para obtener del localStorage
}

export const Tienda: React.FC<TiendaProps> = ({ carrito, setCarrito, SLS }) => {
    const [state, setState] = useState({
        value: 0,
        loading: true,
        favoriteItems: {} as Record<number, boolean>,
        items: [] as IItem[], 
        error: null as string | null,
        categories: [] as ICategory[], 
        selectedCategoryId: 1,
        filteredItems: [] as IItem[], 
    });


    const filterItems = (items: IItem[], categoryId: number) => items.filter((item) => item.product.categoryId === categoryId);

    const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
        setState((prevState) => ({
            ...prevState,
            value: newValue,
        }));
    };

    const handleSelect = (e: React.MouseEvent<{}>, categoryId: number) => {
        setState((prevState) => {
            if (prevState.selectedCategoryId !== categoryId) {
                return {
                    ...prevState,
                    selectedCategoryId: categoryId,
                    filteredItems: filterItems(prevState.items, categoryId),
                };
            }
            return prevState;
        })
    };

    const handleClick = (itemId: number) => {
        setState((prevState) => ({
            ...prevState,
            favoriteItems: {
                ...prevState.favoriteItems,
                [itemId]: !prevState.favoriteItems[itemId],
            },
        }));
    };

    const handleCartClick = (item: IItem) => {

        setCarrito((prevCarrito) => {
            const isInCart = prevCarrito.find((cartItem) => cartItem.item.id === item.id);
            let localCarrito: ICartItem[] = [];
            if (isInCart) {
                localCarrito = prevCarrito.filter((cartItem) => cartItem.item.id !== item.id);
                SLS(localCarrito);
               return localCarrito;
            } else {
                localCarrito = [...prevCarrito, { item, quantity: 1 }];
                SLS(localCarrito);
                return localCarrito;
            }
            
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
                        favoriteItems: {},
                        items: items,
                        error: null,
                        categories: categories,
                        selectedCategoryId: selectedCategoryId,
                        filteredItems: filteredItems,
                    });

                } else {
                    let errors: string[] = [];
                    errors.push(categoriesResponse.data.message);
                    errors.push(warehouseResponse.data.message);
                    setState((prevState) => ({
                        ...prevState,
                        loading: false,
                        error: errors.join(', '),
                    }));
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

    return (
        <div>
            <div>
                <Box sx={{ bgcolor: 'background.paper', boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2), -1px 1px 3px rgba(0, 0, 0, 0.2)' }}>
                    <Tabs
                        value={state.value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                '&.Mui-disabled': { opacity: 0.3 },
                                
                            },
                            '& .MuiTabs-indicator': {
                                  backgroundColor: '#fa4529',
                                },
                        }}
                    >
                        {state.categories.map((categoria) => (
                            <Tab
                            sx={{'&:hover':{
                                    backgroundColor: '#ffddf4'
                                },
                                
                                '&.Mui-selected': {
                                  color: 'white',
                                  backgroundColor: '#fa4529',
                                  '&:hover':{
                                    backgroundColor:'#fa4529',
                                    opacity: 0.9
                                  }
                                },
                                
                                }}
                                key={categoria.id}
                                label={categoria.name}
                                onClick={(e) => handleSelect(e, categoria.id)}
                            />
                        ))}
                    </Tabs>
                </Box>
            </div>

            <div>
                 <Box sx={{ flexGrow: 1,  paddingTop: 2 }}> 
                    <Grid container spacing={2}>
                        {state.filteredItems.map((item) => (
                            <Grid item xs={6} sm={6} md={3} key={item.id}>
                                <Card
                                    sx={{
                                        minHeight: '100%',
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
                                    }}
                                >
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
                                        <Typography variant="body2" color="text.primary">
                                            {`${item.product.price}$`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Tooltip title="Favorito">
                                            <Button
                                                size="small"
                                                sx={{
                                                    p: 0,
                                                    color: state.favoriteItems[item.id] ? '#fa4529' : '#000000',
                                                }}
                                                onClick={() => handleClick(item.id)}
                                            >
                                                {state.favoriteItems[item.id] ? <Favorite /> : <FavoriteBorder />}
                                            </Button>
                                        </Tooltip>

                                        <Box sx={{ flexGrow: 1 }} />
                                        <Tooltip title={carrito.find((cartItem) => cartItem.item.id === item.id) ? "Quitar del carrito" : "Agregar al carrito"}>
                                            <Button size="small" sx={{ p: 0, color: '#000' }}
                                                onClick={() => handleCartClick(item)}>
                                                {carrito.find((cartItem) => cartItem.item.id === item.id) ? <Check /> : <AddShoppingCart />}

                                            </Button>
                                        </Tooltip>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        </div>
    );
};


