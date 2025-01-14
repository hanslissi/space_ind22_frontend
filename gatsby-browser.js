import "./src/styles/global.css";

export const onRouteUpdate = ({ location, prevLocation }) => {
  const isMaintenanceMode = process.env.GATSBY_MAINTENANCE_MODE === "true";
    console.log(process.env.GATSBY_MAINTENANCE_MODE)
  if (
    isMaintenanceMode &&
    !location.pathname.includes("/coming-soon") &&
    typeof window !== "undefined"
  ) {
    window.location.href = "/coming-soon";
  }
};
