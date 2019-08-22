import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { red } from "ansi-colors";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };
  deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
    .then(res =>{
      console.log(res.data)
      // const newArray = this.state.movies.filter(movie => movie.id !== res.data)
      // this.setState({movies: newArray})
      // console.log("state", this.state.movies)
      this.props.history.push('/')
    })
    .catch(err => console.log(err.response));
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button className="edit-button"
        onClick={()=> this.props.history.push(`/update-movie/${this.state.movie.id}`)}
        >update</button>
        <button className="delete-button" onClick={this.deleteMovie}>delete?</button>
      </div>
    );
  }
}
