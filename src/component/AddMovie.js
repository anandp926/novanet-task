/**
 * Created by rozer on 6/7/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux'
import {
    removeMovie,
    vote
} from '../action'
import ArrowDropUp from 'material-ui/svg-icons/action/thumb-up'
import ArrowDropDown from 'material-ui/svg-icons/action/thumb-down'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {red500, greenA200} from 'material-ui/styles/colors';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: 20,
    },
    paper: {
        width: 120,
    },
    imageM: {
        width: 120,
        height: 150,
        cursor:'pointer'
    }
});

class GuttersGrid extends React.Component {

    static propTypes = {
        removeMovie: PropTypes.func.isRequired
    }

    state={
        count:0
    }

    render() {
        const { classes, removeMovies, addedMovies, vote } = this.props;
        return (
            <div>
                <Typography variant="headline" style={{paddingTop:20}}>Watched</Typography>
                <Divider/>
                { addedMovies.length > 0
                    ?
                    <Grid container className={classes.root} justify="center" spacing={Number(40)}>
                        {
                            addedMovies !== null && addedMovies !== undefined && (
                                addedMovies.map((movie) => (
                                    <Grid key={movie.Title} item>
                                        <Paper className={classes.paper}>
                                            <img className={classes.imageM}
                                                 src={movie.Poster}
                                                 alt={movie.Title}
                                                 onClick={() => removeMovies(movie)}
                                            />
                                            <MuiThemeProvider>
                                                <span>
                                                    <ArrowDropUp
                                                        className="up"
                                                        color={greenA200}
                                                        onClick={() => vote({ title:movie.Title, vote:movie.vote+1})}
                                                    />
                                                    <span className="vote">{movie.vote}</span>
                                                    <ArrowDropDown
                                                        className="down"
                                                        color={red500}
                                                        onClick={() => vote({ title:movie.Title, vote:movie.vote-1})}
                                                    />
                                                </span>
                                            </MuiThemeProvider>
                                        </Paper>
                                    </Grid>
                                ))
                            )
                        }
                    </Grid>
                    :
                    <Card className="card" style={{textAlign:'center'}}>
                        <Typography variant="subheading">You haven't watched any movie</Typography>
                    </Card>
                }
            </div>
        );
    }
}

GuttersGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return{
        addedMovies: Object.values(state.addedMovies)
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        removeMovies: (data) => dispatch(removeMovie(data)),
        vote: (data) => dispatch(vote(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GuttersGrid));
