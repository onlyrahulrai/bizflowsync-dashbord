import React from "react";
import { Link } from "react-router-dom";

const NotificationDropdown = () => {
  return (
    <>
      <Link
        className="text-blueGray-500 py-1 px-3"
        to="/admin/tables"
      >
        <i className="fas fa-ellipsis-v"></i>
      </Link>
    </>
  );
};

export default NotificationDropdown;
