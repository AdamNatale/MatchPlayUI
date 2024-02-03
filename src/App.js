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

const teamsData = require("./config");

let adamRows = [];
let adamPoints = 0;

let haleyRows = [];
let haleyPoints = 0;

function populateList(teamsData, data) {
  const list = [];
  let points = 0;
  teamsData.forEach((player) => {
    let obj = data.find(o => o.name === player);
    console.log(obj);
    points += parseInt(obj.points);
    list.push({
      name: player,
      gamesPlayed: obj.gamesPlayed,
      points: obj.points
    });
  });
  return { list, points };
}

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        const adamData = populateList(teamsData.teamsData.adamTeam, data);
        adamRows = adamData.list;
        adamPoints = adamData.points;

        const haleyData = populateList(teamsData.teamsData.haleyTeam, data);
        haleyRows = haleyData.list;
        haleyPoints = haleyData.points;

        setData(data.message);
      });
  }, []);

  // <img src={logo} className="App-logo" alt="logo" />
  // <Button variant="contained">Hello world</Button>
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            Adams!
          </Grid>
          <Grid item xs={6}>
            Haleys!
          </Grid>
          <Grid item xs={6}>
            {adamPoints}
          </Grid>
          <Grid item xs={6}>
            {haleyPoints}
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
                  {adamRows.map((row) => (
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
                  {haleyRows.map((row) => (
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
        </Grid>
      </header>
    </div>
  );
}

export default App;
