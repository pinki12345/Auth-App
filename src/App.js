import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Auth } from "./components/Auth";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import LoginContainer from "./components/LoginContainer";

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <div className="dashboard">
      <Routes>
        <Route
          path={"/"}
          element={<LoginContainer setToken={setToken}></LoginContainer>}
        ></Route>

        {token && (
          <Route path={"/auth"} element={<Auth token={token}></Auth>}></Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
