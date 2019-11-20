import React, { Component } from "react";
import { Button } from "reactstrap";
import "../styles/Article.css";
import { deleteNews, rateNews, getRating } from "../Service";

export default class Rating extends Component<{
  articleId?: number,
  upvotes?: number,
  downvotes?: number
}> {
  constructor(props) {
    super(props);

    this.state = {
      sak_id: this.props.articleId,
      rating: null,
      tommelOpp: this.props.upvotes,
      tommelNed: this.props.downvotes
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    rateNews(this.state.sak_id, this.state)
      .then(response => {
        console.log(this.state.sak_id);
        console.log(this.state.tommelOpp);
        console.log(this.state.tommelNed);
      })
      .catch(error => {
        console.log(error);
      });
  };

  upVote = () => {
    let newCount = this.state.tommelOpp + 1;
    this.setState(
      {
        tommelOpp: newCount
      },
      this.submitHandler
    );
  };

  downVote = () => {
    let newCount = this.state.tommelNed - 1;
    this.setState(
      {
        tommelNed: newCount
      },
      this.submitHandler
    );
  };

  render() {
    const { rating, tommelOpp, tommelNed } = this.state;
    return (
      <div className="text-center my-3 col-9">
        {showRating(
          getRating(this.state.tommelOpp, this.state.tommelNed),
          this.state.tommelOpp,
          this.state.tommelNed
        )}
        <Button
          name="tommelOpp"
          value={tommelOpp}
          className="fa fa-thumbs-up fa-custom m-2"
          onClick={this.upVote}
        ></Button>
        <Button
          name="tommelNed"
          value={tommelNed}
          className="fa fa-thumbs-down fa-custom m-2"
          onClick={this.downVote}
        ></Button>
      </div>
    );
  }
}

function showRating(rating, up, down) {
  if (rating == null) return null;
  else {
    if (up == null) up = 0;
    if (down == null) down = 0;
    return (
      <div className="row justify-content-center align-items-center">
        <p className="m-2 text-muted text-center my-auto ">Rating: {rating}</p>
        <p className="m-2 text-success text-center my-auto ">Likes: {up}</p>
        <p className="m-2 text-danger text-center my-auto ">Dislikes: {down}</p>
      </div>
    );
  }
}
