import {
  ConversationProps,
  userConversations,
} from "./zustand/userConversations";
import { isLoading } from "./zustand/isLoading";
import axios from "axios";

const Conversation = ({ id, fullName, profilePicture }: ConversationProps) => {
  const { setSelectedConversations, setMessages, selectedConversation } =
    userConversations();
  const { setLoading } = isLoading();

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${selectedConversation?.id === id && "bg-sky-500"}`}
        onClick={async () => {
          setLoading(true);
          setSelectedConversations({ id, fullName, profilePicture });
          try {
            const response = await axios.get(
              `http://localhost:8000/api/v1/message/${id}`,
              { withCredentials: true }
            );
            setMessages(response.data);
          } catch (error) {
            console.log("Error while getting the messages: ", error);
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="avatar online">
          <div className="w-8 md:w-12 rounded-full">
            <img src={profilePicture!} alt="User avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 text-sm md:text-base">
              {fullName}
            </p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
