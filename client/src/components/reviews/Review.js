import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteReview } from "../../actions/review";
import { connect } from "react-redux";

const Review = ({
  deleteReview,
  auth,
  review: { _id, review, name, user, comments, date, book, photo },
}) => {
  return (
    <div
      className="
     mb-4"
    >
      <div className="form-info border">
        <Link to={`/profile/${user}`}>
          <img src={`/uploads/${photo}`} alt="user" className="user-img" />
          <h2 className="profile-heading">{name}</h2>
        </Link>
      </div>
      <div className="form-info border">
        <h2 className="profile-heading">Book:</h2>
        <h5>{book}</h5>
      </div>
      <div className="form-info border">
        <h2 className="profile-heading">Review:</h2>
        <p>{review}</p>
        <p>
          <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>
      </div>
      <div className="form-info border">
        <Link to={`/review/${_id}`}>
          <button className="button button-add">
            Comments {comments.length > 0 && <span>{comments.length}</span>}
          </button>
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="button danger"
            onClick={(e) => deleteReview(_id)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        )}
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteReview })(Review);
