import "./src/styles/global.css";
import React from "react";
import ComingSoon from "./src/pages/coming-soon";

const isMaintenanceMode = process.env.GATSBY_MAINTENANCE_MODE === "true";

export const wrapPageElement = ({ element, props }) => {
  // Show maintenance page for all routes except the maintenance page itself
  if (isMaintenanceMode && props.location.pathname !== "/coming-soon/") {
    return <ComingSoon />;
  }

  return element;
};
