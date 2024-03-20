import React, { useState } from "react";
import { Link } from "react-router-dom";
import { protecdInstance } from "../services/instance";
import { ColorRing } from "react-loader-spinner";

function Active() {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleActive = async (e) => {
    e.preventDefault();
    const currentURL = window.location.href;
    const match = currentURL.slice(-7);

    if (match) {
      const activationToken = match;
      // console.log(activationToken);
      try {
        setLoading(true);

        const res = await protecdInstance.get(`/activate/${activationToken}`);
        setLoading(false);

        if (res.data) {
          // console.log("Activation successful:", res.data);
          setInfo(res.data.message);
        } else {
          // console.error("No data received in the response");
          setInfo("Error occurred during activation");
        }
      } catch (error) {
        // console.error("Error occurred during activation", error);
        setInfo("Error occurred during activation");
      }
    } else {
      // console.error("URL format doesn't match the expected pattern");
      setInfo("Invalid activation link");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card p-5">
            <h2 className="mb-4">
              To activate your account, please click the button below:
            </h2>
            {loading ? (
              <button
                className="btn btn-success btn-block"
                onClick={handleActive}
                disabled
              >
                <ColorRing
                  visible={true}
                  height={40}
                  width={40}
                  ariaLabel="color-ring-loading"
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#abbd81",
                    "#f8b26a",
                    "#849b87",
                    "#e15b64",
                    "#f47e60",
                  ]}
                />
                <span className="visually-hidden">Loading...</span>
              </button>
            ) : (
              <button
                className="btn btn-success btn-block"
                onClick={handleActive}
              >
                Activate
              </button>
            )}
            {info && <p className="mt-3 text-danger fs-5 text-center mb-0">{info}</p>}
            <p className="mt-3 text-center fs-5 mb-0">
              Already have an account?{" "}
              <Link to="/" className="text-decoration-none">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Active;
