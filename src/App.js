import React from 'react';

class App extends React.Component {
  state = {
    movie: {}
  }
  handleSubmit =  (event) => {
    event.preventDefault();
    const title = event.target[0].value;
    
    const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=4d5298cf';
    fetch(url + '&t=' + title)
    .then(res => res.json())
    .then(data => console.log(data));

  
  };  



  render() {
    return (
      <div>
        <h1>Ejemplo HTTP Buscador de peliculas</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Nombre de la pelicula
      </label>
          <input type="text" placeholder="Nombre de la pelicula" />
          <button>Buscar</button>
        </form>
      </div>
    );
  }
}  // <-- Esta es la única llave de cierre que debería estar aquí

export default App;