import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Header from "../components/headerMovieList";
import MovieList from "../components/movieList";
import FilterCard from "../components/filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { FilterOption, BaseMovieProps } from "../types/interfaces";

const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

const MovieListPage: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFIlter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const genreId = Number(genreFIlter);

  const displayedMovies = movies
    .filter((m: BaseMovieProps) => {
      return m.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m: BaseMovieProps) => {
      return genreId > 0 ? m.genre_ids?.includes(genreId) : true;
    });

  const handleChange = (type: FilterOption, value: string) => {
    if (type === "title") setTitleFilter(value);
    else setGenreFilter(value);
  };

  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((m: BaseMovieProps) => 
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies); 
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        //console.log(json);
        return json.results;
      })
      .then((movies) => {
        setMovies(movies);
      });
  }, []);

  return (
    <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={"Home Page"} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList movies={displayedMovies} selectFavourite={addToFavourites}></MovieList>
        </Grid>
      </Grid>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          genreFIlter={genreFIlter}
        />
      </Drawer>
    </>
  );
};

export default MovieListPage;
