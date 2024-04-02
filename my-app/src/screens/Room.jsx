import React, {useEffect, useCallback, useState} from "react";
import ReactPlayer from "react-player";
import {useSocket} from '../context/SocketProvider'
const RoomPage=()=>{
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const handleUserJoined=useCallback(({email,id})=>{
    console.log(`Email ${email} joined the room`);
    setRemoteSocketId(id);
  },[])
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer=await peer.getOffer();
    socket.emit("user:call",{ to:remoteSocketId,offer});
    setMyStream(stream);
  }, [remoteSocketId,socket]);
  useEffect(()=>{
    socket.on('user:joined',handleUserJoined);
    return ()=>{
      socket.off("user:joined",handleUserJoined);
    }
  },[socket,handleUserJoined])
  return (
    <div>
      <h1>Room page</h1>
      <h4>{remoteSocketId?"Connected":"No one in room"}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="500px"
            width="500px"
            url={myStream}
          />
        </>
      )}
    </div>
  )
}

export default RoomPage
