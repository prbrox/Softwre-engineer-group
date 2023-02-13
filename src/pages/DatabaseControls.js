import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "../api/axios";
import choiceOptions from "../components/choices";
import lineNames from "../components/LineNames";
import Navbar from "../components/Navbar";
export default function DatabaseControls() {
  useEffect(() => {
    onLoad();
  }, []);

  const [display, setDisplay] = useState({
    update: false,
    delete: false,
    create: false,
    table: true,
  });

  //the document set to the backend
  const [document, setDocument] = useState({
    id: String,
    name: String,
    database: String,
    rowName: String,
    query: " ",
  });

  //the records that are returned on load
  const [records, setRecords] = useState({
    retrieved: [], //retrieved
    selected: [], //changes each time user changes the first selector
    displayed: [], // the data that is displayed after the second selected
  });

  const [choice, setChoice] = useState();

  //when choice changes, switch the selected records
  useEffect(() => {
    switch (choice) {
      case "Equipment":
        setRecords((previous) => ({
          ...previous,
          selected: records.retrieved.equipment,
        }));
        setDocument((previous) => ({
          ...previous,
          database: "equipment",
          rowName: "equipment",
        }));
        break;
      case "Reasons":
        setRecords({ ...records, selected: records.retrieved.reasons });
        setDocument((previous) => ({
          ...previous,
          database: "dt_code",
          rowName: "dt_reason",
        }));
        break;
      case "SPS LOSS CATEGORY":
        setRecords({ ...records, displayed: records.retrieved.category });
        setDocument({
          ...document,
          database: "sps_downtime_codes",
          rowName: "Metric",
        });
        break;
      default:
        break;
    }
  }, [choice]);

  // useEffect(() => {
  //   console.log(document);
  // }, [document]);

  const customStyles = {
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgb(254, 254, 0)",
      background: "rgb(177, 81, 42)", // Custom colour
    }),
  };

  const onLoad = async () => {
    axios
      .get(process.env.REACT_APP_READ_CONTROLS)
      .then(async (response) => {
        setChoice("");

        setRecords({
          ...records,
          retrieved: response.data,
          displayed: [],
          selected: [],
        });
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const openPopup = async (location, name, id) => {
    setDocument((previous) => ({ ...previous, id: id, name: name }));
    setDisplay({ ...display, [location]: true });
  };

  const update = async () => {
    setDisplay({ ...display, update: false });
    axios
      .post(process.env.REACT_APP_UPDATE_CONTROLS, { record: document })
      .then(async (response) => {
        onLoad();
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const create = async () => {
    setDisplay({ ...display, create: false });

    axios
      .post(process.env.REACT_APP_CREATE_CONTROLS, { record: document })
      .then(async (response) => {
        onLoad();
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const deleted = async () => {
    setDisplay({ ...display, delete: false });
    axios
      .post(process.env.REACT_APP_DELETE_CONTROLS, { record: document })
      .then(async (response) => {
        console.log(response.data);
        onLoad();
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  return (
    <>
      <Navbar />
      <title>Database Controls</title>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Select
          id="selector"
          className="filter-selector"
          styles={customStyles}
          options={choiceOptions}
          placeholder="Reasons or Equipment or SPS Loss?"
          onChange={(e) => {
            setChoice(e.label);
          }}
        >
          {choice}
        </Select>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {choice ? (
          <Button
            variant="contained"
            style={{
              marginRight: "50px",
              color: "rgb(250, 230, 12)",
              background: "rgb(177, 81, 42)",
            }}
            onClick={() => setDisplay({ ...display, create: true })}
          >
            {" "}
            ADD {choice}
          </Button>
        ) : (
          <></>
        )}

        <>
          <Select
            id="selector"
            className="filter-selector"
            styles={customStyles}
            options={lineNames}
            placeholder="Select the line"
            onChange={(e) => {
              setRecords((prev) => ({
                ...prev,
                displayed: records.selected?.filter(
                  (rows) => rows.lineNumber === Number(e.value)
                ),
              }));
            }}
          ></Select>
        </>
      </Box>

      {/*create modal */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={display.create}
        onClose={() => setDisplay({ ...display, create: false })}
        style={{ textAlign: "center", left: "40vw", top: "25vh" }}
      >
        <div
          style={{
            background: "white",
            width: "690px",
            height: "250px",
            textAlign: "center",
            left: "40vw",
          }}
        >
          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{
                borderRadius: 23,
                backgroundColor: "black",
                color: "red",
                fontSize: "10px",
              }}
              onClick={() => setDisplay({ ...display, create: false })}
            >
              x
            </Button>
          </Box>
          <Box marginTop="20px">
            <label style={{ fontSize: "20pt", marginRight: "20px" }}>
              {choice}
            </label>
            <input
              style={{
                justifyContent: "flex-end",
                width: "20vw",
                height: "5vh",
                fontSize: "20pt",
                textAlign: "center",
              }}
              onChange={(e) => {
                setDocument((previous) => ({
                  ...previous,
                  name: e.target.value,
                }));
              }}
              defaultValue={document.name}
            ></input>
          </Box>
          <Box marginTop="20px" style={{ display: "flex" }}>
            <label
              style={{
                fontSize: "20pt",
                marginRight: "20px",
                marginLeft: "150px",
              }}
            >
              Line
            </label>
            {/* selector for the line*/}
            <Select
              className="modal-select"
              styles={customStyles}
              options={lineNames}
              placeholder="Select the line"
              onChange={(e) => {
                setDocument((previous) => ({ ...previous, id: e.value }));
              }}
            ></Select>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              color="success"
              variant="contained"
              size="medium"
              onClick={create}
            >
              SUBMIT
            </Button>
          </Box>
        </div>
      </Modal>

      {/*update modal */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={display.update}
        onClose={() => setDisplay({ ...display, update: false })}
        style={{ textAlign: "center", left: "40vw", top: "25vh" }}
      >
        <div
          style={{
            background: "white",
            width: "630px",
            height: "250px",
            textAlign: "center",
            left: "40vw",
          }}
        >
          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{
                borderRadius: 23,
                width: "10px",
                backgroundColor: "black",
                color: "red",
                fontSize: "10px",
              }}
              onClick={() => setDisplay({ ...display, update: false })}
            >
              x
            </Button>
          </Box>
          <textarea
            style={{
              justifyContent: "flex-end",
              width: "20vw",
              height: "10vh",
              fontSize: "20pt",
              textAlign: "center",
            }}
            onChange={(e) => setDocument({ ...document, name: e.target.value })}
            defaultValue={document.name}
          ></textarea>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="success"
              variant="contained"
              size="medium"
              onClick={update}
            >
              SUBMIT
            </Button>
          </Box>
        </div>
      </Modal>

      {/*Delete modal */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={display.delete}
        onClose={() => setDisplay({ ...display, delete: false })}
        style={{ textAlign: "center", left: "40vw", top: "25vh" }}
      >
        <div
          style={{
            background: "white",
            width: "630px",
            height: "250px",
            textAlign: "center",
            left: "40vw",
          }}
        >
          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{
                borderRadius: 23,
                width: "10px",
                backgroundColor: "black",
                color: "red",
                fontSize: "10px",
              }}
              onClick={() => setDisplay({ ...display, delete: false })}
            >
              x
            </Button>
          </Box>
          <h2>{document.name}</h2>
          <p style={{ fontSize: "large" }}>Are you sure you want to delete?</p>

          <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              color="success"
              variant="contained"
              size="large"
              onClick={() => setDisplay({ ...display, delete: false })}
            >
              NO
            </Button>
            <Button
              color="error"
              variant="contained"
              size="large"
              onClick={deleted}
            >
              YES
            </Button>
          </Box>
        </div>
      </Modal>

      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell sx={{ background: "black", color: "white" }}>
              {choice}
            </TableCell>
            <TableCell sx={{ background: "black", color: "white" }}>
              Delete
            </TableCell>
            <TableCell sx={{ background: "black", color: "white" }}>
              Edit
            </TableCell>
            <TableCell sx={{ background: "black", color: "white" }}>
              Line #
            </TableCell>
          </TableRow>

          {records.displayed?.length && choice ? (
            <>
              {records.displayed.map((rows, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell
                      sx={{ background: "white", border: "1px solid black" }}
                    >
                      {rows.name}
                    </TableCell>
                    <TableCell
                      sx={{ background: "white", border: "1px solid black" }}
                    >
                      <button
                        className="delete-btn"
                        onClick={() => openPopup("delete", rows.name, rows.id)}
                      >
                        {" "}
                        x
                      </button>
                    </TableCell>
                    <TableCell
                      sx={{ background: "white", border: "1px solid black" }}
                    >
                      <button
                        className="show-button"
                        onClick={() => openPopup("update", rows.name, rows.id)}
                      >
                        {" "}
                        O
                      </button>
                    </TableCell>
                    <TableCell
                      sx={{ background: "white", border: "1px solid black" }}
                    >
                      {rows.lineNumber}
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          ) : (
            <TableRow>
              <TableCell
                sx={{ background: "white", border: "1px solid black" }}
              >
                No Data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
