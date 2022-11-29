import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import routes from "../Config/routes";

// A standard body item for the routed content panel in this project
export default function Body() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) setTransitionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <Box 
      component="main"
      sx={{ display: 'flex', width: '100%', minHeight: '100vh',  paddingLeft: '30px', padding: '30px', overflow: 'auto' }}
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransitionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}>
        <Grid container spacing={3}>
          <Routes location={displayLocation}>
            {routes.map((route, index) => {
              return (<Route key={index} path={route.url} element={route.component} />)
            })}
          </Routes>
        </Grid>
    </Box>
  );
}