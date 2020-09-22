import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { GiDeathZone } from "react-icons/gi";
import { GiHealing } from "react-icons/gi";
import { CgDanger } from "react-icons/cg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
  },
}));

function thousandSeparator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function World() {
  const classes = useStyles();
  const baseUrl = "https://covid19.mathdro.id/api";
  const [globalConfirmed, setConfirmed] = useState("");
  const [globalDeaths, setDeaths] = useState("");
  const [globalRecovered, setRecovered] = useState("");
  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setConfirmed(thousandSeparator(res.data.confirmed.value));
      setDeaths(thousandSeparator(res.data.deaths.value));
      setRecovered(thousandSeparator(res.data.recovered.value));
    });
  });

  if (globalConfirmed && globalDeaths && globalRecovered) {
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12}>
            <Card
              className={classes.root}
              style={{ backgroundColor: "#ffa000" }}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Confirmed Cases<CgDanger></CgDanger>
                </Typography>
                <Typography variant="body2" component="p">
                  {globalConfirmed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Card
              className={classes.root}
              style={{ backgroundColor: "#e57373" }}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Deaths<GiDeathZone></GiDeathZone>
                </Typography>
                <Typography variant="body2" component="p">
                  {globalDeaths}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Card
              className={classes.root}
              style={{ backgroundColor: "#b2ff59" }}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Recovered<GiHealing></GiHealing>
                </Typography>
                <Typography variant="body2" component="p">
                  {globalRecovered}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <CircularProgress></CircularProgress>;
  }
}
