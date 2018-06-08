/**
 * Created by rozer on 6/7/2018.
 */

export const searchMovie = (movie = '') =>{
    return fetch(`http://www.omdbapi.com/?t=${movie}&apikey=aabca0d`)
        .then((res) => res.json())
};
