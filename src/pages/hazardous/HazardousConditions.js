
import { Box, Button, Popover } from "@mui/material";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import DatePicker from "../../components/DatePicker";
import Supervisor from "../../components/Supervisor";
import useAuth from '../../hooks/useAuth'


function HazardousConditions() {
    const [date, setDate] = useState(new Date());
    const [report, setReport] = useState({ date: "", supervisor: "", observer: "", type: "", observationType: "NA", feedback: "", actions: "" })
    const [password, setPassword] = useState("")
    let navigate = useNavigate();
    const { setAuth, auth } = useAuth();



    useEffect(() => {
        setReport({ ...report, date: date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() })
    }, [date])

    function Submit() {
        axios.post(process.env.REACT_APP_WRITE, { report: report }).then((response) => {
            window.location.reload();
        }).catch((response) => {
            console.log(response.data)
        })
    }
    //<textarea className="location shared" placeholder="Where did Hazardous Condition occur?" />{ /*where HC occured */}
    const [anchorEl, setAnchorEl] = useState(null);

    const openPopup = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const check = () => {
        try {
            axios.post(process.env.REACT_APP_CHECK, { password: password })
                .then((response) => {
                    const roles = response.data.roles
                    setAuth(roles);
                    navigate("/reports", { replace: true })
                })
            
        } catch(error) {
            console.log("error:", error)
        }
        
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <>{ /* Pass the state and set state for date to the components*/}
            <div className="body">\
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <div className="popup">
                        <input placeholder="password?" type={"password"} onChange={(e) => setPassword(e.target.value)}></input>
                        <Button variant='contained' onClick={check} color="secondary" size="small">submit</Button>
                    </div>
                </Popover>

                <div className="container">
                    <Box sx={{ position: "absolute", width: "35vw", textAlign: "end", minWidth:"558px" }}>
                        <Button variant='contained' onClick={openPopup} color="secondary" size="medium">Reports</Button>
                    </Box>

                    <h1>Hazardous Condition Report</h1>
                    <DatePicker setDate={setDate} date={date} />
                    <Supervisor state={report} setState={setReport} />
                    <textarea id="name" className="name shared" placeholder="Name?" onChange={(e) => setReport({ ...report, observer: e.target.value })} /> { /*name */} { /*align shift to the left of container at this level */}
                    <select id="type" onChange={(e) => { setReport({ ...report, type: e.target.value }) }}>
                        <option value="">Hazardous or Observation</option>
                        <option value="Hazardous">Hazardous</option>
                        <option value="Observation">Observation</option>
                    </select>
                    {
                        report.type === "Observation" ?
                            <select id="obervationType" onChange={(e) => setReport({ ...report, observationType: e.target.value })} >
                                <option value="">Safe or unsafe?</option>
                                <option value="Safe">Safe</option>
                                <option value="Unsafe">Unsafe</option>
                            </select> : <></>
                    }
                    <textarea className="incident shared" id="incident" placeholder="What Happened?" onChange={(e) => setReport({ ...report, feedback: e.target.value })} />{ /*what happened */}
                    <textarea className="action shared" id="actions" placeholder="Action(s) Taken?" onChange={(e) => setReport({ ...report, actions: e.target.value })} />{ /*actions taken */}
                    <Button variant='contained' color="secondary" onClick={Submit}>Submit</Button>
                </div>
            </div>
        </>
    )
}
export default HazardousConditions;