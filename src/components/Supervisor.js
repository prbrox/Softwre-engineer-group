import { useEffect, useState } from "react";
import Select from "react-select/creatable";
import axios from "../api/axios";


export default function Supervisor({ state, setState }) {
    const [options, setOptions] = useState([{}])
    const [name, setName] = useState("")

    const customStyles = {
        dropdownIndicator: (base) => ({
            ...base,
            color: "rgb(254, 254, 0)",
            background: "#9c27b0 ", // Custom colour
        }),
    };

    useEffect(() => {
        //make on load function
        onLoad()
    }, [])

    useEffect(() => {
        //make on load function
        setState({ ...state, supervisor: name })
    }, [name])


    const onLoad = () => {
        try {


            //return supervisor list from backend
            axios.get(process.env.REACT_APP_READ)
                .then(function (response) {
                    var empty = [{}];
                    response.data.forEach(element => {
                        empty.push({ value: element, label: element })
                    });
                    setOptions(empty)

                })
        } catch (error) {
            console.log("error", error)
        }
    }

    const createOption = (name) => {
        try {


            //push to backend
            axios
              .post(process.env.REACT_APP_CREATE_OPTIONS, { name: name })
              .then((response) => {
                onLoad();
              });
        } catch (error) {
            console.log("error", error)
        }
    }


    return (

        <Select styles={customStyles}
            options={options}
            onCreateOption={createOption}
            className="supervisor"
            onChange={(e) => setName(e.value)}
            placeholder="Your Supervisor? (if missing, add by typing)"
            id="supervisor"
        />

    )
}