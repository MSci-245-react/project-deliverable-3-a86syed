import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

const Search = () => {
    
    const pages = ['Home', 'Search', 'Review', 'MyPage'];
    const [movieSearchTerm, setMovieSearchTerm] = React.useState('');
    const [actorSearchTerm, setActorSearchTerm] = React.useState('');
    const [directorSearchTerm, setDirectorSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [renderSearchResults, setRenderSearchResults] = React.useState(false);

    const serverURL = "";

    const handleSearch = () => {
        callApiFindMovie()
            .then(res => {
            var parsed = JSON.parse(res.express);
            setSearchResults(parsed);
        });
        if (!movieSearchTerm && !actorSearchTerm && !directorSearchTerm) {
            setRenderSearchResults(false);
        } else { 
            setRenderSearchResults(true);
        }
        
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

    const updateMovieSearchTerm = (event) => {
        setMovieSearchTerm(event.target.value);
    };

    const updateActorSearchTerm = (event) => {
        setActorSearchTerm(event.target.value);
    };

    const updateDirectorSearchTerm = (event) => {
        setDirectorSearchTerm(event.target.value);
    };
    
    return (
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
            <Grid item xs={3} align="center">
                <SearchComponent 
                    label="Search by movie"
                    searchTerm={movieSearchTerm}
                    onSearch={updateMovieSearchTerm}
                />
            </Grid>
            <Grid item xs={3} align="center">
                <SearchComponent
                    label="Search by actor"
                    searchTerm={actorSearchTerm}
                    onSearch={updateActorSearchTerm}
                />
            </Grid>
            <Grid item xs={3} align="center">
                <SearchComponent 
                    label="Search by director"
                    searchTerm={directorSearchTerm}
                    onSearch={updateDirectorSearchTerm}
                />
            </Grid>
            <Grid item xs={3} align = "center">
                <Button 
                    variant="contained"
                    onClick={handleSearch}
                    sx={{backgroundColor: '#388e3c'}}
                >
                    Submit
                </Button>
            </Grid>

            {renderSearchResults &&
                (<Grid item xs={12} align="center">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                <TableCell>Movie Name</TableCell>
                                <TableCell>Director Name</TableCell>
                                <TableCell>Review Content</TableCell>
                                <TableCell>Review Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.map((result) => (
                                    <TableRow>
                                        <TableCell>{result.movie_name}</TableCell>
                                        <TableCell>{result.director_name}</TableCell>
                                        <TableCell>{result.review_content}</TableCell>
                                        <TableCell>{result.review_score}</TableCell>
                                    </TableRow>
                                ))};
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>) 
            }
        </Grid>
    )
}
export default Search;