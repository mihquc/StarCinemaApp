

const initialState = {
    movies: [],
    selectedMovie: null,
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
      default:
        return state;
    }
  };
  
  export default movieReducer;