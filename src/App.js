import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    movie: null,
    loading: false,
    error: null
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target[0].value.trim();
    
    if (!title) {
      this.setState({ error: "Por favor ingresa un título" });
      return;
    }

    this.setState({ loading: true, error: null });

    try {
      const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=4d5298cf';

      // Realizamos la llamada usando axios
      const response = await axios.get(url + '&t=' + encodeURIComponent(title));

      const movie = response.data;
      if (movie.Response === "False") {
        throw new Error(movie.Error || "Película no encontrada");
      }

      this.setState({ movie, loading: false });
    } catch (error) {
      this.setState({ 
        error: error.message,
        loading: false,
        movie: null
      });
    }
  };

  render() {
    const { movie, loading, error } = this.state;

    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <h1>Buscador de Películas</h1>
        
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="movie-input">
            Nombre de la película:
          </label>
          <input
            id="movie-input"
            type="text"
            placeholder="Ej: Inception, Avengers"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {loading && <p>Cargando...</p>}
        
        {error && (
          <div style={{ color: "red", margin: "10px 0" }}>
            Error: {error}
          </div>
        )}

        {movie && (
          <div style={{ marginTop: "20px" }}>
            <h2>{movie.Title} ({movie.Year})</h2>
            <img 
              src={movie.Poster} 
              alt={`Poster de ${movie.Title}`} 
              style={{ maxWidth: "300px", width: "150px" }}
            />
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actores:</strong> {movie.Actors}</p>
            <p><strong>Sinopsis:</strong> {movie.Plot}</p>
            <p><strong>Rating:</strong> {movie.imdbRating}/10 (IMDb)</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
