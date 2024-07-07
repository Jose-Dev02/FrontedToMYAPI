import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div className='home'>
            <h1>
                Backend(C# Asp.NET MINIMAL API) and Fronted (JavaScript React)
            </h1>

            <h2 className='title'>
                Hola soy <strong>Jose</strong> alias <strong>JoseDEV</strong> y esto es una muestra de algunos de mis conocimientos sobre desarrollo Web.
                Todas los datos de la tienda son guardados en una base de datos pero son solo para demostración.


            </h2>

            <Link to="/contactus">Contacta conmigo.</Link>

            {/* <section className='last-works'>
                <h2 className='heading'> Algunos de mis proyectos</h2>
                <p> Estos son algunos de mis trabajos de desarrollo web.</p>

                <ListadoTrabajos limite='2' />

            </section> */}
        </div>
    )
}
