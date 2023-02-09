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

  const [lines, setLines] = useState({
    line: { value: Number, name: String },
    equipment: [],
    reasons: { reason: String, line: Number, id: String },
  });
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
    query: " "
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
    if (choice === "Equipment") {
      setRecords({ ...records, selected: records.retrieved.equipment });
      setDocument({ ...document, database: "equipment", rowName: "equipment" });
    } else if (choice === "Reasons") {
      setRecords({ ...records, selected: records.retrieved.reasons });
      setDocument({ ...document, database: "dt_code", rowName: "dt_reason" });
    } else {
      setRecords({ ...records, displayed: records.retrieved.category });
      setDocument({
        ...document,
        database: "sps_downtime_codes",
        rowName: "Metric",
      });
    }
  }, [choice]);

  // useEffect(() => {
  //   console.log(records);
  // }, [records]);

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
        setRecords({ ...records, retrieved: response.data, displayed: [] });
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const openPopup = async (location, name, id) => {
    setDocument({ ...document, id: id, name: name });
    setDisplay((previousStates) => ({
      ...previousStates,
      [location]: true,
    }));
  };


  const update = async () => {
    setDisplay((previousStates) => ({
      ...previousStates,
      update: false,
    }));
    axios
      .post(process.env.REACT_APP_UPDATE_CONTROLS, { reasons: lines.reasons })
      .then(async (response) => {
        onLoad();
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const create = async () => {
    setDisplay((previousStates) => ({
      ...previousStates,
      create: false,
    }));

    axios
      .post(process.env.REACT_APP_CREATE_CONTROLS, { record: document })
      .then(async (response) => {
        console.log(response.data);
        onLoad();
        
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const deleted = async () => {
    // setDisplay((previousStates) => ({
    //   ...previousStates,
    //   popup: { ...previousStates.popup, delete: false },
    // }));
    // axios
    //   .post(process.env.REACT_APP_DELETE_CONTROLS, { reasons: lines.reasons })
    //   .then(async (response) => {
    //     console.log(response.data);
    //     onLoad();
    //     reset();
    //   })
    //   .catch((err) => {
    //     console.log(err, "errors");
    //   });
  };

  return (
    <>
      <Navbar />
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
        ></Select>
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
            onClick={() =>
              setDisplay((previousStates) => ({
                ...previousStates,
                create: true,
              }))
            }
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
                displayed: records.selected.filter(
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
        onClose={() =>
          setDisplay((previousStates) => ({
            ...previousStates,
            create: false,
          }))
        }
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
              onClick={() =>
                setDisplay((previousStates) => ({
                  ...previousStates,
                  create: false,
                }))
              }
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
                setDocument({ ...document, name: e.target.value });
              }}
              defaultValue={lines.reasons.reason}
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
                setDocument({ ...document, id: e.value });
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
        onClose={() =>
          setDisplay((previousStates) => ({
            ...previousStates,
            update: false,
          }))
        }
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
              onClick={() =>
                setDisplay((previousStates) => ({
                  ...previousStates,
                  update: false,
                }))
              }
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
            onChange={(e) =>
              setLines((previousStates) => ({
                ...previousStates,
                reasons: { ...previousStates.reasons, reason: e.target.value },
              }))
            }
            defaultValue={lines.reasons.reason}
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
        onClose={() =>
          setDisplay((previousStates) => ({
            ...previousStates,
            delete: false,
          }))
        }
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
              onClick={() =>
                setDisplay((previousStates) => ({
                  ...previousStates,
                  delete: false,
                }))
              }
            >
              x
            </Button>
          </Box>
          <h2>{lines.reasons.reason}</h2>
          <p style={{ fontSize: "large" }}>Are you sure you want to delete?</p>

          <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              color="success"
              variant="contained"
              size="large"
              onClick={() =>
                setDisplay((previousStates) => ({
                  ...previousStates,
                  delete: false,
                }))
              }
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
              Line Name
            </TableCell>
            <TableCell sx={{ background: "black", color: "white" }}>
              Line #
            </TableCell>
          </TableRow>

          {records.displayed?.length ? (
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
                      {lines.line.name}
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
