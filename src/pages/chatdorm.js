import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../styles/chat.css';
import AllActives from '../component/AllActives';
import LoginFirst from './loginfirst';
import FileHandler from '../component/FileHandler';
import UilUpload from '@iconscout/react-unicons/icons/uil-upload';
import UilFileDownloadAlt from '@iconscout/react-unicons/icons/uil-file-download-alt';
import TextToSpeech from '../component/TextToSpeech';
import UilMicrophone from '@iconscout/react-unicons/icons/uil-microphone';
import VoiceRecorder from '../component/VoiceRecorder';

function Chatdorm({ socketRef }) {
    const [messages, setMessages] = useState([]);
    const [messagetoSend, setMessagetoSend] = useState("");
    const [file, setFile] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const fetchSessionMessages = async () => {
            try {
              console.log(socketRef.current);
              const response = await axios.get(socketRef.current?.io.uri+'/session-messages');
              setMessages(response.data.sessionMessages?.reverse());
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchSessionMessages();
    }, []);

    useEffect(() => {
        socketRef.current?.on('broadcast_message', (data) => {
            setMessages((oldMessages) => [data, ...oldMessages]);
        });
        return () => {
            socketRef.current?.off('broadcast_message');
        };
    }, []);

    // useEffect(() => {
    //     socketRef.current?.on('sent_to_me_from_gpt', (data) => {
    //         console.log(data);
    //         setMessages((oldMessages) => [data, ...oldMessages]);
    //     });
    //     return () => {
    //         socketRef.current?.off('sent_to_me_from_gpt');
    //     };
    // }, []);

    const sendMessage = async () => {
        if (messagetoSend.trim() !== "" || file !== "") {
            const newMessage = {
                id: messages.length + 1,
                username: socketRef.username,
                message: messagetoSend,
                filename: file?.name,
                downloadUrl: await handleFileUpload(),
                timestamp: new Date().toLocaleTimeString().toString(),
            };
            socketRef.current?.emit("send_message", newMessage);
            // socketRef.current?.emit("send_message_to_friendgpt", newMessage);
            setMessages((oldMessages) => [newMessage, ...oldMessages]);
            setMessagetoSend("");
            setFile(null);
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
            <h2 style={{marginLeft:'10px'}}>Public Channel</h2>
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
            <div className="input-container">
                <FileHandler setFile={setFile}/>
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

export default Chatdorm;