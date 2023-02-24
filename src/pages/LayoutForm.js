import Navbar from "../components/Navbar";
import { Box, Typography, Input, TextField } from "@mui/material";
import Select from "react-select";
import lineNames from "../components/LineNames";

import React, { useEffect, useState } from "react";

export default function LayoutForm() {
  window.document.body.style.background = "white";

  const [choice, setChoice] = useState();

  const customStyles = {
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgb(254, 254, 0)",
      background: "rgb(177, 81, 42)", // Custom colour
    }),
  };

  return (
    <>
      <Navbar />
      <title>Layout Form</title>
      <Box>
        <h1 style={{marginBottom: 0}}>
          <bold style={{ display: "flex", justifyContent: "center" }}>
            Flange Layout
          </bold>
        </h1>
        <Typography style={{ display: "flex", justifyContent: "center", height: "50px" }}>
          <h2>Dia</h2>
          <TextField
            variant="outlined"
            size="small"
            style={{
              borderStyle: "groove",
              width: "60px",
              left: 15,
              top: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></TextField>
        </Typography>
        <Typography style={{ display: "flex", justifyContent: "center", height: "50px", left: 20 }}>
          <h2 style={{marginRight: 10}}>Line</h2>
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
      </Box>
    </>
  );
}
