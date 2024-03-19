import React from 'react'
import { Link } from 'react-router-dom'
import { ListadoTrabajos } from './ListadoTrabajos'

export const Home = () => {
    return (
        <div className='home'>
            <h1>
                Hola, soy José Luis Matos <strong>Web Developer</strong> en Cuba,
                y ofrezco mis servicios de <strong> programación y desarrollo </strong>
                en todo tipo de proyectos web.
            </h1>

            <h2 className='title'>
                Te ayudo a crear tu sitio o aplicacion web, tener
                mas visibilidad y relevancia en Internet. <Link to="/contactus">Contacta conmigo.</Link>
            </h2>

            <section className='last-works'>
                <h2 className='heading'> Algunos de mis proyectos</h2>
                <p> Estos son algunos de mis trabajos de desarrollo web.</p>

                <ListadoTrabajos limite='2' />

            </section>
        </div>
    )
}
