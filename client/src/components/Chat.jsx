import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Chat({ room, userName, socket }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const handleMessage = (data) => {
      setMessageList((prev) => [...prev, data]);
    };

    socket.on("messageReturn", handleMessage);

    return () => {
      socket.off("messageReturn", handleMessage); // Cleanup function
    };
  }, [socket]);

  const sendMessage = async () => {
    if (!message.trim()) return; // Boş mesaj göndermeyi önle

    const messageContent = {
      username: userName,
      message: message,
      room: room,
      date: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-[600px] bg-indigo-700 rounded-lg shadow-xl p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-2 h-full">
          {/* Header */}
          <div className="w-full flex items-center bg-indigo-600 rounded-lg p-3 shadow-md">
            <div className="w-12 h-12 bg-white rounded-full"></div>
            <div className="ml-4 text-white font-semibold">
              Chat Room: {room}
            </div>
          </div>

          {/* Message Area */}
          <div className="w-full overflow-y-auto h-full bg-indigo-800 rounded-lg p-4 flex flex-col gap-4">
            {messageList.map((msg, i) => (
              <div
                key={i}
                className={`w-full flex ${
                  msg.username === userName ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex flex-col p-3 rounded-lg shadow-md text-white text-sm max-w-[80%] ${
                    msg.username === userName
                      ? "bg-indigo-500"
                      : "bg-indigo-600"
                  }`}
                >
                  {msg.message}
                  <div className="text-[10px] text-right w-full mt-1">
                    {msg.username} - {msg.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex items-center space-x-3 mt-4">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="w-full p-3 border border-transparent rounded-lg text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-400 focus:outline-none transform hover:scale-105 transition duration-200 cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Chat.propTypes = {
  room: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired,
};

export default Chat;
