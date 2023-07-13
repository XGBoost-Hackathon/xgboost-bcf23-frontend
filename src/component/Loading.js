import React, { useState, useEffect } from 'react';
import '../styles/loading.css'

const Loading = ({isLoading}) => {

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Loading;
