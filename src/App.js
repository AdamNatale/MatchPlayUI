// @ts-check

import React from "react";
import "./App.css";
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Countdown from 'react-countdown';

import adamPhoto from "./assets/adam-picture.jpg";
import haleyPhoto from "./assets/haley-picture.jpeg";
import mapleLogo from "./assets/maple.jfif";

const teamsData = require("./config");

let adamRows = [];
let adamPoints = 0;

let haleyRows = [];
let haleyPoints = 0;

let status = "";

function populateList(teamsData, data) {
  const list = [];
  let points = 0;
  teamsData.forEach((player) => {
    console.log(player);
    let obj = data.find(o => o.name === player);
    points += parseInt(obj.points);
    list.push({
      name: player,
      gamesPlayed: obj.gamesPlayed,
      points: obj.points
    });
  });
  return { list, points };
}

function sortList(teamData) {
  teamData.sort((a, b) => b.points - a.points);
  return teamData;
}

function App() {
  const [data, setData] = React.useState(null);
  const [k, setK] = React.useState(false);
  const onCompleteTimeFun = () => {
    console.log("Resetting Time");
    setK((i) => !i);
  };
  const timerRenderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <span>
        Refreshing in: {minutes}:{seconds}
      </span>
    );
  };

  React.useEffect(() => {
    const fetchData = async () => {
      fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        const adamData = populateList(teamsData.teamsData.adamTeam, data.standings);
        adamRows = adamData.list;
        adamPoints = adamData.points;

        const haleyData = populateList(teamsData.teamsData.haleyTeam, data.standings);
        haleyRows = haleyData.list;
        haleyPoints = haleyData.points;

        status = data.status;

        setData(data.message);
      });
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every minute
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            Team Adam
          </Grid>
          <Grid item xs={6}>
            Team Haley
          </Grid>
          <Grid item xs={6}>
            <img src={adamPhoto} className="photo-container" alt="Team Adam" />
          </Grid>
          <Grid item xs={6}>
          <img src={haleyPhoto} className="photo-container" alt="Team Haley" />
          </Grid>
          <Grid item xs={6}>
            Total Points: {adamPoints}
          </Grid>
          <Grid item xs={6}>
            Total Points: {haleyPoints}
          </Grid>
          <Grid item xs={12}>
            { status !== "completed" ? 
            <div>
              <Countdown
                key={k}
                date={Date.now() + 60000}
                onComplete={onCompleteTimeFun}
                renderer={timerRenderer}
              />
             </div>
              :
              <span> Tournament Complete! </span>
            }
          </Grid>
          <Grid item xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Games Played</TableCell>
                    <TableCell align="right">Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortList(adamRows).map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.gamesPlayed}</TableCell>
                      <TableCell align="right">{row.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Games Played</TableCell>
                    <TableCell align="right">Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortList(haleyRows).map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.gamesPlayed}</TableCell>
                      <TableCell align="right">{row.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <img src={mapleLogo} className="maple-container" alt="Team Adam" />
          </Grid>
          <Grid item xs={12}>
            <div className="footer" />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
