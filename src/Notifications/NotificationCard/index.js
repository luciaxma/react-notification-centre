import React from 'react';

import "./Styles.css";

const NotificationCard = ({ data, onClick }) => {

  const {
    message,
    read,
    receivedTime,
    title,
    tag
  } = data;

  let tagStatus = "";

  if (tag === "Warning") {
    tagStatus = "warning";
  } else if (tag === "Error") {
    tagStatus = "error";
  } else {
    tagStatus = "normal";
  }

  return (
    <div
      className={read ? "notification-card-container read" : "notification-card-container"}
      onClick={onClick}
    >
      <div className="notification-card-title">{title}</div>
      <div className="notification-card-message">{message}</div>

      <div className="notification-card-bottom-container">
        <div className="notification-card-receivedTime">{receivedTime}</div>
        {tag !== "" && <div className={`notification-card-tag ${tagStatus}`}>{tag}</div>}
      </div>

    </div>
  );
}

export default NotificationCard;
