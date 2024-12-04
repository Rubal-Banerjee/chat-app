import axios from "axios";
import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { userConversations } from "./zustand/userConversations";

const MessageInput = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedConversation, setMessages, messages } = userConversations();

  return (
    <form
      className="px-4 my-3"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!selectedConversation) return;
        if (!message.trim()) return;
        setLoading(true);
        try {
          const response = await axios.post(
            `http://localhost:8000/api/v1/message/send/${selectedConversation?.id}`,
            { message },
            { withCredentials: true }
          );
          if (response.data) {
            setMessages([...messages, response.data]);
          }
        } catch (error) {
          console.log("Error while sending the message: ", error);
        } finally {
          setMessage("");
          setLoading(false);
        }
      }}
    >
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            <BsSend className="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
