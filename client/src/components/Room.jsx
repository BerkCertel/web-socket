import PropTypes from "prop-types";

function Room({ userName, setUserName, room, setRoom, setChatScreen, socket }) {
  const sendRoom = () => {
    socket.emit("room", room);
    setChatScreen(true);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-[500px] bg-indigo-700 rounded-lg shadow-lg p-8 flex flex-col items-center justify-around  ">
        <h1 className="text-3xl font-semibold text-white mb-6">
          Welcome to the Chat
        </h1>

        <div className="w-full mb-4">
          <label
            htmlFor="user"
            className="block text-white text-lg font-medium mb-2"
          >
            User Name
          </label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="user"
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 rounded-md border border-gray-50 focus:outline-none focus:ring-2 focus:ring-black text-white placeholder:text-white "
          />
        </div>

        <div className="w-full mb-6">
          <label
            htmlFor="room"
            className="block text-white text-lg font-medium mb-2"
          >
            Room Code
          </label>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            id="room"
            type="text"
            placeholder="Enter room code"
            className="w-full p-3 rounded-md border border-gray-50 focus:outline-none focus:ring-2 focus:ring-black text-white placeholder:text-white"
          />
        </div>

        <button
          onClick={sendRoom}
          className="w-full py-3 border bg-indigo-900 text-white font-bold rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer transition-all duration-300 tracking-wider "
        >
          Start Chat
        </button>
      </div>
    </div>
  );
}

Room.propTypes = {
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
  setRoom: PropTypes.func.isRequired,
  setChatScreen: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
};

export default Room;
