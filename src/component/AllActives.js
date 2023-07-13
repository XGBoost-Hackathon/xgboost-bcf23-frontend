import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActiveUser from './ActiveUser';
import UilRefresh from '@iconscout/react-unicons/icons/uil-refresh';

function AllActives({ socketRef }) {
  const [actives, setActives] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);

  useEffect(()=>{
    async function fetchActives(){
        const response = await axios.get(socketRef.current?.io.uri+'/actives');
        setActives(response.data.sockets.filter(socket=>socket.username!==socketRef.username));
        console.log(response.data.sockets);
    }
    fetchActives();
  },[refresh])

  const gotoRoom = (otherperson) => {
    navigate(`/privatechat/${otherperson}`);
  }

  const gotoPublic = () => {
    navigate(`/chat`);
  }

  const disconnect = () => {
    socketRef.current?.disconnect();
    while(socketRef.current?.connected){
      console.log('disconnecting...');
    }
    navigate('/');
  }

  return (
    <div className='allactives'>
      <h2>Active Now ({actives.length})<span className='refreshbtn' onClick={()=>setRefresh(refresh+1)}><UilRefresh size={15} color={'#00aaff'}/></span></h2>

      {actives.map((active,key)=>{
        return <ActiveUser key={key} socketRef={socketRef} user={active.username} gotoRoom={gotoRoom}/>
      })}
      <div style={{height:'30px'}}></div>
      <div className='state'>
        <div className="user-info" onClick={()=>gotoRoom('gpt')}>
          <span className="username">Friend GPT</span>
        </div>
      </div>
      <div className='state'>
        <div className="user-info" onClick={()=>gotoPublic()}>
          <span className="username">Public</span>
        </div>
      </div>
      <div style={{height:'50px'}}></div>
      <button style={{marginRight:'20px'}} onClick={disconnect}>Disconnect</button>
      {socketRef.username}
    </div>
  )
}

export default AllActives;