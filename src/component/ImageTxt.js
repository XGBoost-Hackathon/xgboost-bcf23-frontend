import React from 'react';
import '../styles/filehandler.css';
import UilImageQuestion from '@iconscout/react-unicons/icons/uil-image-question';
import axios from 'axios';
import { useState } from 'react';

function ImageText({setIsLoading, setMessagetoSend}) {
    // const [file, setFile] = useState("");

    // const handleFileChange = (e) => {
    //     console.log('changing');
    //     setFile(e.target.files[0]);
    // };

    async function handleFileUpload (e) {
        // if (file) {
            // const formData = 'hello'
          const formData = new FormData();
          formData.append('file', e.target.files[0]);
          console.log('trying...');
          try {
            setIsLoading(true);
            // const response = await axios.post('http://localhost:8001/uploadtogpt/', formData);
            const response = await axios.post('http://localhost:8000/uploadtogpt/', formData);
            console.log('uploaded');
            // console.log(response.data.downloadUrl);
            // return response.data.downloadUrl;
            console.log(response.data.recognizedText);
            setIsLoading(false)
            setMessagetoSend(response.data.recognizedText)
          } catch (error) {
            console.error(error); // Handle any errors
          }
        // }
    };

  return (
    <div>
      <label htmlFor="fileinput2" className="custom-file-upload"><UilImageQuestion size={20}/></label>
      <input id="fileinput2" type="file" onChange={handleFileUpload} style={{ display: 'none' }}/>
      {/* <button onClick={handleFileUpload}>Upload</button> */}
    </div>
  )
}

export default ImageText;