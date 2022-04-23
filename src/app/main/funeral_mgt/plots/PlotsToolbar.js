import React from 'react';
import { withRouter } from 'react-router-dom';

function PlotsToolbar(props) {
  return (
    <div className='flex flex-1 items-center justify-end overflow-hidden sm:px-16'>
      <div className='flex items-center justify-start' aria-label='Toggle star'>
     
      </div>
    </div>
  );
}

export default withRouter(PlotsToolbar);
