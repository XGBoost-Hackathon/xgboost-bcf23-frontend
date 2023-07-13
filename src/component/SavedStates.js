import React, { useState } from 'react'
import { useEffect } from 'react';
import State from './State';

function SavedStates({ setIpv4, setPort, setUsername }) {

  const [states, setStates] = useState([]);
    
  useEffect(() => {
    const savedState = localStorage.getItem('loginStates');
    if (savedState) {
      setStates(JSON.parse(savedState));
      console.log(states);
    }
  }, []);

  const fillState = (state) => {
    setIpv4(state.ipv4);
    setPort(state.port);
    setUsername(state.username);
  }

  const onDelete = (state) => {
    const updated = states.filter(s=>{return s!==state})
    console.log(updated);
    setStates(updated);
    localStorage.clear();
    localStorage.setItem('loginStates', JSON.stringify(updated));
  }

  return (
    <div>
      <h5 style={{fontWeight:'600'}}> Saved Connections: (Last Two)</h5>
      {states.map((state,key)=>{
        return <State key={key} state={state} fillState={fillState} onDelete={onDelete}/>
      })}
    </div>
  )
}

export default SavedStates;