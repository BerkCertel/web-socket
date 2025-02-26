function Chat() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-[500px] bg-indigo-700 rounded-lg shadow-lg p-8 flex flex-col items-center justify-around selection:bg-black selection:text-white ">
        <div>
          <div>
            <label htmlFor=""></label>
            <input type="text" placeholder="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
