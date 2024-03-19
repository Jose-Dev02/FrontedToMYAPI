import React from 'react'

export const ContactUs = () => {
    return (
        <div className='page'>
            <h1 className='heading'>Contact Us</h1>

            <form className='contact' action='mailto:jluismatos68@gmail.com'>
                <input type='text' placeholder='Nombre' />
                <input type='text' placeholder='Apellidos' />
                <input type='text' placeholder='Email' />
                <textarea placeholder='Motivo de contacto' />
                <input type='submit' value="Enviar" />


            </form>

        </div>
    )
}
