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
} from '../action'


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
        const { classes, removeMovies, addedMovies } = this.props;
        return (
            <div>
                <Typography variant="headline" style={{paddingTop:20}}>Watched</Typography>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GuttersGrid));
