/**
 * Created by rozer on 6/7/2018.
 */
import {
    ADD_MOVIE,
    REMOVE_MOVIE,
    VOTE,
} from '../action'

function movies(state={addedMovies:[]}, action) {
    switch (action.type){
        case ADD_MOVIE:
            return{
                ...state,
                addedMovies: [
                    ...state.addedMovies.filter((newMovie) => newMovie.Title !== action.movie.Title).concat([action.movie])
                ]
            };
        case REMOVE_MOVIE:
            return{
                ...state,
                addedMovies: [
                    ...state.addedMovies.filter(movies => movies.Title !== action.movie.Title)
                ]
            };
        case VOTE:{
            return Object.assign({}, state, {
                addedMovies : state.addedMovies.map(movie => {
                    if (movie.Title !== action.title) {
                        return movie;
                    }
                    return Object.assign({}, movie, {
                        vote : action.vote
                    })
                })
            });
        }
        default:
            return{
                ...state
            }
    }
}

export default movies
