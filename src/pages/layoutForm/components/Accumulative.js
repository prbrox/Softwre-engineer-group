import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
//acts as the css for the code
const useStyles = makeStyles((theme) => ({
  cell: {
    width: 50,
    margin: 0,
    padding: 0,
  },
}));

export default function Accumulative(props) {
  const { totalRows, rowName } = props;
  const classes = useStyles();

  

  //generates input boxes based on the numebr of inputs
  function GenerateInputs(props) {
    const { name, numberOfInputs } = props;
    //builds an array the size of number of inputs, then generates as many input boxes are the size of number of inputs
    return [...Array(parseInt(numberOfInputs))].map((e, i) => {
      return (
        //this is the element that will be rende, control it by changing the cell's css
        <input key={name + i} className={classes.cell}></input>
      );
    });
  }
  return (
    <>
      <Box minWidth={780}>
        <fieldset
          style={{ position: "relative", float: "left", minWidth: "400px" }}
        >
          {totalRows ? (
            <>
              <div>
                <label for="fname">Cumulative:</label>
                <GenerateInputs numberOfInputs={totalRows} name={rowName} />
              </div>
              <div>
                <label style={{ marginRight: 65 }}>Cut:</label>
                <GenerateInputs numberOfInputs={totalRows} name={rowName} />
              </div>
            </>
          ) : (
            <>
              <div>
                <label for="fname">Cumulative:</label>
              </div>
              <div>
                <label style={{ marginRight: 65 }}>Cut:</label>
              </div>
            </>
          )}
          {/*This is the first drop down below cut, called a selector */}
          <select type="number" name="number" id="number">
            <option value="343">343</option>
            <option value="121">121</option>
          </select>{" "}
          <br />{" "}
          <select type="number" name="number" id="number">
            <option value="3.5">3.5</option>
            <option value="5.5">5.5</option>
          </select>
        </fieldset>
        <div style={{ float: "right", width: "100px", height: 30, alignContent: "start" }}>
          <p className="border" style={{ width: "45%", float: "left" }}>
            Loss
          </p>
          <p className="border" style={{ width: "45%", float: "right" }}>
            Blds
          </p>
        </div>
      </Box>
    </>
  );
}
