import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client';
import Input from '../component/Input';
import SavedStates from '../component/SavedStates';
import '../styles/loginpage.css';


function Loginpage({ socketRef }) {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  // const [ipv4, setIpv4] = useState('localhost');
  // const [port, setPort] = useState('8000');
  const [address, setAddress] = useState('');
  const [savethisInfo, setSavethisInfo] = useState(false);
  const [errormsg, setErrommsg] = useState("");

  const connect = () => {
    if(username.trim()===''){
      setErrommsg('Username can\'t be empty!');
      return;
    }
    socketRef.current?.disconnect();
    // if (!socketRef.current) {
      // socketRef.current = io.connect('http://'+ipv4+':'+port, {
        
      socketRef.current = io.connect(address, {
        query: { username: username },
      });
    // }
    
    socketRef.current?.on("connected", (u) => {
      console.log(`${u} connected successfully`);
      socketRef.username = username;
      if(savethisInfo===true) saveState();
      setSavethisInfo(false)
      navigate('/chat');
    });

    socketRef.current?.on("connect_error", (error) => {
      if (error.message === "xhr poll error") {
        setErrommsg("Server not found. Please check the ip address and port number again.");
        console.error("Server address not found");
      } else {
        console.error("Socket connection error:", error);
      }
    });

    socketRef.current?.on("username_taken", (duplicate) => {
      setErrommsg("Username is currently in use. Please try with a different username.");
    });
  }

  const saveState = () => {
    const savedStates = localStorage.getItem('loginStates')
    const parsedState = savedStates?JSON.parse(savedStates):[]
    const loginState = {
      username: username,
      address:address
      // ipv4: ipv4,
      // port: port
    };

    
    if(parsedState.find(prevstate=>
                        prevstate.username===loginState.username&&
                        prevstate.address===loginState.address)
                        // prevstate.ipv4===loginState.ipv4&&
                        // prevstate.port===loginState.port)
      ) return;
    if(parsedState.length>1)
      parsedState.pop();
    parsedState.unshift(loginState);
    localStorage.setItem('loginStates', JSON.stringify(parsedState));
  }

  return (
    <div className='loginpage'>
      <h1>Megh</h1>
      <div style={{ 'height': '6vh' }}></div>
      <Input label={'Username'} value={username} setValue={setUsername} />
      {/* <Input label={'Server Ipv4'} value={ipv4} setValue={setIpv4} />
      <Input label={'Port'} value={port} setValue={setPort} /> */}
      <Input label={'Address'} value={address} setValue={setAddress} />
      {errormsg && <small style={{color:'red'}}>{errormsg}</small>}
      <div style={{ 'height': '3vh' }}></div>
      <small>Save this login information
        <input
          type={'checkBox'}
          style={{ verticalAlign: 'middle' }}
          value={savethisInfo}
          onChange={()=>setSavethisInfo(!savethisInfo)}/>
      </small> 
      <div style={{ 'height': '3vh' }}></div>
      <button onClick={connect}>Connect</button>
      <div style={{ 'height': '6vh' }}></div>
      <SavedStates setAddress={setAddress} setUsername={setUsername}/>
    </div>
  )
}

export default Loginpage;