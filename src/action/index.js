/**
 * Created by rozer on 6/7/2018.
 */
export const ADD_MOVIE = "ADD_MOVIE"
export const REMOVE_MOVIE = "REMOVE_MOVIE"
export const VOTE = "VOTE";

export const addMovies = (movie) => ({
    type: ADD_MOVIE,
    movie
});

export const removeMovie = (movie) => ({
    type: REMOVE_MOVIE,
    movie
});

export function vote ({ title, vote }) {
    return {
        type: VOTE,
        title,
        vote
    }
}


