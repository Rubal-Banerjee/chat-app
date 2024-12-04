import { isLoading } from "@repo/ui/isLoading";
import { userAuth } from "@repo/ui/userAuth";
import axios from "axios";
import { useEffect } from "react";

const useGetUser = () => {
  const { setUser } = userAuth();
  const { setLoading } = isLoading();

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:8000/api/v1/auth/me", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
      });

    setLoading(false);
  }, []);
};

export default useGetUser;
