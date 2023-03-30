import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  topRow: {
    borderStyle: "groove",
    width: "50px",
    justifyContent: "center",
    margin: 0,
    "& .MuiInputBase-root": {
      height: "30px", // adjust the height as needed
      fontSize: "80%",
    },
    "& .MuiInputBase-input": {
      padding: "15%",
    },
  },
}));

export default function Rows(props) {
  const { totalRows, rowName } = props;
  const classes = useStyles();

  function Cellrows(props) {
    const { name, condition } = props;
    return [...Array(parseInt(condition))].map((e, i) => {
      return (
        <th key={name + i}>
          <TextField
            className={classes.topRow}
            variant="outlined"
            size="small"
          />
        </th>
      );
    });
  }

  return (
    <>
      <tr>
        <th>{rowName}</th>
        {totalRows ? (
          <Cellrows name="textfield1" condition={totalRows}></Cellrows>
        ) : (
          <></>
        )}
      </tr>
    </>
  );
}
