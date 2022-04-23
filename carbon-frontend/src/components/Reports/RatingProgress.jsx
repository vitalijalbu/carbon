import * as Icon from 'components/Addons/Icons/';
import { Col, Card, CardBody, Progress, Row } from 'reactstrap';
import React from 'react';

const RatingProgress = ({ data }) => {
  return (
    <Card>
      <CardBody className="app-ratings">
        <Row>
          <Col md="4" className="app-ratings-number">
            <b>{data.rating}</b>
            <span>su 5</span>
            <div className="app-ratings-votes-total">{data.total_reviews ? data.total_reviews : '0'} Recensioni</div>
          </Col>

          <Col md="4" className="app-ratings-votes">
            {Array.isArray(data.rating_progress) && data.rating_progress.length ? (
              data.rating_progress.map((rating, i) => (
                <div className="app-ratings-votes-row" key={i}>
                  <div className="app-ratings-votes-stars">
                    {Array.from({ length: rating.star }).map((el, index) => (
                      <Icon.Star size="14" fill="orange" color="orange" key={index} />
                    ))}
                  </div>
                  <div className="app-ratings-votes-progress">
                    <Progress value={rating.progress} color="orange" />
                  </div>
                </div>
              ))
            ) : (
              <p>Le recensioni apariranno qui.</p>
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default RatingProgress;
