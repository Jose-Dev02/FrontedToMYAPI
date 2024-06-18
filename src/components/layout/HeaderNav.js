import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ShoppingCart, StoreMallDirectory } from '@mui/icons-material';
import { Link } from 'react-router-dom';



export const HeaderNav = () => {

    const pages = ['Bienvenido', 'Tienda', 'Contáctanos'];
    const links = ['home', 'store/warehouse', 'contactus'];
    const [anchorElNav, setAnchorElNav] = useState(null);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    // return (

    //     <header className='header'>
    //         <div className='logo'>
    //             <span>JL</span>
    //             <h3> Jose Luis Matos Sosa Web</h3>

    //         </div>
    //         <nav>
    //             <ul>
    //                 <li>
    //                     <NavLink
    //                         to='/home'
    //                         className={({ isActive }) => isActive ? "activated" : ""}
    //                     > Home </NavLink>
    //                 </li>
    //                 {/* <li>
    //                     <NavLink
    //                         to='/portafolio'
    //                         className={({ isActive }) => isActive ? "activated" : ""}
    //                     > Portafolio </NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink
    //                         to='/service'
    //                         className={({ isActive }) => isActive ? "activated" : ""}
    //                     > Service </NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink
    //                         to='/cv'
    //                         className={({ isActive }) => isActive ? "activated" : ""}
    //                     > CV </NavLink>
    //                 </li> */}
    //                 <li>
    //                     <NavLink
    //                         to='/contactus'
    //                         className={({ isActive }) => isActive ? "activated" : ""}
    //                     > Contact Us </NavLink>

    //                 </li>
    //                 {/* <li>
    //                     <NavLink
    //                         to='/'
    //                         className={({ isActive }) => isActive ? "activated" : ""}
    //                     > Log Out </NavLink>

    //                 </li> */}
    //                 <li>
    //                     <NavLink
    //                         to='/store/warehouse'
    //                         className={({ isActive }) => isActive ? "activated" : ""}
    //                     >Tienda </NavLink>

    //                 </li>
    //             </ul>
    //         </nav>
    //     </header>
    // )

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <StoreMallDirectory sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#fa4529' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a" //Para redirigir a un componente
                        href="" //Futuro Grupo de Whatsap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#fa4529',
                            textDecoration: 'none',
                        }}
                    >
                        J&J
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', color: '#fa4529' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none', color: '#fa4529' },
                            }}
                        >

                            {pages.map((page, i) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>

                                    <Typography
                                        textAlign="center"
                                        sx={{ textDecoration: 'none', color: '#fa4529' }}
                                        component={Link}
                                        to={`/${links[i]}`}
                                    >

                                        {page}
                                    </Typography>

                                </MenuItem>
                            ))}

                        </Menu>
                    </Box>
                    <StoreMallDirectory sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#fa4529' }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component=""
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',

                        }}
                    >
                        J&J
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        {pages.map((page, i) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: '#fa4529', display: 'block' }}
                                component={Link}
                                to={`/${links[i]}`}
                            >
                                {page}
                            </Button>
                        ))}

                    </Box>


                    <Tooltip title="Ver Carrito">
                        <IconButton sx={{ p: 0, color: '#fa4529' }}>
                            <ShoppingCart />
                        </IconButton>
                    </Tooltip>


                </Toolbar>
            </Container>
        </AppBar>
    );

}



