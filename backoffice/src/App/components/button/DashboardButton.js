import React from 'react';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// CSS
import './_DashboardButton.scss';

const DashboardButton = ({ text, path, icon }) => {
  // Routing
  const history = useHistory();

  return (
    <Col xs={12} lg={6}>
      <div className="dashboard-button" onClick={() => history.push(path)}>
        <div className="dashboard-button__image">
          <img src={icon} alt="icon" />
        </div>
        <h5>{text}</h5>
      </div>
    </Col>
  );
};

export default DashboardButton;
