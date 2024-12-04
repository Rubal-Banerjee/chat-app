import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { userAuth } from "@repo/ui/userAuth";
import { isLoading } from "@repo/ui/isLoading";
import useGetUser from "./hooks/useGetUser";
import { Loader } from "./Loading";

function App() {
  useGetUser();

  const { user } = userAuth();
  const { loading } = isLoading();
  const authenticatedUser = user;

  return (
    <>
      <BrowserRouter>
        <div className="p-4 h-screen flex items-center justify-center">
          {loading && <Loader />}
          <Routes>
            <Route
              path="/"
              element={
                authenticatedUser ? <Home /> : <Navigate to={"/signin"} />
              }
            />
            <Route
              path="/signup"
              element={authenticatedUser ? <Navigate to={"/"} /> : <Signup />}
            />
            <Route
              path="/signin"
              element={authenticatedUser ? <Navigate to={"/"} /> : <Signin />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
