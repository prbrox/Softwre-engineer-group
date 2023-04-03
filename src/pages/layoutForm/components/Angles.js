import { TableCell, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  rows: {
    height: "50px !important",
    minHeight: "30px",
  },
  cell: {
    //
    "&.css-1ex1afd-MuiTableCell-root": {
      margin: 0,
      padding: 0,
    },
    marginRight: 500,
    margin: 0,
    padding: 0,
  },
}));

export default function Angles(props) {
    const classes = useStyles()
    const { totalRows, rowName } = props;
    const middle = Math.floor(totalRows / 2) - 1;
    const end = totalRows - middle

  function Cellrows(props) {
    const { name, condition } = props;
    return [...Array(parseInt(condition))].map((e, i) => {
      return (
        <TableCell key={name + i} className={classes.cell}>
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              width: 50,
              margin: 0,
            }}
          >
            {name + (i + 1)}
          </h4>
        </TableCell>
      );
    });
  }
  return (
      <TableRow className={classes.rows}>
          <TableCell>{ rowName}</TableCell>
      {middle ? (
        <>
          <Cellrows name="A" condition={middle} />
          <Cellrows name="S" condition={end} />
        </>
      ) : (
        <></>
      )}
    </TableRow>
  );
}
