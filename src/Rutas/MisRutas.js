import React, { useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '../components/Home';
import { ContactUs } from '../components/ContactUs';
import { HeaderNav } from '../components/layout/HeaderNav';
import { Footer } from '../components/layout/Footer';

import { Tienda } from '../components/Tienda';


export const MisRutas = () => {
    const [carrito, setCarrito] = useState([]);
    return (

        <div >
            <div className='layout'>
                <BrowserRouter>
                    {/* Header y Navegacion */}
                    < HeaderNav />


                    {/*Contenido Central */}
                    <section className='content'>
                        <Routes>
                            <Route path='/' element={<Navigate to="/home" />} />
                            <Route path='/home' element={<Home />} />
                            <Route path='/contactus' element={<ContactUs />} />
                            <Route path='/*' element={<Home />} />
                            <Route path='/store/warehouse' element={<Tienda carrito={carrito} setCarrito={setCarrito} />} />

                        </Routes>

                    </section>
                    {/*Footer */}

                </BrowserRouter>
            </div>
            <Footer />
        </div>
    )
}
