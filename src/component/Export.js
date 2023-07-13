import React, { useState } from 'react';
import UilForward from '@iconscout/react-unicons/icons/uil-forward';
import axios from 'axios';

const Export = ({text}) => {

  const exportfile = async () => {
    await axios.post('http://localhost:8001/input/', text);
  };

  return (
    <div title="Export pdf book from the prompt!">
    <UilForward size={20} onClick={exportfile}/>
      {/* <textarea
        value={text}
        onChange={handleInputChange}
        placeholder="Enter text to speak"
        rows={4}
        cols={50}
      />
      <button onClick={handleSpeak} disabled={!text}>
        Speak
      </button> */}
    </div>
  );
};

export default Export;
