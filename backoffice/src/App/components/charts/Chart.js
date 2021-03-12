import React, { useEffect, useState } from 'react';

// CSS
import './_Chart.scss';

const Chart = ({ data, title }) => {
  const [ max, setMax ] = useState(0);

  useEffect(() => {
    let muchOrMuch = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].finishers > muchOrMuch) {
        muchOrMuch = data[i].finishers;
      };
    };

    setMax(muchOrMuch);
  });

  const ChartCol = ({col}) => {
    const [ more, setMore ] = useState(false);

    return (
      <div className="chart-wrapper--col" onMouseEnter={() => setMore(true)} onMouseLeave={() => setMore(false)} style={{
        height: `${(col.finishers / max) * 100}%`
      }}>
        {
          more && (
            <div className="chart-wrapper--col--text">
              <p><strong>{col.title}</strong></p>
              <p><strong>Aantal keer afgewerkt: </strong>{col.finishers}</p>
            </div>
          )
        }
      </div>
    )
  };

  return max ? (
    <div className="chart">
      <h1>{title}</h1>
      <div className="chart-wrapper">
        <p className="chart-wrapper-top">{max}</p>
        <p className="chart-wrapper-bottom">0</p>
        {
          data.map((col, index) => {
            return <ChartCol col={col} key={index} />
          })
        }
      </div>
    </div>
  ) : '';
};

export default Chart;