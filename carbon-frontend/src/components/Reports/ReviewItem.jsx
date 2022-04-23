import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { ListGroupItem } from 'reactstrap';

const ReviewItem = ({ data }) => {
  return (
    <ListGroupItem className="review-item">
      <div className="item-inner">
        <div className="item-body">
          <div className="item-header">{data.first_name}</div>
          <div className="text-muted">{data.comments}</div>
          <span className="text-muted mr-2">{data.created_at}</span>
        </div>
        <span className="d-flex align-items-center align-self-center">
          <StarRatingComponent name="Rating" value={data.rating} starColor="#ff5d5d" emptyStarColor="#8F95A3" />
          <span className="ml-2">{data.rating}</span>
        </span>
      </div>
    </ListGroupItem>
  );
};

export default ReviewItem;
