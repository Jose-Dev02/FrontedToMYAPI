import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { trabajos } from '../data/trabajos';

export const Proyecto = () => {
    const [proyecto, setProyecto] = useState({});
    const params = useParams();

    useEffect(() => {
        const proyecto = trabajos.filter(trabajo => trabajo.id === params.id);
        setProyecto(proyecto[0]);
    }, []);

    return (
        <div className='page page-work'>
            <div className='mask'>
                <img src={'/images/' + proyecto.id + '.png'} alt={'descripcion de ' + proyecto.nombre} />
            </div>
            <h1 className='heading'> {proyecto.nombre}</h1>

            <h3>{proyecto.tecnologias}</h3>
            <p>{proyecto.description}</p>
            <a href={"https://" + proyecto.url} rel="noreferrer" target='_blank'> Ir al Proyecto</a>

        </div>
    )
}
