import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UilMicrophone from '@iconscout/react-unicons/icons/uil-microphone';

const VoiceRecorder = ({isRecording, setIsRecording, setMessagetoSend}) => {
  const [recording, setRecording] = useState(isRecording);
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  useEffect(() => {
    // Check browser support for the Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Web Speech API is not supported in this browser.');
    }
  }, []);

  const toggleRecording = () => {
    if (!recording) {
      startRecording();
      setIsRecording(true);
    } else {
      stopRecording();
      setIsRecording(false);
    }
  };

  const startRecording = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log('Recording started...');
      setRecording(true);
      setAudioChunks([]);
    };

    recognition.onresult = (event) => {
      const { transcript } = event.results[event.results.length - 1][0];
      console.log('Transcript:', transcript);
      setMessagetoSend(transcript)
    };

    recognition.onend = (event) => {
      console.log('Recording ended.');
      setRecording(false);
      stopMediaStream();
      sendVoiceData();
    };

    recognition.start();

    // Start capturing audio stream
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        const mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            setAudioChunks((chunks) => [...chunks, event.data]);
          }
        });
        mediaRecorder.start();
      })
      .catch((error) => {
        console.log('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    const recognition = window.webkitSpeechRecognition;
    if (recognition && recognition.stop) {
      recognition.stop();
    }
    stopMediaStream();
  };

  const stopMediaStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const sendVoiceData = () => {
    if (audioChunks.length > 0) {
    //   const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    //   const formData = new FormData();
    //   formData.append('voiceFile', audioBlob, 'voice.webm');

    //   axios.post('/api/upload', formData)
    //     .then((response) => {
    //       console.log('Voice file uploaded successfully:', response.data);
    //     })
    //     .catch((error) => {
    //       console.log('Error uploading voice file:', error);
    //     });
    console.log('audiochunk: ', audioChunks);
    }
  };

  return (
    <div>
      <div onClick={toggleRecording} className="custom-file-upload">
        {/* {recording ? 'Stop Recording' : 'Start Recording'} */}
        <UilMicrophone size={20}/>
      </div>
    </div>
  );
};

export default VoiceRecorder;
