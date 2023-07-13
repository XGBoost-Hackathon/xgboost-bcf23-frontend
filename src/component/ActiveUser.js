import React, { useEffect, useState } from 'react'

function ActiveUser({ socketRef, user, gotoRoom }) {

    const [pinged, setPinged] = useState({});

    useEffect(() => {
        socketRef?.current?.on('receive_ping', (data) => {
            if(data.username===user)
                setPinged({border:'2px solid blue'})
            console.log(data);
        });
        return () => {
            socketRef?.current?.off('receive_ping');
        };
    }, []);

    const sendPing = () => {
            const newPing = {
                username: socketRef?.username,
                otherperson: user
            };
            socketRef?.current?.emit("send_ping", newPing);
    };

  return (
    <div className='state' style={pinged}>
      <div className="user-info" onClick={()=>gotoRoom(user)}>
        <span className="username">{user}</span>
      </div>
        <button style={{float:'right'}} onClick={sendPing}>Ping</button>
    </div>
  )
}

export default ActiveUser;