// Mock movie data (in a real app, this would be fetched from a server)
const movies = [
    { id: 1, title: "Movie 1", description: "Action-packed adventure", tickets: 10 },
    { id: 2, title: "Movie 2", description: "Romantic drama", tickets: 5 },
    { id: 3, title: "Movie 3", description: "Sci-fi thriller", tickets: 0 }
  ];
  
  // This function will populate the movie list in the navigation bar
  function populateMovieList() {
    const movieListElement = document.getElementById('movie-list');
    movieListElement.innerHTML = "";  // Clear existing list
  
    movies.forEach(movie => {
      const movieItem = document.createElement('li');
      movieItem.textContent = movie.title;
      movieItem.dataset.id = movie.id;  // Store movie id for later reference
      movieListElement.appendChild(movieItem);
    });
  }
  
  // Function to display the details of the selected movie
  function showMovieDetails(movieId) {
    const selectedMovie = movies.find(movie => movie.id === movieId);
    
    if (selectedMovie) {
      document.getElementById('movie-title').textContent = selectedMovie.title;
      document.getElementById('movie-description').textContent = selectedMovie.description;
      document.getElementById('ticket-count').textContent = selectedMovie.tickets;
      
      // Update the "Buy Ticket" button's state based on availability
      const buyTicketBtn = document.getElementById('buy-ticket-btn');
      if (selectedMovie.tickets > 0) {
        buyTicketBtn.disabled = false;
      } else {
        buyTicketBtn.disabled = true;
      }
    }
  }
  