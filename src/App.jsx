import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Active from "./components/active";
import ResetPassword from "./components/ResetPassword";
import EmailSend from "./components/EmailSend";
import Notes from "./components/Notes";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/notes" element={<Notes />} />
          <Route path="/" element={<Login />} />
          <Route path="/reset-email" element={<EmailSend />} />
          <Route
            path="/resetPassword/:randomString"
            element={<ResetPassword />}
          />
          <Route path="/activate/:activationToken" element={<Active />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;