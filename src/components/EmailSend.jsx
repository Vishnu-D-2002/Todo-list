import React, { useState } from "react";
import "../App.css";
import { authInstance } from "../services/instance";

function EmailSend() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleMailSend = async (e) => {
    try {
      e.preventDefault();

      const email = JSON.parse(sessionStorage.getItem('User')).user.email;
      
      const mail = await authInstance.post("/reset-password", { email });

      // console.log('Password Reset Mail send successfully', mail);
      setMessage("Password Reset Mail send successfully,check both inbox and spam mails");
      setEmail("");
    } catch (error) {
      // console.error('Error in sending mail', error);
      setMessage("Error in sending mail");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Reset Password</h2>
              <form onSubmit={handleMailSend}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                >
                  Submit
                </button>
              </form>
              {message && (
                <div className="alert alert-success mt-3">{message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSend;
