import React from 'react'
import '../styles/state.css'

function State({ state, fillState, onDelete }) {
  return (
    <div className='state'>
      <div className="user-info" onClick={()=>fillState(state)}>
        <span className="username">{state.username}</span>
        <small className="address">http://{state.ipv4}:{state.port}</small>
      </div>
      <button className="delete-button" onClick={()=>onDelete(state)}>
        
      </button>
    </div>
  )
}

export default State;