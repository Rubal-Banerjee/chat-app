import React, { useState } from "react";
import Header from "./Header";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";

const MessageContainer = () => {
  const [chatSelected, setChatSelected] = useState<boolean>(false);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {chatSelected ? (
        <>
          <Header />
          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default MessageContainer;
