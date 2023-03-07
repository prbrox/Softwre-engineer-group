const mysql = require("mysql");
const connection = require("../db/oldDatabase");
const asyncHandler = require("./errorHandler");

//tryConnection()
//inserts supervisor into table
const Create = asyncHandler((res, record) => {
  //if (typeof (connection) === "undefined") tryConnection()
  switch (record.database) {
    case "equipment":
      record.query = `insert ${record.database}(plant_code, line, equipment, deleted) values ('A820', ${record.id}, '${record.name}', 0)`;
      break;
    case "dt_code":
      record.query = `insert ${record.database}(equip, dt_reason, deleted) values (${record.id}, '${record.name}', 0)`;
      break;
    case "sps_downtime_codes":
      record.query = `insert ${record.database}(Metric, deleted) values (${record.name}, 0)`;
      break;
    default:
      record.query = "select * from equipment";
      break;
  }

  connection.query(`${record.query}`, (result, err) => {
    res.sendStatus(200);
  });
});

//read all names from the equipment's table
const Read = asyncHandler((res) => {
  //if (typeof (connection) === "undefined") tryConnection()
  console.log("read");
  //console.log(query)
  var data = { equipment: [], reasons: [], category: [] };

  connection.query(
    "select * from equipment where equipment != 'Not Specified' and deleted = 0",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        result?.forEach((element) => {
          data.equipment.push({
            id: element.id,
            name: element.equipment,
            lineNumber: element.line,
          });
        });
        updateObject(data);
      }
    }
  );

  connection.query("select * from dt_code where deleted = 0", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      result?.forEach((element) => {
        data.reasons.push({
          id: element.id,
          name: element.dt_reason,
          lineNumber: element.equip,
        });
      });
      updateObject(data);
    }
  });

  connection.query(
    "SELECT id, Metric FROM sps_downtime_codes where deleted = 0",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      //data.category.push((result.shift()))
      else {
        result?.forEach((element) => {
          data.category.push({
            id: element.id,
            name: element.Metric,
            lineNumber: 100,
          });
        });
        updateObject(data);
      }
    }
  );

  function updateObject(object) {
    if (
      object.equipment.length &&
      object.reasons.length &&
      object.category.length
    ) {
      res.status(200).send(object);
    }
  }
});

//change the supervisor's name
const Update = asyncHandler((res, record) => {
  //if (typeof (connection) === "undefined") tryConnection()
  record.query = `update ${record.database} set ${record.rowName} = '${record.name}' where id =${record.id}`;

  connection.query(record.query, (err, result) => {
    res.sendStatus(400);
  });
});

//deletes supervisor
const Delete = asyncHandler((res, record) => {
  //if (typeof (connection) === "undefined") tryConnection()
  record.query = `update ${record.database} set deleted = 1 where id =${record.id}`;

  connection.query(`${record.query}`, (result, err) => {
    res.sendStatus(200);
  });
});

module.exports = {
  Create: Create,
  Read: Read,
  Update: Update,
  Delete: Delete,
};
