import React, { useState } from "react";
import { Link } from "react-router-dom";
import { protecdInstance } from "../services/instance";
import { ColorRing } from "react-loader-spinner";
function Active() {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleactive = async (e) => {
    e.preventDefault();
    const currentURL = window.location.href;
    const match = currentURL.slice(-7);

    if (match) {
      const activationToken = match;
      console.log(activationToken);
      try {
        setLoading(true);

        const res = await protecdInstance.get(`/activate/${activationToken}`);
        // console.log('Response:', res);
        setLoading(false);

        if (res.data) {
          console.log("Activation successful:", res.data);
          setInfo(res.data.message);
        } else {
          console.error("No data received in the response");
        }
      } catch (error) {
        console.error("Error occurred during activation", error);
      }
    } else {
      console.error("URL format doesn't match the expected pattern");
    }
  };

  return (
    <div>
      <div className="m-5 d-flex flex-column ">
        <h2>
          To activate your Account please click the link below,else ignore it.{" "}
        </h2>
        {loading ? (
          <button
            className="btn btn-success mx-auto mt-4"
            onClick={handleactive}
            id="btn"
          >
            <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#abbd81", "#f8b26a", "#849b87", "#e15b64", "#f47e60"]}
            />
          </button>
        ) : (
          <button
            className="btn btn-success mx-auto mt-4"
            onClick={handleactive}
            id="btn"
          >
            Activate
          </button>
        )}
        <p className="fs-3 text-danger ">{info}</p>
        <Link to="/" className="fs-3 text-decoration-none mx-auto">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Active;
