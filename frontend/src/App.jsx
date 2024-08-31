import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("http://localhost:5004");

function App() {
  const [messageData, setMessageData] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("joinRoom", room);
    }
  };

  const sendMessage = () => {
    socket.emit("sendMessage", { messageData, room });
    setMessageData("");
  };

  useEffect(() => {
    socket.on("receviedMessage", (data) => {
      setMessageRecieved(data.messageData);
    });
  }, [socket]);

  console.log(messageRecieved);

  return (
    <>
      <div>
        <input
          placeholder="Room Number.."
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
        <input
          placeholder="message...."
          value={messageData}
          onChange={(e) => {
            setMessageData(e.target.value);
          }}
        />
        <button onClick={() => sendMessage()}>Send Message</button>
        <h1>Message:{messageRecieved}</h1>
      </div>
    </>
  );
}

export default App;
