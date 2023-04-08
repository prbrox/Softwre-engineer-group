import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
//acts as the css for the code
const useStyles = makeStyles((theme) => ({
  cell: {
    width: 50,
    margin: 0,
    padding: 0,
  },
}));

export default function Accumulative(props) {
  const [accumulateBox, setAccumulateBox] = useState({
    lengthloss: 0,
    totalLoss: 0,
    LumberPerblds: 0,
    totalBlds: 0,
  });
  const { totalRows, row } = props;
  const classes = useStyles();

  //generates input boxes based on the numebr of inputs
  function GenerateInputs(props) {
    const { name, totalNumberOfColumns, row } = props;
    //check each column, populate the value of current column based from all preceding boxes
    const populateCumulative = async (columnNumber) => {
      var holder = 0,
        sender,
        value;
      //start at first box, go until the current box  eqauls the total number of columns
      for (let current = 0; current < totalNumberOfColumns; current++) {
        value = document.getElementById(`cut-${row}-${current}`).value;
        //convert the value into an Int, ensure it's bigger than 0
        if (parseInt(value) > 0) {
          if (current > 0) {
            //do the calculation
            holder = parseInt(value) + holder + 0.5;
            sender = holder;
          } else {
            holder = parseInt(value) + holder;
            sender = holder;
          }
          //if the value is less than or equal to 0
        } else {
          sender = 0;
        }
        //set the above box to sender
        document.getElementById(`cum-${row}-${current}`).value = sender;
      }
    };
    //builds an array the size of number of inputs, then generates as many input boxes are the size of number of inputs
    return [...Array(parseInt(totalNumberOfColumns))].map((e, i) => {
      return (
        //this is the element that will be rende, control it by changing the cell's css
        <input
          id={name + "-" + row + "-" + i}
          key={name + i}
          className={classes.cell}
          onChange={() => populateCumulative(i)}
          defaultValue={0}
        ></input>
      );
    });
  }
  return (
    <>
      <Box sx={{ display: "inline-block" }}>
        <fieldset style={{ display: "inline-block", float: "left" }}>
          {totalRows ? (
            <>
              <div>
                <label for="fname">Cumulative:</label>
                <GenerateInputs
                  totalNumberOfColumns={totalRows}
                  name={"cum"}
                  row={row}
                />
              </div>
              <div>
                <label style={{ marginRight: 52 }}>Cut:</label>
                <GenerateInputs
                  totalNumberOfColumns={totalRows}
                  name={"cut"}
                  row={row}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label for="fname">Cumulative:</label>
              </div>
              <div>
                <label style={{ marginRight: 50 }}>Cut:</label>
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

        <div className="item2">
          <div>
            <div className="border">Loss</div>

            <div className="border">#Bdls</div>
          </div>
          <div>
            <div className="border"> {accumulateBox.lengthloss}</div>
            <div className="border">{accumulateBox.lengthloss}</div>
          </div>
          <div>
            <div className="border"> {accumulateBox.totalBlds}</div>
            <div className="border">{accumulateBox.LumberPerblds}</div>
          </div>
          <div></div>
          <div className=" spacing">Example text </div>
        </div>
      </Box>
    </>
  );
}
