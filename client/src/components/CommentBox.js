import React, { Component } from "react";
import { getComments, stringifyDate, stringifyTime } from "../Service";
import CommentForm from "./CommentForm";
import CommentDelete from "./CommentDelete";
import { Button } from "reactstrap";

export default class CommentBox extends Component<{
  articleId?: number
}> {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      showInputForm: false
    };
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm = () => {
    const { showInputForm } = this.state.showInputForm;
    this.setState({
      showInputForm: !this.state.showInputForm
    });
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    getComments(this.props.articleId)
      .then(response => {
        console.log(response);
        this.setState({ comments: response.data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ errorMsg: "Error retreiving data" });
      });
  }
  render() {
    const { comments } = this.state;
    if (comments.length < 1)
      return (
        <div>
          <h4>
            Saken har dessverre ingen kommentarer, men du kan legge til en
            kommentar her:
          </h4>
          <CommentForm articleId={this.props.articleId} />
        </div>
      );
    else {
      return (
        <div>
          {this.state.showInputForm && (
            <div className="commentBox">
              <h4 className="text-center">KOMMENTARER</h4>
              <div className="commentList">
                {comments.map(comment => commentCard(comment))}
              </div>
              <CommentForm articleId={this.props.articleId} />
            </div>
          )}
          <Button
            className="fa fa-comments fa-custom"
            onClick={this.toggleForm}
          >
            <a className="fa-custom"> VIS KOMMENTARER</a>
          </Button>
        </div>
      );
    }
  }
}

function commentCard(comment) {
  return (
    <div className="comment p-1 border m-2">
      <h5 className="commentAuthor">Brukernavn: {comment.brukernavn}</h5>
      <hr />
      <div className="row justify-content-between">
        <div className="col-12 my-2">
          {comment.kommentar}
          <p>
            {stringifyDate(comment.tidspunkt)}{" "}
            {stringifyTime(comment.tidspunkt)}
          </p>
        </div>

        <CommentDelete commentId={comment.kommentar_id} />
      </div>
    </div>
  );
}
