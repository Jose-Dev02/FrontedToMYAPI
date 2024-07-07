import React, { useState, MouseEvent } from 'react'
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
    const links = ['home', 'store/warehouse', 'contactus', 'store/shopingcart'];
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const title = 'J&J';

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/*Menu nav PC*/}
                    <IconButton

                        component={Link}
                        to={`/${links[1]}`}
                    >
                        <StoreMallDirectory sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#fa4529' }} />
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#fa4529',
                            textDecoration: 'none',

                        }}
                        component={Link}
                        to={`/${links[0]}`}
                    >
                        {title}
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
                    <Typography
                        component={Link}
                        to={`/${links[1]}`}>
                        <StoreMallDirectory sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#fa4529' }} />
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#fa4529',
                            textDecoration: 'none',

                        }}
                        component={Link}
                        to={`/${links[0]}`}
                    >
                        {title}
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
                        <IconButton sx={{ p: 0, color: '#fa4529' }}
                            component={Link}
                            to={`/${links[3]}`}>
                            <ShoppingCart />
                        </IconButton>
                    </Tooltip>


                </Toolbar>
            </Container>
        </AppBar>
    );

}



