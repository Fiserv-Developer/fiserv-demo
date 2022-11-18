import { Box, Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import routes from "../Config/routes";

// A standard body item for the routed content panel in this project
export default function Body() {
  const theme = useTheme();
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <Box
      component="main"
      color={theme.palette.text.main} 
      backgroundColor={theme.palette.primary.main} 
      sx={{ display: 'flex', width: '100%', minHeight: '100vh',  paddingLeft: '30px', padding: '30px', overflow: 'auto'}}
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransistionStage("fadeIn");
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