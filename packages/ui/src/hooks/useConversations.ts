import { isLoading } from "@repo/ui/isLoading";
import { ConversationProps } from "@repo/ui/userConversations";
import axios from "axios";
import { useEffect, useState } from "react";

const useConversations = () => {
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const { setLoading } = isLoading();

  useEffect(() => {
    setLoading(true);

    try {
      axios
        .get("http://localhost:8000/api/v1/message/conversations", {
          withCredentials: true,
        })
        .then((response) => {
          setConversations(response.data);
        });
    } catch (error) {
      console.log("Error while getting the conversations: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    conversations,
  };
};

export default useConversations;
