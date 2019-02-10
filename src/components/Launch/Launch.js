import React, { useState } from "react";
import "../../App.css";
import { GraphQLClient } from "graphql-request";

import Loading from "../Loading";
import Video from "./Video";
import Comments from "./Comments";

const commentsClient = new GraphQLClient(
  "https://pb3c6uzk5zhrzbcuhssogcpq74.appsync-api.us-east-1.amazonaws.com/graphql",
  {
    headers: {
      "x-api-key": "da2-tadwcysgfbgzrjsfmuf7t4huui"
    }
  }
);

const commentsByFlightNumberQuery = `query($flightNumber: Int!){
  launchCommentsByFlightNumber(
    flightNumber: $flightNumber
    limit: 10
  ) {
    items {
      id
      flightNumber
      date
      body
      author
    }
  }
}`;

const Launch = ({ launch, itemAlignment }) => {
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [attemptedFetch, setAttemptedFetch] = useState(false);
  const [showVideo, toggleVideo] = useState(false);
  let videoEmbed;

  if (launch.links.video_link) {
    videoEmbed = launch.links.video_link.replace("/watch?v=", "/embed/");
  }

  const launchIcon = launch.launch_success ? (
    <i className="icon mdi mdi-rocket mdi-text-red" />
  ) : (
    <i className="icon mdi mdi-bomb" />
  );

  const getCommentsByFlightNumber = flightNumber => {
    setloading(true);
    const variables = {
      flightNumber
    };
    commentsClient
      .request(commentsByFlightNumberQuery, variables)
      .then(res => {
        setloading(false);
        setAttemptedFetch(true);
        setData(res.launchCommentsByFlightNumber.items);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  return (
    <li className={`timeline-item timeline-item-detailed ${itemAlignment}`}>
      <div className="timeline-content timeline-type file">
        <div className="timeline-icon">{launchIcon}</div>

        <div className="timeline-header">
          <span className="timeline-autor">
            #{launch.id}: {launch.mission_name}
          </span>
          <p className="timeline-activity">
            {launch.rocket.rocket_name} &mdash; {launch.launch_site.site_name}
          </p>
          <span className="timeline-time">
            {launch.launch_date_utc.slice(0, 10)}
          </span>
        </div>
        <div className="timeline-summary">
          <p>{launch.details ? launch.details : "No details at this time"}</p>
          {videoEmbed ? (
            <Video
              showVideo={showVideo}
              toggleVideo={toggleVideo}
              url={videoEmbed}
            />
          ) : (
            "No Video Available"
          )}
          <br />
          {data.length >= 1 ? <Comments data={data} /> : ""}
          {loading ? (
            <Loading />
          ) : !attemptedFetch ? (
            <button
              className="btn btn-primary"
              onClick={() => getCommentsByFlightNumber(launch.id)}
            >
              Load first 10 Comments
            </button>
          ) : data.length >= 1 ? (
            ""
          ) : (
            "No Comments Available"
          )}
        </div>
      </div>
    </li>
  );
};

export default Launch;
