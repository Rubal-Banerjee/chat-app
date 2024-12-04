import { IoSearchSharp } from "react-icons/io5";
import useConversations from "./hooks/useConversations";
import { useState } from "react";
import { userConversations } from "./zustand/userConversations";
import axios from "axios";

const SearchBar = () => {
  const { conversations } = useConversations();
  const { setSelectedConversations, setMessages } = userConversations();
  const [filter, setFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!filter) return;
        setIsLoading(true);

        const conversation = conversations.find((element) =>
          element.fullName.toLowerCase().includes(filter.toLowerCase())
        );
        if (conversation) {
          setSelectedConversations(conversation);
          setFilter("");
        }

        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/message/${conversation?.id}`,
            { withCredentials: true }
          );
          setMessages(response.data);
        } catch (error) {
          console.log("Error while getting the messages: ", error);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <input
        placeholder="Search..."
        type="text"
        className="input-sm md:input input-bordered rounded-full md:rounded-full w-full"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <button
        type="submit"
        className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white"
      >
        {isLoading ? (
          <span className="loading loading-spinner" />
        ) : (
          <IoSearchSharp className="w-4 h-4 md:w-6 md:h-6 outline-none" />
        )}
      </button>
    </form>
  );
};

export default SearchBar;
