import React, {useEffect, useCallback, useState} from "react";
// import ReactPlayer from "react-player";
import {useSocket} from '../context/SocketProvider'
const RoomPage=()=>{
  const socket = useSocket();
  // const [remoteSocketId, setRemoteSocketId] = useState(null);
  const handleUserJoined=useCallback(({email,id})=>{
    console.log(`Email ${email} joined the room`);
    // setRemoteSocketId(id);
  },[])
  useEffect(()=>{
    socket.on('user:joined',handleUserJoined);
    return ()=>{
      socket.off("user:joined",handleUserJoined);
    }
  },[socket,handleUserJoined])
  return (
    <div>
      <h1>Room page</h1>
      {/* <h4>{remoteSocketId?"Connected":"No one in room"}</h4> */}
    </div>
  )
}

export default RoomPage
