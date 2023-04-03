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
import Form from "./components/Form";
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
  cells: {
    "&.css-1ex1afd-MuiTableCell-root": {
      margin: 0,
      padding: 0,
    },
    margin: 0,
    padding: 0,
  },
  center: {
    display: "flex",
    justifyContent: "center",
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
      {/*This is the main left box */}
      <Box
        sx={{
          justifyContent: "start",
          width: "65vw",
          float: "left",
          minWidth: 700,
          height: "80vh",
        }}
      >
        {/*giving relative position */}
        <Box
          sx={{
            position: "relative",
            left: "40%",
            width: "20vw",
          }}
        >
          <h3 style={{}}>Flange Layout</h3>
          <div style={{ width: 90, height: 50 }}>
            <h4 style={{ float: "left", marginTop: 8 }}>Dia</h4>
            <TextField
              variant="outlined"
              size="small"
              style={{
                borderStyle: "groove",
                width: "60px",
                float: "right",
              }}
            ></TextField>
          </div>
          <div style={{ width: 250 }}>
            <h4
              style={{
                float: "left",
                marginBottom: 0,
                marginTop: 2,
                width: 40,
              }}
            >
              Line
            </h4>
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
          </div>
          <div style={{ width: 250, marginTop: 5 }}>
            <h5
              style={{
                float: "left",
                marginBottom: 0,
                marginTop: 2,
                width: 45,
              }}
            >
              Row #s
            </h5>
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
          </div>
        </Box>
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
              <TableCell className={classes.cells}>
                <h4 className={classes.center}>Plys</h4>
              </TableCell>
              <TableCell className={classes.cells}>
                <TextField
                  className={classes.topRow}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell className={classes.cells}>
                <h4 className={classes.center}>Thick</h4>
              </TableCell>
              <TableCell className={classes.cells}>
                <TextField
                  className={classes.topRow}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell className={classes.cells}>
                <h4 className={classes.center}>Qty</h4>
              </TableCell>
              <TableCell className={classes.cells}>
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
              <TableCell className={classes.cells}>
                <h4>OverCut:</h4>
              </TableCell>
              <TableCell className={classes.cells}>
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
        <Box alignSelf={"center"} maxWidth={772} width={"fit-content"}>
          <label for="fname">Dim</label> <label for="fname">Prep</label>
          <Accumulative totalRows={rowNumber} rowName="accum1" />
          <Accumulative totalRows={rowNumber} rowName="accum2" />
          <Accumulative totalRows={rowNumber} rowName="accum3" />
          <Accumulative totalRows={rowNumber} rowName="accum4" />
        </Box>
      </Box>
      {/*This is the main right box */}
      <Box sx={{ position: "absolute", right: 0, top: 120 }}>
        <Form />
      </Box>
    </>
  );
}
