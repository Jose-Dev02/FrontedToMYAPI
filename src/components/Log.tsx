import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { urlValidar } from '../endpoints';
import { MisRutas } from '../Rutas/MisRutas'
import { IUser } from './interface/IUser';

export const Log: React.FC = () => {
    axios.defaults.withCredentials = true;
    const [user, setUser] = useState<IUser>({
        id: 0,
        name: "",
        correo: "",
        password: "",
        clave: "",
        salt: "",
        isAdmin: false
    });

    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(urlValidar, user);
            if (response.data.success) {
                setAuthenticated(true);
                console.log({ response }, authenticated);
            } else {
                setError(response.data.message);
            }
        } catch (error: any) {
            setError(error.message);
            console.error(error);
        }
    };

    if (authenticated) {
        return <MisRutas />;
    }

    return (

        <div>
            <header className='header'>
                <div className='logoLogin'>
                    <span>JL</span>
                </div>
            </header>

            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <div>
                        <label>Usuario</label>
                        <input
                            type='text'
                            name='name'
                            placeholder='Usuario'
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Contraseña</label>
                        <input
                            type='text'
                            name='password'
                            placeholder='Contraseña'
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>

                    <input type='submit' value="Autenticar" />
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

