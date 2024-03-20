import React, { useState } from "react";
import "../App.css";
import { authInstance } from "../services/instance";
import { ColorRing } from "react-loader-spinner";

function EmailSend() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMailSend = async (e) => {
    try {
      e.preventDefault();

      // const email = JSON.parse(sessionStorage.getItem('User')).user.email;
      setLoading(true);

      const mail = await authInstance.post("/reset-password", { email });

      setLoading(false);

      // console.log('Password Reset Mail send successfully', mail);
      setMessage("Password Reset Mail send successfully,check both inbox and spam mails");
      setEmail("");
    } catch (error) {
      // console.error('Error in sending mail', error);
      setMessage("Error in sending mail");
      setLoading(false);
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
                  <label htmlFor="email" className="mb-2">
                    <strong className="fs-4 p-3 ">Email ID</strong>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    style={{border:"2px solid"}}
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex">
                  {loading ? (
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4 mx-auto "
                    >
                      <ColorRing
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[
                          "#abbd81",
                          "#f8b26a",
                          "#849b87",
                          "#e15b64",
                          "#f47e60",
                        ]}
                      />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4 mx-auto "
                    >
                      Submit
                    </button>
                  )}
                </div>
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
