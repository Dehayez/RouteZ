import { default as React } from 'react';

import './ErrorLayout.scss';

const ErrorLayout = ({children}) => {
  

  return (
    <div className="page">
		{children}
    </div>
  );
};

export default ErrorLayout;