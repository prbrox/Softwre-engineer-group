import { Box, Button, Modal, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import axios from "../api/axios";
import lineNames from "../components/LineNames";
import Navbar from '../components/Navbar';
export default function DatabaseControls() {
    useEffect(() => {
        onLoad();
    }, [])


    const [equipment, setEquipment] = useState([]);
    const [line, setLine] = useState({ value: Number, name: String, id: String });
    const [display, setDisplay] = useState([])
    const [open, setOpen] = useState({ update: false, delete: false, create: false });
    const [reasons, setReasons] = useState({ reason: String, line: Number });

    useEffect(() => {
        setDisplay(equipment.filter((key) => key.line === line.value))
    }, [line])


    const customStyles = {
        dropdownIndicator: (base) => ({
            ...base,
            color: "rgb(254, 254, 0)",
            background: "rgb(177, 81, 42)", // Custom colour
        }),
    };





    const onLoad = async () => {
        axios.get(process.env.REACT_APP_READ_CONTROLS).then(async (response) => {
            setEquipment(response.data);
        }).catch((err) => {
            console.log(err, 'errors');
        })
    }

    const openPopup = async (location, equipment, line, id) => {
        setReasons({ reason: equipment, line: line, id: id })
        setOpen({ [location]: true })
    }


    const update = async () => {
        axios.post(process.env.REACT_APP_UPDATE_CONTROLS, { reasons: reasons }).then(async (response) => {
            console.log(response.data);

        }).catch((err) => {
            console.log(err, 'errors');
        })
    }

    const deleted = async () => {
        axios.post(process.env.REACT_APP_DELETE_CONTROLS, { reasons: reasons }).then(async (response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err, 'errors');
        })
    }



    return (

        <>
            <Navbar />
            <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>

                <Button variant='contained' style={{ marginRight: '50px', color: "rgb(250, 230, 12)", background: "rgb(177, 81, 42)" }} onClick={() => setOpen({ create: true })}> ADD REASON</Button>

                <Select
                    className="filter-selector"
                    styles={customStyles}
                    options={lineNames}
                    placeholder="Select the line"
                    onChange={(e) => { setLine({ ...line, value: parseInt(e.value), name: e.label }) }}>
                </Select>

            </Box>
            {/*update modal */}
            <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                open={open.update}
                onClose={() => setOpen({ ...open, update: false })}
                style={{ textAlign: 'center', left: '40vw', top: '25vh' }}>
                <div style={{ background: "white", width: '30vw', height: '20vh', textAlign: 'center', left: '40vw' }}>
                    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}><Button style={{
                        borderRadius: 23, width: '10px', backgroundColor: 'black', color: 'red', fontSize: "10px"
                    }} onClick={() => setOpen({ ...open, update: false })}>x</Button></Box>
                    <textarea style={{ justifyContent: 'flex-end', width: '20vw', height: '10vh', fontSize: '20pt', textAlign: 'center' }}
                        onChange={((e) => setReasons({ ...reasons, reason: e.target.value }))} defaultValue={reasons.reason}>

                    </textarea>
                    <Box style={{ display: 'flex', justifyContent: 'center' }} ><Button color="success" variant="contained" size='medium' onClick={update}>SUBMIT</Button></Box>
                </div>
            </Modal>

            {/*Delete modal */}
            <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                open={open.delete}
                onClose={() => setOpen({ ...open, delete: false })}
                style={{ textAlign: 'center', left: '40vw', top: '25vh' }}>
                <div style={{ background: "white", width: '30vw', height: '20vh', textAlign: 'center', left: '40vw' }}>
                    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}><Button style={{
                        borderRadius: 23, width: '10px', backgroundColor: 'black', color: 'red',
                        fontSize: "10px"
                    }} onClick={() => setOpen({ ...open, delete: false })}>x</Button></Box>
                    <h2>{reasons.reason}</h2>
                    <p style={{ fontSize: 'large' }}>Are you sure you want to delete?</p>

                    <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button color="success" variant="contained" size='large' onClick={() => setOpen({ ...open, delete: false })}>NO</Button><Button color="error" variant="contained" size='large' onClick={deleted}>YES</Button>
                    </Box>

                </div>
            </Modal>

            {/*update modal */}
            <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                open={open.create}
                onClose={() => setOpen({ ...open, create: false })}
                style={{ textAlign: 'center', left: '40vw', top: '25vh' }}>
                <div style={{ background: "white", width: '30vw', height: '20vh', textAlign: 'center', left: '40vw' }}>
                    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button style={{
                            borderRadius: 23, backgroundColor: 'black', color: 'red', fontSize: "10px"
                        }} onClick={() => setOpen({ ...open, create: false })}>x
                        </Button>
                    </Box>
                    <Box marginTop='20px'>
                        <label style={{ fontSize: '20pt', marginRight: '20px' }}>Reason</label>
                        <input style={{ justifyContent: 'flex-end', width: '20vw', height: '5vh', fontSize: '20pt', textAlign: 'center' }}
                            onChange={((e) => setReasons({ ...reasons, reason: e.target.value }))} defaultValue={reasons.reason}>
                        </input>
                    </Box>
                    <Select
                        styles={customStyles}
                        options={lineNames}
                        placeholder="Select the line"
                        onChange={(e) => { setLine({ ...line, value: parseInt(e.value), name: e.label }) }}>
                    </Select>
                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} >
                        <Button color="success" variant="contained" size='medium' onClick={update}>SUBMIT</Button>
                    </Box>
                </div>
            </Modal>

            <Table aria-label="simple table" >
                <TableBody>
                    <TableRow >
                        {/*<TableCell sx={{ background: "black", color: 'white' }}>Delete</TableCell> */}
                        <TableCell sx={{ background: 'black', color: 'white' }}>Reasons</TableCell>
                        <TableCell sx={{ background: "black", color: 'white' }}>Delete</TableCell>
                        <TableCell sx={{ background: "black", color: 'white' }}>Edit</TableCell>
                        <TableCell sx={{ background: "black", color: 'white' }} >Line Name</TableCell>
                        <TableCell sx={{ background: "black", color: 'white' }}>Line #</TableCell>
                    </TableRow>

                    {line ?
                        <>
                            {
                                display.map((rows, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell sx={{ background: 'white', border: '1px solid black' }}>{rows.equipment}</TableCell>
                                            <TableCell sx={{ background: 'white', border: '1px solid black' }}>
                                                <button className="delete-btn" onClick={() => openPopup('delete', rows.equipment, rows.line, rows.id)}> x</button>
                                            </TableCell>
                                            <TableCell sx={{ background: 'white', border: '1px solid black' }}>
                                                <button
                                                    className="show-button"
                                                    onClick={() => openPopup('update', rows.equipment, rows.line, rows.id)}
                                                > O</button>
                                            </TableCell>
                                            <TableCell sx={{ background: 'white', border: '1px solid black' }}>{line.name}</TableCell>
                                            <TableCell sx={{ background: 'white', border: '1px solid black' }}>{rows.line}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </> : <> no data</>}

                </TableBody>
            </Table>
        </>
    );
}