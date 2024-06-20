import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

export const Footer = () => {
    const companyName = 'J&J';
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: 3,
                height: '8%',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2}>

                    <Grid item xs={6} sm={4}>
                        <Typography variant="h6" component="div">
                            Follow Us
                        </Typography>
                        <Link href="#" color="inherit" underline="none">
                            Facebook
                        </Link>
                        <br />
                        <Link href="#" color="inherit" underline="none">
                            Twitter
                        </Link>
                        <br />
                        <Link href="#" color="inherit" underline="none">
                            Instagram
                        </Link>
                    </Grid>
                    <Box sx={{ flexGrow: 1 }} />
                    <Grid item xs={6} sm={4}>
                        <Typography variant="h6" component="div">
                            {companyName}
                        </Typography>
                        <Typography variant="body2">
                            &copy; {new Date().getFullYear()} {companyName} All rights reserved.
                        </Typography>
                    </Grid>

                </Grid>
            </Container>
        </Box >
    );
};

