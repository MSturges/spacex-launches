import React from "react";
import "../../App.css";

const Video = ({ playVideo, toggleVideo, url }) => {
  return (
    <>
      {playVideo ? (
        <div className="video-responsive">
          <iframe
            width="560"
            height="315"
            src={url}
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={url}
          />
        </div>
      ) : null}
      <button
        className="btn btn-primary video-button "
        onClick={() => toggleVideo(!playVideo)}
      >
        {playVideo ? "Hide Video" : "Load Video"}
      </button>
    </>
  );
};

export default Video;
