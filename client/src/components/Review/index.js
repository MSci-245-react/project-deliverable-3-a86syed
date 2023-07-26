import * as React from 'react';
import { useState } from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

const Review = () => {

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    callApiLoadMovies().then((res) => {
      setMovies(JSON.parse(res.express));
    })
  }, [])

  const callApiLoadMovies = async () => {
    const url = "/api/getMovies";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const userID = 1;
  
  const callApiAddReview = async () => {
    const url = "/api/addReview";
    const movieID = movies.find(movie => movie.name === selectedMovie).id;
    const review = {
      userID: userID,
      movieID: movieID,
      reviewTitle: enteredTitle,
      reviewContent: enteredReview,
      reviewScore: selectedRating
    };
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(review)
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const [selectedMovie, setSelectedMovie] = useState('');
  const [movieSelectionError, setMovieSelectionError] = useState(false);

  const [enteredTitle, setEnteredTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedRating, setSelectedRating] = useState('');
  const [ratingError, setRatingError] = useState(false);

  const [enteredReview, setEnteredReview] = useState('');
  const [bodyError, setReviewBodyError] = useState(false);

  const [renderReview, setRenderReview] = useState(false);

  const handleMovieSelection = (event) => {
    setSelectedMovie(event.target.value);
    setRenderReview(false);
  };

  const handleReviewTitle = (event) => {
    setEnteredTitle(event.target.value);
    setRenderReview(false);
  };

  const handleReviewRating = (event) => {
    setSelectedRating(event.target.value);
    setRenderReview(false);
  };

  const handleReviewBody = (event) => {
    setEnteredReview(event.target.value);
    setRenderReview(false);
  };

  function handleClick() {
    if (!selectedMovie) { 
      setMovieSelectionError(true);
    } else { 
      setMovieSelectionError(false);
    }
    if (!enteredTitle) { 
      setTitleError(true);
    } else { 
      setTitleError(false);
    }
    if (!selectedRating) { 
      setRatingError(true);
    } else { 
      setRatingError(false);
    }
    if (!enteredReview) { 
      setReviewBodyError(true);
    } else { 
      setReviewBodyError(false);
    }

    if (selectedMovie && enteredTitle && selectedRating && enteredReview) { 
      setRenderReview(true);
      callApiAddReview();
    } else { 
      setRenderReview(false);
    }

  };

  const pages = ['Home', 'Search', 'Review', 'MyPage'];

  return (

    <div>  
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
          <Grid item xs={6} align="center">
            <Typography variant="h3" component="div">
              Review a movie
            </Typography>
          </Grid> 
          {renderReview 
          ? 
          <Grid item xs={6} align="center">
            <Typography variant="h6" component="div">
              Your review has been received
            </Typography>
          </Grid>
          : 
          <Grid item xs={6} align="center"></Grid>}
          <Grid item xs={6} align="center">
            <MovieSelection 
              movies={movies}
              selectedMovie={selectedMovie}
              onMovieSelection={handleMovieSelection} 
              error={movieSelectionError}
            />
          </Grid>
          {renderReview 
          ? 
          <Grid item xs={6} align="center">
            <Typography variant="body1" component="div">
              Movie: {selectedMovie}
            </Typography>
          </Grid>
          : 
          <Grid item xs={6} align="center"></Grid>}
          <Grid item xs={6} align = "center">
            <ReviewTitle enteredTitle={enteredTitle} onReviewTitle={handleReviewTitle} error={titleError}/>
          </Grid>
          {renderReview 
          ? 
          <Grid item xs={6} align="center">
            <Typography variant="body1" component="div">
              Title: {enteredTitle}
            </Typography>
          </Grid>
          : 
          <Grid item xs={6} align="center"></Grid>}
          <Grid item xs={6} align = "center">
            <ReviewRating selectedRating={selectedRating} onReviewRating={handleReviewRating} error={ratingError}/>
          </Grid>
          {renderReview 
          ? 
          <Grid item xs={6} align="center">
            <Typography variant="body1" component="div">
              Rating: {selectedRating}
            </Typography>
          </Grid>
          : 
          <Grid item xs={6} align="center"></Grid>}
          <Grid item xs={6} align = "center">
            <ReviewBody enteredReview={enteredReview} onReviewBody={handleReviewBody} error={bodyError}/>
          </Grid>
          {renderReview 
          ? 
          <Grid item xs={6} align="center">
            <Typography variant="body1" component="div">
              Review: {enteredReview}
            </Typography>
          </Grid>
          : 
          <Grid item xs={6} align="center"></Grid>}
          <Grid item xs={6} align = "center">
            <Button 
            variant="contained"
            onClick={handleClick}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>

  );
}

export default Review;