import { useState, useRef } from "react";
import io from "socket.io-client";
import Room from "./components/Room";
import Chat from "./components/Chat";
import "./App.css";
function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [chatScreen, setChatScreen] = useState(false);

  const socketRef = useRef(null);

  if (!socketRef.current) {
    socketRef.current = io.connect("http://localhost:5000");
  }

  return (
    <div className="bg-black h-screen selection:bg-black selection:text-white ">
      {!chatScreen ? (
        <Room
          userName={userName}
          setUserName={setUserName}
          room={room}
          setRoom={setRoom}
          setChatScreen={setChatScreen}
          socket={socketRef.current}
        />
      ) : (
        <Chat userName={userName} room={room} socket={socketRef.current} />
      )}
    </div>
  );
}

export default App;
