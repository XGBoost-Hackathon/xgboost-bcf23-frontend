import React from 'react'
import '../styles/Input.css'

function Input({ label, placeholder, value, setValue }) {
  return (
    <div className='Input'>
        <label className="Input-label">{label} :</label>
        <input className="Input-input" type="text" value={value} onChange={(e)=>setValue(e.target.value)} placeholder={placeholder}/>
    </div>
  )
}

export default Input;