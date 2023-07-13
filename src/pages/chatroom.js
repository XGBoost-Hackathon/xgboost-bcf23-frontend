import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AllActives from '../component/AllActives';
import LoginFirst from './loginfirst';
import FileHandler from '../component/FileHandler';
import UilUpload from '@iconscout/react-unicons/icons/uil-upload';
import UilFileDownloadAlt from '@iconscout/react-unicons/icons/uil-file-download-alt';
import VoiceRecorder from '../component/VoiceRecorder';
import TextToSpeech from '../component/TextToSpeech';
import UilMicrophone from '@iconscout/react-unicons/icons/uil-microphone';
import ImageText from '../component/ImageTxt';
import Loading from '../component/Loading';

function Chatroom({socketRef}) {
  const { otherperson } = useParams();

  const [messages, setMessages] = useState([]);
  const [messagetoSend, setMessagetoSend] = useState("");
  const [file, setFile] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      socketRef.current?.on('sent_to_me_message', (data) => {
          setMessages((oldMessages) => [data, ...oldMessages]);
      });
      return () => {
          socketRef.current?.off('sent_to_me_message');
      };
  }, []);

  const sendMessage = async () => {
      if (messagetoSend.trim() !== "" || file !== "") {
          const newMessage = {
              id: messages.length + 1,
              username: socketRef.username,
              otherperson:otherperson,
              message: messagetoSend,
              filename: file?.name,
              downloadUrl: await handleFileUpload(),
              timestamp: new Date().toLocaleTimeString().toString(),
          };
          socketRef.current?.emit("send_message_to_specific", newMessage);
          setMessages((oldMessages) => [newMessage, ...oldMessages]);
          setMessagetoSend(""); // Clear the input field after sending the message
      }
  };

  const handleDownload = async (downloadUrl, filename) => {
    console.log(downloadUrl);
    try {
        console.log(socketRef.current?.io.uri + downloadUrl);
        const response = await axios.get(socketRef.current?.io.uri + downloadUrl, { responseType: 'blob' });
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
  
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error(error);
      }
}
async function handleFileUpload () {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(socketRef.current?.io.uri+'/upload', formData);
        console.log(response.data.downloadUrl);
        return response.data.downloadUrl; // Handle the response from the server
      } catch (error) {
        console.error(error); // Handle any errors
      }
    }
};

  if(!socketRef.current?.connected) return <LoginFirst/>
  else return (
    <div className='chatdorm'>
      <div className='chat-section'>
            <h2 style={{marginLeft:'10px'}}>{otherperson}</h2>
            <div className="chat-container">
                {messages.map((message) => (
                  <div style={{display:'flex',flexDirection:'row'}}>
                    <div key={message.id} className={message.username===socketRef.username?"self-message":"message"}>
                        <span className="timestamp"><b>{message.username}</b> {message.timestamp}</span><br/>
                        <small style={{ whiteSpace: 'pre-line' }}>{message.message}</small>
                        {message.filename &&
                            <div>
                                <span>{message.filename}</span>
                                <span style={{cursor:'pointer'}} onClick={() => handleDownload(message.downloadUrl, message.filename)}><UilFileDownloadAlt size={20}/></span>
                            </div>
                        }
                    </div>
                        <div className="custom-file-upload"><TextToSpeech text={message.message}/></div>
                        </div>
                ))}
            </div>
            {isRecording && <div className='filenameviewer'>
                    Recording in Progress... <UilMicrophone size={15} style={{verticalAlign:'middle'}}/>
            </div>}
            {file && <div className='filenameviewer'>
                    {file.name} <UilUpload style={{verticalAlign:'middle'}}/>
            </div>}
            <div className='filenameviewer'><Loading isLoading={isLoading}/></div>
            <div className="input-container">
                <FileHandler setFile={setFile}/>
                <ImageText setIsLoading={setIsLoading} setMessagetoSend={setMessagetoSend}/>
                <VoiceRecorder isRecording={isRecording} setIsRecording={setIsRecording} setMessagetoSend={setMessagetoSend}/>
                <textarea
                    className='messagetoSendInput'
                    type='text'
                    placeholder="Message..."
                    value={messagetoSend}
                    onChange={(event) => {
                        setMessagetoSend(event.target.value);
                    }}
                />
                <button id='btnMessageSend' onClick={sendMessage}>Send Message</button>
            </div>
            </div>
            <AllActives socketRef={socketRef}/>
    </div>
  )
}

export default Chatroom;