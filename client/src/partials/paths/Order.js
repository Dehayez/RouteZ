import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Routes
import * as Routes from '../../routes';

import './Paths.scss';

const Order = ({ paths, pathId }) => {
  const { order } = useParams();
  const history = useHistory();

  // Route to order
  const goToOtherOrder = (orderIndex) => {
    history.push(Routes.PATH.replace(':type', 'theorie').replace(':id', pathId).replace(':order', orderIndex));
  };

  return (
    <>
      <div className="order">
        {
          paths && paths.map((path, index) => {
            return <span onClick={() => goToOtherOrder(path.order)} key={index} className={`${order === path.order ? 'active' : 'non-active'}`}>{path.order}</span>
          })
        }
      </div>
    </>
  );
};

export default Order;
