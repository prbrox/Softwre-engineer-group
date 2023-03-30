import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Select from "react-select";
import lineNames from "../../components/LineNames";
import Rows from "./components/Rows";
import Angles from "./components/Angles";
import { React, useState } from "react";
import Form from "../../components/Form";
import Loss from "./components/Loss";
import Accumulative from "./components/Accumulative";
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
    top: 100,
    left: -480,
    position: "relative",
    fontSize: "0.7rem",
  },
}));

export default function LayoutForm() {
  window.document.body.style.background = "white";
  const classes = useStyles();

  const [choice, setChoice] = useState();
  const [rowNumber, setRowNumber] = useState();

  const customStyles = {
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgb(254, 254, 0)",
      background: "rgb(177, 81, 42)", // Custom colour
      height: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <h3 style={{ marginBottom: 0, position: "relative" }}>
            Flange Layout
          </h3>
          <Box style={{ position: "relative", height: "30px" }}>
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
          </Box>
          <Box
            style={{
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
          </Box>

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
          </Box>

          <Box
            style={{
              top: -50,
              position: "relative",
              height: "50px",
            }}
          >
            <h5 style={{ marginTop: 0, marginRight: 10 }}>Row #s</h5>
            <Select
              id="selector"
              className="layout-rows-selector"
              styles={customStyles}
              options={lineNames.rowNumbers}
              placeholder="Number of rows?"
              onChange={(e) => {
                setRowNumber(e.label);
              }}
            >
              {choice}
            </Select>
          </Box>
          <Box
            sx={{ position: "relative", float: "left", left: -200, top: -80 }}
          >
            <Table
              aria-label="simple table"
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                verticalAlign: "middle",

                fontSize: "0.7rem",
              }}
            >
              <TableBody>
                <TableRow>
                  {/*<TableCell sx={{ background: "black", color: 'white' }}>Delete</TableCell> */}
                  <TableCell>
                    <h4>Plys</h4>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className={classes.topRow}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <h4>Thick</h4>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className={classes.topRow}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <h4>Qty</h4>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className={classes.topRow}
                      variant="outlined"
                      InputProps={{
                        classes: {
                          input: classes.resize,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <h4>OverCut:</h4>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className={classes.topRow}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
                <Angles rowName="Angles" totalRows={rowNumber} />
                <Rows rowName="Min Length required" totalRows={rowNumber} />
                <Rows rowName="Quantity" totalRows={rowNumber} />
                <Rows rowName="Length" totalRows={rowNumber} />
                <Rows rowName="Wood Units" totalRows={rowNumber} />
                <Rows rowName="# Pcs Required" totalRows={rowNumber} />
              </TableBody>
            </Table>
          </Box>
          <Box sx={{ position: "relative", float: "right", top: -200 }}>
            {/* <Form /> */}
          </Box>
          <Box sx={{ position: "relative", left: 0, top: -80 }}>
            <Accumulative />
            <Accumulative /> <Accumulative /> <Accumulative />
            <Accumulative />{" "}
          </Box>
        </Box>
      </Box>
    </>
  );
}
