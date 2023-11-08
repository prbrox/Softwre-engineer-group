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
import Form from "./components/Form.js";
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
    </>
  );
}
