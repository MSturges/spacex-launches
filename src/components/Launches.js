import React from "react";
import "../App.css";

import Launch from "./Launch/Launch";

const Launches = ({ launches }) => {
  let alignTimelineItem = "left";
  const launchesByDate = launches.reduce((list, launch) => {
    const date = launch.launch_date_utc.slice(0, 4);

    // const launchDateFormatForSort = launch.launch_date_utc
    //   .slice(0, 10)
    //   .split("-")
    //   .join("");

    list[date] = list[date] || [];
    list[date].push(launch);

    return list;
  }, {});

  return (
    <ul data-testid="launches" className="timeline timeline-variant">
      {Object.keys(launchesByDate).map(launchDate => {
        return (
          <span key={launchDate}>
            <li className="timeline-month">{launchDate}</li>
            {launchesByDate[launchDate].map((launch, i) => {
              const itemAlignment = alignTimelineItem;
              if (alignTimelineItem === "left") {
                alignTimelineItem = "right";
              } else {
                alignTimelineItem = "left";
              }
              return (
                <Launch
                  key={launch.id + launch.launch_date_utc}
                  launch={launch}
                  itemAlignment={itemAlignment}
                />
              );
            })}
          </span>
        );
      })}
    </ul>
  );
};

export default Launches;
