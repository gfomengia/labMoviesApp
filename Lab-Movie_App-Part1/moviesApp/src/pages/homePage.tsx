import { Grid } from "@mui/material";
import Header from "../components/headerMovieList";
import MovieList from "../components/movieList";
import { BaseMovieListProps } from "../types/interfaces";

const styles = {
  root: {
    padding: "20px",
  },
};

const MovieListPage: React.FC<BaseMovieListProps> = ({ movies }) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={"Home Page"} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList movies={movies}></MovieList>
      </Grid>
    </Grid>
  );
};

export default MovieListPage;
