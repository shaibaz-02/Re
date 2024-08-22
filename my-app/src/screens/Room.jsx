import React, {useEffect, useCallback, useState} from "react";
import peer from "../service/peer";
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
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  // const sendStreams = useCallback(() => {
  //   for (const track of myStream.getTracks()) {
  //     peer.peer.addTrack(track, myStream);
  //   }
  // }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      // sendStreams();
    },
    []
  );
  useEffect(()=>{
    socket.on('user:joined',handleUserJoined);
    socket.on('user:incoming',handleIncommingCall);
    socket.on("user:accepted",handleCallAccepted);
    return ()=>{
      socket.off("user:joined",handleUserJoined);
      socket.off('user:incoming',handleIncommingCall);
      socket.off("user:accepted",handleCallAccepted);
    }
  },[socket,handleUserJoined,handleIncommingCall,handleCallAccepted])
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
            height="100px"
            width="200px"
            url={myStream}
          />
        </>
      )}
    </div>
  )
}

export default RoomPage
