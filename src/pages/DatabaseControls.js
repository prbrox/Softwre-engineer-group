import { Modal, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
    const [line, setLine] = useState({ value: Number, name: String });
    const [display, setDisplay] = useState([])
    const [open, setOpen] = React.useState(true);
    const [modalStyle] = React.useState(getModalStyle);

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

    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles(theme => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            position: 'absolute',
            width: 450,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const onLoad = async () => {
        axios.get(process.env.REACT_APP_READ_CONTROLS).then(async (response) => {
            setEquipment(response.data);

        }).catch((err) => {
            console.log(err, 'errors');
        })
    }


    const check = (id) => {
        handleOpen()
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    return (

        <>
            <Navbar />
            <Select
                className="filter-selector"
                styles={customStyles}
                options={lineNames}
                placeholder="Select the line"
                onChange={(e) => { setLine({ ...line, value: parseInt(e.value), name: e.label }) }}
            ></Select>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={{ background: "white", width: '50vw', textAlign:'center' }}>
                    <h2>Simple React Modal</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim, non pharetra est ultrices et.
                    </p>
                </div>
            </Modal>
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow >
                        {/*<TableCell sx={{ background: "black", color: 'white' }}>Delete</TableCell> */}

                        <TableCell sx={{ background: "black", color: 'white' }}>Reasons</TableCell>
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
                                                <button className="delete-btn" onClick={() => check(rows.id)}>
                                                    x
                                                </button>
                                            </TableCell>
                                            <TableCell sx={{ background: 'white', border: '1px solid black' }}>
                                                <button
                                                    className="show-button"
                                                    onClick={() => check(rows.id)}
                                                >
                                                    O
                                                </button>
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