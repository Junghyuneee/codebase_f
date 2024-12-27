import { memo } from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";

const NotificationItem = ({ notification }) => {

  const timeFromNow = timestamp => moment(timestamp).fromNow();

  const markAsReadStyle = {
    cursor: "pointer",
    color: "inherit",
    textDecoration: "none",
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = "red";
    e.target.style.textDecoration = "underline";
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = "inherit";
    e.target.style.textDecoration = "none";
  };

  return (
    <div className="d-flex flex-column">
      <p>{notification.content}</p>
      <div className="w-full d-flex justify-content-between">
        <div>
          {timeFromNow(notification.createdAt)}
        </div>
        <div
          className="w-full text-right"
          style={markAsReadStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          삭제
        </div>
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    content: PropTypes.string.isRequired,
    read: PropTypes.bool.isRequired,
    createdAt: PropTypes.object.isRequired
  }).isRequired,
};

export default memo(NotificationItem);