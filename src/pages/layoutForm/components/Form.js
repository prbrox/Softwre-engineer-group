import { Box, Button } from "@mui/material";

function Form() {
  return (
    <div>
      <div className="container">
        <Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(177, 81, 42)" }}
          >
            {" "}
            {"<"}{" "}
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(177, 81, 42)",
            }}
          >
            {" "}
            {">"}{" "}
          </Button>
        </Box>
        <form className="form">
          <div>
            <label>Date Added</label>
            <input type="text" />
          </div>
          <div>
            <label>Layout Rating</label>
            <input type="text" />
          </div>
          <div>
            <label>Consumed</label>
            <input type="text" />
          </div>
          <div>
            <label>Produced</label>
            <input type="text" />
          </div>
          <div>
            <label>Tecloss</label>
            <input type="text" />
          </div>
          <div>
            <label>Holtec loss</label>
            <input type="text" />
          </div>
          <div>
            <label>Holtec_Waste</label>
            <input type="text" />
          </div>
          <div>
            <label>circle_wu</label>
            <input type="text" />
          </div>
          <div>
            <label>Waste/Circle</label>
            <input type="text" />
          </div>
          <div>
            <label>WULoss</label>
            <input type="text" />
          </div>
          <div>
            <label>WU Consumed</label>
            <input type="text" />
          </div>
          <div>
            <label>produced_WU</label> <input type="text" />
          </div>
          <div>
            <label>Customer</label>
            <input type="text" />
          </div>
          <div>
            <label>Job# </label>
            <input type="text" />
          </div>
          <div>
            <label>Page#</label> <input type="text" />
          </div>
          <div>
            <label>Go To:</label>
            <input list="example" />
          </div>
          <div>
            <datalist id="example">
              <option value="example"></option>
              <option value="example"></option>
              <option value="example"></option>
            </datalist>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button>Delete Record</button>
            <button className="pdf-button">PDF</button>
          </div>
        </form>
      </div>

      <div className="container">
        <div>
          <h3 className="title">Work orders</h3>
          <form className="form-workorder">
            <div>
              <label className="label">Work Order 1</label>
              <input type="text" />
            </div>
            <div>
              <label className="label">Work Order 2</label>{" "}
              <input type="text" />
            </div>
            <div>
              <label className="label">Work Order 3</label>

              <input type="text" />
            </div>
            <div>
              <label className="label">Work Order 4</label>{" "}
              <input type="text" />
            </div>
            <div>
              <label className="label">Work Order 5</label>{" "}
              <input type="text" />
            </div>
          </form>
        </div>
      </div>

      <div className="container">
        <div className="block">
          <label className="label1">Error </label>
          <textarea name="error" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>
  );
}
export default Form;
