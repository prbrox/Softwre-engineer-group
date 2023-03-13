import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Select from "react-select";
import lineNames from "../components/LineNames";

import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  topRow: {
    borderStyle: "groove",
    width: "50px",
    justifyContent: "center",
    "& .MuiInputBase-root": {
      height: "30px", // adjust the height as needed
      fontSize: "80%",
    },
    "& .MuiInputBase-input": {
      padding: "15%",
    },
  },
  rowBodies: {
    display: "flex",
    justifyContent: "space-evenly",
    verticalAlign: "middle",
    width: 520,
    height: 35,
    top: 90,
    left: -480,
    position: "relative",
    fontSize: "0.7rem",
  },
}));

export default function LayoutForm() {
  window.document.body.style.background = "white";
  const classes = useStyles();

  const [choice, setChoice] = useState();

  const customStyles = {
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgb(254, 254, 0)",
      background: "rgb(177, 81, 42)", // Custom colour
      height: 25,
    }),
    control: (base) => ({
      ...base,
      height: 25,
      minHeight: 25,
    }),
  };

  return (
    <>
      <title>Layout Form</title>
      <Box>
        <h3 style={{ marginBottom: 0 }}>
          <bold style={{ left: "20vw", position: "relative" }}>
            Flange Layout
          </bold>
        </h3>
        <Typography
          style={{ left: "20vw", position: "relative", height: "30px" }}
        >
          <h4>Dia</h4>
          <TextField
            variant="outlined"
            size="small"
            style={{
              borderStyle: "groove",
              width: "60px",
              top: -55,
              left: 55,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></TextField>
        </Typography>
        <Typography
          style={{
            left: "20vw",
            position: "relative",
            height: "50px",
          }}
        >
          <h5 style={{ marginTop: 10, marginRight: 10 }}>Line</h5>
          <Select
            id="selector"
            className="layout-selector"
            styles={customStyles}
            options={lineNames.flangeLayout}
            placeholder="Line?"
            onChange={(e) => {
              setChoice(e.label);
            }}
          >
            {choice}
          </Select>
        </Typography>
        <Box sx={{ position: "relative", left: 500, top: -150 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(177, 81, 42)" }}
          >
            {" "}
            {"<"}{" "}
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(177, 81, 42)",
            }}
          >
            {" "}
            {">"}{" "}
          </Button>

          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              verticalAlign: "middle",
              width: 400,
              top: 100,
              left: -400,
              position: "relative",
              fontSize: "0.7rem",
            }}
          >
            <h4>Plys</h4>
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <h4>Thick</h4>
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <h4>Qty</h4>
            <TextField
              className={classes.topRow}
              variant="outlined"
              InputProps={{
                classes: {
                  input: classes.resize,
                  //height: 15,
                  //minHeight: 15,
                },
              }}
            />
            <h4>OverCut:</h4>
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              verticalAlign: "middle",
              width: 520,
              top: 100,
              left: -480,
              position: "relative",
              fontSize: "0.7rem",
            }}
          >
            <h4>Min Length required</h4>

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
          </Typography>
          <Typography
            className={classes.rowBodies}
            sx={{
              width: "435px !important",
              left: "-390px !important",
            }}
          >
            <h4>A1</h4>
            <h4>A2</h4>
            <h4>A3</h4>
            <h4>S1</h4>
            <h4>S2</h4>
            <h4>S3</h4>
            <h4>S4</h4>
            <h4>S5</h4>
          </Typography>
          <Typography className={classes.rowBodies}>
            <h4>Board Width</h4>
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
          </Typography>
          <Typography className={classes.rowBodies}>
            <h4>Quantity</h4>
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
          </Typography>
          <Typography className={classes.rowBodies}>
            <h4>Length</h4>
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
          </Typography>
          <Typography className={classes.rowBodies}>
            <h4>Wood Units</h4>
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
          </Typography>
          <Typography className={classes.rowBodies}>
            <h4># Pcs Required</h4>
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />

            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.topRow}
              variant="outlined"
              size="small"
            />
          </Typography>
        </Box>
      </Box>
    </>
  );
}
