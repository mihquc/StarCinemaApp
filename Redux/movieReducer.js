

const initialState = {
  movies: [],
  selectedMovie: null,
  showtimes: [],
};

const movieReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: payload.movies,
      };
    case 'SELECT_MOVIE':
      return {
        ...state,
        selectedMovie: payload.selectedMovie,
      };
    case 'SET_SHOWTIME':
    return {
      ...state,
      showtimes: payload.showtimes,
    };
    default:
      return state;
  }
};

export default movieReducer;