import React from 'react';
import '../styles/filehandler.css';
import UilPaperclip from '@iconscout/react-unicons/icons/uil-paperclip'

function FileHandler({ setFile }) {

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

  return (
    <div>
      <label htmlFor="fileinput" className="custom-file-upload"><UilPaperclip size={20}/></label>
      <input id="fileinput" type="file" onChange={handleFileChange} style={{ display: 'none' }}/>
      {/* <button onClick={()=>handleFileUpload(file)}>Upload</button> */}
    </div>
  )
}

export default FileHandler;