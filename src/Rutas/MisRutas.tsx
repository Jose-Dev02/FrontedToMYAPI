import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '../components/Home.tsx';
import { ContactUs } from '../components/ContactUs.tsx';
import { HeaderNav } from '../components/layout/HeaderNav.tsx';
import { Footer } from '../components/layout/Footer.tsx';

import { Tienda } from '../components/Tienda.tsx';
import { Carrito } from '../components/Carrito.tsx';
import { ICartItem } from '../components/interface/ICartItem.tsx';
import { Box } from '@mui/material';



export const MisRutas: React.FC = () => {
    const [carrito, setCarrito] = useState<ICartItem[]>([]);

    const SaveLocalStorage = (carrito: ICartItem[]): void => {
        localStorage.setItem('carrito',JSON.stringify(carrito));
    }
    
    const getFromLocalStorage =(): ICartItem[] => {
        const data = localStorage.getItem('carrito')
        return data ? JSON.parse(data) : []
    }

    useEffect(()=>{
        setCarrito(getFromLocalStorage);
        
    },[])
    console.log(carrito);
    return (

        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
         <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
        }}
      >
                <BrowserRouter>
                    {/* Header y Navegacion */}
                    < HeaderNav />


                    {/*Contenido Central */}
                        <Routes>
                            <Route path='/' element={<Navigate to="/home" />} />
                            <Route path='/home' element={<Home />} />
                            <Route path='/contactus' element={<ContactUs />} />
                            <Route path='/*' element={<Home />} />
                            <Route path='/store/warehouse' element={<Tienda carrito={carrito} setCarrito={setCarrito} SLS ={SaveLocalStorage}  />} />
                            <Route path='/store/shopingcart' element={<Carrito carrito={carrito} setCarrito={setCarrito} SLS ={SaveLocalStorage}  />} />

                        </Routes>

                </BrowserRouter>
            
            </Box>
            <Footer />
        </Box>
    )
}

