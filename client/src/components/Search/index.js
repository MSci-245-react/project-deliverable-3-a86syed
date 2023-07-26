import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';

const Search = () => {
    
    const pages = ['Home', 'Search', 'Review', 'MyPage'];
    const [movieSearchTerm, setMovieSearchTerm] = React.useState('');
    const [actorSearchTerm, setActorSearchTerm] = React.useState('');
    const [directorSearchTerm, setDirectorSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);

    const serverURL = "";
    
    React.useEffect(() => {
        handleSearch();
    }, [movieSearchTerm, actorSearchTerm, directorSearchTerm]);

    const handleSearch = () => {
        callApiFindMovie()
            .then(res => {
            var parsed = JSON.parse(res.express);
            setSearchResults(parsed);
        });
    }
    
    const callApiFindMovie = async () => {
        const url = serverURL + "/api/findMovie";
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieSearchTerm: movieSearchTerm,
            actorSearchTerm: actorSearchTerm,
            directorSearchTerm: directorSearchTerm
          })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }
    
    return (
        <Grid container spacing={5}>
            <AppBar position="static" sx={{height: '100px'}}>
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
            <Grid item xs={12} align="center">
                <Typography variant="h3" component="div">
                    Find a movie
                </Typography>
            </Grid> 
            <Grid item xs={4} align="center">
                <SearchComponent 
                    label="Search by movie"
                    onSearch={setMovieSearchTerm}
                />
            </Grid>
            <Grid item xs={4} align="center">
                <SearchComponent
                    label="Search by actor"
                    onSearch={setActorSearchTerm}
                />
            </Grid>
            <Grid item xs={4} align="center">
                <SearchComponent 
                    label="Search by director"
                    onSearch={setDirectorSearchTerm}
                />
            </Grid>
            <Grid item xs={12} align="left">

            </Grid> 
        </Grid>
    )
}
export default Search;