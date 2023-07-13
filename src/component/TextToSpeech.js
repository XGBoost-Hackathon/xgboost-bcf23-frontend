import React, { useState } from 'react';
import UilMicrophone from '@iconscout/react-unicons/icons/uil-microphone';

const TextToSpeech = ({text}) => {
    const [isSpeaking, setIsSpeaking] = useState(false)
    //   const [text, setText] = useState('');

    //   const handleInputChange = (event) => {
    //     setText(event.target.value);
    //   };

  const handleSpeak = () => {
    if(!isSpeaking){
      setIsSpeaking(true)
      const speechUtterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speechUtterance);
    }
    if(isSpeaking){
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
    }
  };

  return (
    <div>
    <UilMicrophone onClick={handleSpeak}/>
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

export default TextToSpeech;
