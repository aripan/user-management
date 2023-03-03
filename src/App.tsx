import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LogIn from "./components/UserManagement/LogIn";
import Register from "./components/UserManagement/Register";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};
export default App;
