/**
 * Created by rozer on 6/7/2018.
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import { searchMovie } from '../utils/api'
import AddMovie from './AddMovie'
import { addMovies } from '../action'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';


class Movie extends Component {

    state={
        movieName: '',
        movieDetail: null,
    };

    searchMovie = (query) => {
        if(!query){
            this.setState({movieName:''})
        }else{
            this.setState({movieName:query});
            searchMovie(query).then((movieDetail) => {
                this.setState({movieDetail:movieDetail})
            })
        }
    };

    movieAdded = (movie) => {
        movie["vote"]=0
        this.props.addMovies(movie)
    };

    render() {
        const { movieDetail } = this.state;
        const { addedMovies, } = this.props;
        let count = 0;
        {movieDetail !== null && Object.keys(movieDetail).length > 2 && addedMovies !== null && addedMovies !== undefined && (
            addedMovies.map((fm) => {
                return(
                    fm.Title === movieDetail.Title
                        ? count++
                        : count
                )
            })
        )
        }
        console.log(count)
        return(
            <div className="searchCard">
                <div >
                    <AppBar position="static" style={{ backgroundColor: '#2196F3' }}>
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                Novanet-Task
                            </Typography>
                            <input type="text"
                                   placeholder="Search.."
                                   value={this.state.movieName}
                                   onChange={(e) => this.searchMovie(e.target.value)}
                                   className="search"
                            />
                        </Toolbar>
                    </AppBar>
                    { movieDetail !== null &&(
                        <div>
                            {Object.keys(movieDetail).length > 2
                                ?
                                <div>
                                    <Card className="card">
                                        <div className="image">
                                            <img
                                                className="cover"
                                                src={movieDetail.Poster}
                                                alt={movieDetail.Title}
                                                onClick={() => this.movieAdded(movieDetail)}
                                            />
                                        </div>
                                        <div className="details">
                                            <CardContent style={{paddingTop:0, paddingBottom:0}}>
                                                <Typography variant="headline">{movieDetail.Title}</Typography>
                                                <Typography variant="subheading" color="textSecondary">
                                                    {movieDetail.Year}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    IMDB {movieDetail.imdbRating}
                                                </Button>
                                                <Button size="small" color="default">
                                                    {Object.values(movieDetail.Ratings) !== null &&(
                                                        Object.values(movieDetail.Ratings).map((data)=>{
                                                            return(
                                                                <span key={data.Source}>
                                                                    {
                                                                        data.Source==="Rotten Tomatoes"
                                                                            ? <span style={{color:'darkBlack'}}>
                                                                                RT{" "}{data.Value}
                                                                              </span>
                                                                            : <span></span>
                                                                    }
                                                                </span>
                                                            )
                                                        })
                                                    )
                                                    }
                                                </Button>
                                                {
                                                    count>0
                                                    ?
                                                        <Button size="large" color="secondary">
                                                            <span style={{fontWeight:'bold'}}>watched</span>
                                                        </Button>
                                                    : <span></span>
                                                }
                                            </CardActions>
                                            <div className="rating">
                                                <div className="desc">
                                                    <Typography variant="headline" style={{fontSize:17, fontWeight:'bold'}}>Description</Typography>
                                                    <Typography variant="subheading"
                                                                style={{fontSize:13, color:'#37373a'}}
                                                                color="textSecondary"
                                                    >
                                                        <span >{movieDetail.Plot}</span>
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                :
                                <Card className="card">
                                    <span>No Movie Found</span>
                                </Card>
                            }
                            <Divider style={{marginTop:20}}/>
                        </div>
                    )
                    }
                </div>
                <AddMovie/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        addedMovies: Object.values(state.addedMovies)
    }
};

function mapDispatchToProps(dispatch) {
    return{
        addMovies: (data) => dispatch(addMovies(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Movie)
