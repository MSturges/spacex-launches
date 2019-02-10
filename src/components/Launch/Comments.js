import React from "react";
import "../../App.css";

const Comments = ({ data }) => {
  const getFormattedTimeStamp = date => {
    const formatDate = new Date(date);
    const hours = formatDate.getHours();
    const minutes =
      (formatDate.getMinutes() < 10 ? "0" : "") + formatDate.getMinutes();
    return `${hours}:${minutes}`;
  };

  return (
    <ul data-testid="launches" className="card">
      {data.map(({ id, date, author, body }) => {
        return (
          <li key={id} className="timeline-item">
            <div className="comment">
              <div className="custom-row">
                <div className="text-left timeline-autor author-font">
                  {author}
                </div>
                <div className="text-right timeline-time ">
                  {getFormattedTimeStamp(date)}
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Comments;
