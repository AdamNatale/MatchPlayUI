import React from "react";
import "./App.css";
import Grid from '@mui/material/Grid';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  // <img src={logo} className="App-logo" alt="logo" />
  // <Button variant="contained">Hello world</Button>
  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            Adams!
          </Grid>
          <Grid item xs={6}>
            Haleys!
          </Grid>
          <Grid item xs={6}>
            Adams Points!
          </Grid>
          <Grid item xs={6}>
            Haleys Points!
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
