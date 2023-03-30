function Form() {
  return (
    <div>
      <div class="container">
        <form class="form">
          <label>Waste/Circle</label>
          <input type="text" />
          <br />
          <label>WULoss</label>
          <input type="text" />
          <br />
          <label>WU Consumed</label>
          <input type="text" />
          <br />
          <label>produced_WU</label> <input type="text" />
          <br />
          <label>Customer</label>
          <input type="text" />
          <br />
          <label>Job# </label>
          <input type="text" />
          <br />
          <label>Page#</label> <input type="text" />
          <br />
          <label>Go To:</label>
          <input list="example" />
          <datalist id="example">
            <option value="example"></option>
            <option value="example"></option>
            <option value="example"></option>
          </datalist>
        </form>

        <button>Delete Record</button>
      </div>

      <div class="container">
        <div>
          <h3 class="title">Work orders</h3>
          <form class="form">
            <label>Work Order 1</label>
            <input type="text" />
            <br />
            <label>Work Order 2</label> <input type="text" />
            <br />
            <label>Work OrderS3</label>
            <input type="text" />
            <br />
            <label>Work Order 4</label> <input type="text" />
            <br />
            <label>Work Order 5</label> <input type="text" />
          </form>
        </div>
        <button class="pdf-button">PDF</button>
      </div>

      <br />
      <div class="group-of-buttons">
        <button>print</button>
        <button>reports</button>
        <button>PDF</button>
      </div>

      <br />

      <div class="container">
        <div class="block">
          <label>Error Message </label>
          <textarea name="error" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>
  );
}
export default Form;
