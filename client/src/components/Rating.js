// @flow
import React, { Component } from "react";
import { Button } from "reactstrap";
import "../styles/Article.css";
import { deleteNews, rateNews, getRating } from "../Service";

export default class Rating extends Component<
  {
    articleId: number,
    upvotes: number,
    downvotes: number
  },
  {
    sak_id: number,
    rating: null,
    tommelOpp: number,
    tommelNed: number,
    disabled: boolean
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      sak_id: this.props.articleId,
      rating: null,
      tommelOpp: this.props.upvotes,
      tommelNed: this.props.downvotes,
      disabled: false
    };
  }

  // Sjekker localStorage om man allerede har likt saken
  componentDidMount() {
    let disabled: boolean = false;
    let sak_id: number = this.state.sak_id;

    if (
      localStorage.getItem("Reaksjon") === "true" &&
      localStorage.getItem("id" + sak_id) === this.state.sak_id.toString()
    ) {
      disabled = true;
    }
    this.setState({ disabled: disabled });
  }

  // Sender tommelOpp eller tommelNed til database
  submitHandler = (e: any) => {
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

  // Setter state hvis man liker
  upVote = () => {
    let disabled: boolean = !this.state.disabled;
    let sak_id: number = this.state.sak_id;
    localStorage.setItem("Reaksjon", "true");

    localStorage.setItem("id" + sak_id, sak_id.toString());

    let newCount: number = this.state.tommelOpp + 1;
    this.setState(
      {
        tommelOpp: newCount
      },
      this.submitHandler
    );
    if (localStorage.getItem("Reaksjon") === "true") disabled = true;
    this.setState({ disabled: disabled });
  };

  // Setter state hvis man disliker
  downVote = () => {
    let disabled: boolean = !this.state.disabled;
    let sak_id: number = this.state.sak_id;
    localStorage.setItem("Reaksjon", "true");

    localStorage.setItem("id" + sak_id, sak_id.toString());

    let newCount: number = this.state.tommelNed + 1;
    this.setState(
      {
        tommelNed: newCount
      },
      this.submitHandler
    );
    if (localStorage.getItem("Reaksjon") === "true") disabled = true;
    this.setState({ disabled: disabled });
  };

  render() {
    const { rating, tommelOpp, tommelNed } = this.state;
    return (
      <div className="text-center my-3">
        {showRating(getRating(this.state.tommelOpp, this.state.tommelNed))}
        <Button
          name="tommelOpp"
          value={tommelOpp}
          className="fa fa-thumbs-up fa-custom-likes m-2"
          onClick={this.upVote}
          disabled={this.state.disabled}
        >
          {" " + showLikes(this.state.tommelOpp)}
        </Button>
        <Button
          name="tommelNed"
          value={tommelNed}
          className="fa fa-thumbs-down fa-custom-dislikes m-2"
          onClick={this.downVote}
          disabled={this.state.disabled}
        >
          {" " + showLikes(this.state.tommelNed)}
        </Button>
      </div>
    );
  }
}

// Viser rating hvis en sak har blitt reagert på eller ikke
function showRating(rating: string | null) {
  if (rating == null)
    return (
      <div className="row justify-content-center align-items-center">
        <p className="fa fa-star m-2 "> Rating: 0</p>
      </div>
    );
  else {
    return (
      <div className="row justify-content-center align-items-center">
        <p className="fa fa-star m-2 "> {rating}</p>
      </div>
    );
  }
}

// Viser antall likes eller dislikes
function showLikes(likes: number) {
  if (likes == null) return 0;
  else return likes;
}
