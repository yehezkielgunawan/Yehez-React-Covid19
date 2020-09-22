import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function convertDate(paramDate) {
  const theDate = new Date(paramDate);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(theDate);
}

function thousandSeparator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function IndoData() {
  const classes = useStyles();
  const indoAPI =
    "https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian";
  const deltaIndo = "https://apicovid19indonesia-v2.vercel.app/api/indonesia/more";
  
  const [harian, setHarian] = useState(null);
  const [positif, setPositif] = useState(0);
  const [meninggal, setMeninggal] = useState(0);
  const [sembuh, setSembuh] = useState(0);
  const [dirawat, setDirawat] = useState(0);
  useEffect(() => {
    axios.get(indoAPI).then((res) => {
      setHarian(res.data);
    });
    axios.get(deltaIndo).then((res) => {
      setPositif(thousandSeparator(res.data.penambahan.positif));
      setMeninggal(thousandSeparator(res.data.penambahan.meninggal));
      setSembuh(thousandSeparator(res.data.penambahan.sembuh));
      setDirawat(thousandSeparator(res.data.penambahan.dirawat));
    });
  });

  if (harian) {
    harian.map((key) => {
      const tanggalBaru = convertDate(key.tanggal);
      key.tanggal = tanggalBaru;
    });
    return (
      <div>
        <h2>Indonesia Covid-19 Statistics</h2>
        <ResponsiveContainer width="100%" aspect={2.5}>
          <LineChart
            width={730}
            height={250}
            data={harian}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="tanggal" hide="true" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="positif" stroke="#ffc107" />
            <Line type="monotone" dataKey="sembuh" stroke="#64dd17" />
            <Line type="monotone" dataKey="meninggal" stroke="#f44336" />
          </LineChart>
        </ResponsiveContainer>

        <h3>Today's Cases in Indonesia</h3>
        <CssBaseline />
        <Container maxWidth="sm" style={{marginTop: "30px"}}>
          <Typography
            component="div"
            style={{ backgroundColor: "#f44336", height: "50%" }}
          >
            <div
              className={classes.root}
              style={{ backgroundColor: "#f44336" }}
            >
              <Grid container spacing={2}>
                <Grid item sm={3} xs={12}>
                  <Card
                    className={classes.root}
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Positif
                        <span role="img" aria-label="sick">
                          🤒
                        </span>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {positif}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Card
                    className={classes.root}
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Meninggal
                        <span role="img" aria-label="sad">
                        😭
                        </span>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {meninggal}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Card
                    className={classes.root}
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Sembuh
                        <span role="img" aria-label="happy">
                          😃
                        </span>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {sembuh}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Card
                    className={classes.root}
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Dirawat
                        <span role="img" aria-label="happy">
                        😷
                        </span>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {dirawat}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Typography>
        </Container>
      </div>
    );
  } else {
    return <CircularProgress></CircularProgress>;
  }
}
