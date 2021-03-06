import React from "react";
import "./App.css";
import World from "./components/World.js";
import IndoData from "./components/IndoData.js";
import Countries from "./components/Countries.js";
import Provinsi from "./components/Provinsi.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { RiVirusFill } from "react-icons/ri";
import Divider from "@material-ui/core/Divider";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "#b3e5fc", height: "75%" }}
        >
          <Box textAlign="center" m={1}>
            <h2>
              {" "}
              <RiVirusFill></RiVirusFill>Covid-19 Statistics
              <RiVirusFill></RiVirusFill>
            </h2>
            <World></World>
            <Divider style={{ marginTop: "30px" }} />
            <Countries></Countries>
            <Divider style={{ marginTop: "10px" }} />
            <IndoData></IndoData>
            <Divider style={{ marginTop: "30px" }} />
            <Provinsi></Provinsi>
            <Divider style={{ marginTop: "20px" }} />
            <footer>
              <strong>
                ©️ Made by Yehezkiel Gunawan using{" "}
                <a href="https://covid19.mathdro.id/api">Mathdroid</a> and
                <a href="https://apicovid19indonesia-v2.vercel.app/api">
                  {" "}
                  Reynadi
                </a>{" "}
                Covid-19 API
              </strong>
            </footer>
          </Box>
        </Typography>
      </Container>
    </div>
  );
}

export default App;
