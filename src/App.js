import React from "react";
import "./App.css";
import Home from "./pages/home/index";
import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <UserContextProvider>
      <Home />
    </UserContextProvider>
      
  );
}

export default App;
