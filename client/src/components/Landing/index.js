import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';

const Landing = () => {
    const pages = ['Home', 'Search', 'Review', 'MyPage'];
    return (
        <>
            <Grid container spacing={5}>
                <AppBar position="static" sx={{height: '100px', backgroundColor: '#388e3c'}}>
                    <Container maxWidth="xl">
                        <Toolbar sx={{ padding: '40px'}}>
                        {pages.map((page) => (
                        <Typography
                            component={Link}
                            to={page === 'Home' ? `/` : `/${page.toLowerCase()}`}
                            variant="button text"
                            sx={{
                            flexGrow: 1,
                            textAlign: 'center',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            color: 'white'
                            }}
                        >
                            {page}
                        </Typography>
                        ))}
                        </Toolbar>
                    </Container>
                </AppBar>
            </Grid> 
            <Grid container alignItems = 'center' justifyContent='center' style={{ marginTop: '50px'}}>
                <Paper 
                    elevation={12} 
                    style={{
                        backgroundColor: '#68b36b',
                        color: 'white',
                        width: '900px',
                        height: '260px',
                        margin: 'auto',
                        display: 'flex'
                    }}

                >
                    <Grid item xs={12} md={6}>
                    <Typography
                        variant='h3'
                        sx={{
                            textAlign: 'left',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            color: 'white',
                            paddingTop: '10px',
                            paddingLeft: '20px'

                        }}
                    >
                        Welcome!
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            textAlign: 'left',
                            textDecoration: 'none',
                            color: 'white',
                            paddingTop: '10px',
                            paddingLeft: '20px'

                        }}
                    >
                        Welcome to my movie review website!      
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            textAlign: 'left',
                            textDecoration: 'none',
                            color: 'white',
                            paddingTop: '10px',
                            paddingLeft: '20px',
                        }}
                    >
                        On this page you can watch trailers of new movies.
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            textAlign: 'left',
                            textDecoration: 'none',
                            color: 'white',
                            paddingLeft: '20px',
                        }}
                    >
                        Navigate to the Search page to search for movies. 
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            textAlign: 'left',
                            textDecoration: 'none',
                            color: 'white',
                            paddingLeft: '20px',
                        }}
                    >
                        Navigate to the Review page to write a movie review.
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            textAlign: 'left',
                            textDecoration: 'none',
                            color: 'white',
                            paddingLeft: '20px',
                        }}
                    >
                        Navigate to MyPage to
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            textAlign: 'left',
                            textDecoration: 'none',
                            color: 'white',
                            paddingTop: '10px',
                            paddingLeft: '20px'

                        }}
                    >
                        Have fun browsing!    
                    </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img 
                            src="https://media.tenor.com/pr4qHDUflJkAAAAC/movie-time-movie-night.gif"
                            style={{ height: '95%', marginTop:'6px', marginLeft:'95px'}}
                        />
                    </Grid>
                </Paper>
            </Grid>
            <Grid container alignItems = 'center' justifyContent='center' style={{ marginTop: '50px'}}>
                <Paper 
                    elevation={12} 
                    style={{
                        backgroundColor: '#68b36b',
                        color: 'white',
                        width: '900px',
                        height: '1050px',
                        margin: 'auto',
                        textAlign: 'center', 
                        flexDirection: 'column'
                    }}

                >
                    <Grid item xs={12}>
                        <Typography
                            variant='h4'
                            sx={{
                                textAlign: 'center',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                color: 'white',
                                paddingTop: '10px',
                            }}
                        >
                            Movie Trailers 🎬
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{paddingTop: '10px'}}>
                        <iframe 
                                width="560" 
                                height="315" 
                                src="https://www.youtube.com/embed/shW9i6k8cB0" 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
                        ></iframe>
                    </Grid>
                    <Grid item xs={12} sx={{paddingTop: '10px'}}>
                        <iframe 
                                width="560" 
                                height="315" 
                                src="https://www.youtube.com/embed/pBk4NYhWNMM" 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                
                        ></iframe>
                    </Grid>
                    <Grid item xs={12} sx={{paddingTop: '10px'}}>
                        <iframe 
                                width="560" 
                                height="315" 
                                src="https://www.youtube.com/embed/uYPbbksJxIg" 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        ></iframe>
                    </Grid>
                </Paper>
            </Grid>


        </>
   
    )
}
export default Landing;