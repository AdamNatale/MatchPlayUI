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

const adamRows = [];
let adamPoints = 0;

const haleyRows = [];
let haleyPoints = 0;

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(teamsData);
        teamsData.teamsData.adamTeam.forEach((player) => {
          console.log(player);
          let obj = data.find(o => o.name === player);
          console.log(obj);
          adamPoints += parseInt(obj.points);
          adamRows.push({
            name: player,
            gamesPlayed: obj.gamesPlayed,
            points: obj.points
          });
        });

        teamsData.teamsData.haleyTeam.forEach((player) => {
          console.log(player);
          let obj = data.find(o => o.name === player);
          haleyPoints += parseInt(obj.points);
          haleyRows.push({
            name: player,
            gamesPlayed: obj.gamesPlayed,
            points: obj.points
          });
        });
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
