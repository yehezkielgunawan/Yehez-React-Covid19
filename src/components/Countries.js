import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CircularProgress from '@material-ui/core/CircularProgress';
import Moment from 'react-moment';

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

function thousandSeparator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CenteredGrid(props) {
  const classes = useStyles();
  const baseUrl = "https://covid19.mathdro.id/api";
  const [countryConfirmed, setCountryConfirmed] = useState(0);
  const [countryDeaths, setCountryDeaths] = useState(0);
  const [countryRecovered, setCountryRecovered] = useState(0);
  const [lastUpdate, setCountryUpdate] = useState("");

  useEffect(() =>{
    axios.get(baseUrl + "/countries/" + props.country).then((res) => {
      setCountryConfirmed(thousandSeparator(res.data.confirmed.value));
      setCountryDeaths(thousandSeparator(res.data.deaths.value));
      setCountryRecovered(thousandSeparator(res.data.recovered.value));
      setCountryUpdate(res.data.lastUpdate);
    });
  }) 

  if (countryConfirmed && countryDeaths && countryRecovered && lastUpdate) {
    return (
      <div>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography
            component="div"
            style={{ backgroundColor: "#cfe8fc", height: "50%" }}
          >
            <div
              className={classes.root}
              style={{ backgroundColor: "#e0e0e0" }}
            >
              <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                  <Card
                    className={classes.root}
                    style={{ backgroundColor: "#ffeb3b" }}
                  >
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Confirmed Cases <span role="img" aria-label="sick">🤒</span>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {countryConfirmed}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <Card
                    className={classes.root}
                    style={{ backgroundColor: "#ff8a80" }}
                  >
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Deaths <span role="img" aria-label="sad">😟</span>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {countryDeaths}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <Card
                    className={classes.root}
                    style={{ backgroundColor: "#b9f6ca" }}
                  >
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Recovered<span role="img" aria-label="happy">😃</span>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {countryRecovered}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <h5>Last updated: <Moment date={lastUpdate} format="DD MMM YYYY hh:mm"></Moment> </h5>
            </div>
          </Typography>
        </Container>
      </div>
    );
  } else{
    return <CircularProgress></CircularProgress>;
  }
}

class Countries extends Component {
  countryName = [];
  constructor() {
    super();
    this.state = {
      countryList: [],
      selectedCountry: "-",
    };
  }

  async componentDidMount() {
    const baseUrl = "https://covid19.mathdro.id/api";
    await axios.get(baseUrl + "/countries").then((res) => {
      this.setState({ countryList: res.data.countries });
      this.state.countryList.map((result) => {
        return this.countryName.push(result.name);
      });
    });
  }

  handleChange = (event, values) => {
    this.setState({ selectedCountry: values }, () => {
      console.log(this.state.selectedCountry);
    });
  };

  render() {
    if (this.state.selectedCountry === "-") {
      return (
        <React.Fragment>
          <h2>Check Country Data</h2>
          <Autocomplete
            id="combo-box-demo"
            options={this.countryName}
            style={{ width: 300, margin: "auto" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Country"
                variant="outlined"
              />
            )}
            onChange={this.handleChange}
          />
          <h4>
            Selected Country : <b>{this.state.selectedCountry}</b>
          </h4>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h2>Check Country Data</h2>
          <Autocomplete
            id="combo-box-demo"
            options={this.countryName}
            style={{ width: 300, margin: "auto"}}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Country"
                variant="outlined"
              />
            )}
            onChange={this.handleChange}
          />
          <h4>
            Selected Country : <strong>{this.state.selectedCountry}</strong>
          </h4>
          <CenteredGrid country={this.state.selectedCountry}></CenteredGrid>
        </React.Fragment>
      );
    }
  }
}
export default Countries;
