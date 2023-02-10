const connection = require("../db/oldDatabase");

//inserts supervisor into table
const Create = (res, record) => {
  try {
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
  } catch (error) {
    res.sendStatus(400);
  }
};

//read all names from the equipment's table
const Read = (res) => {
  try {
    console.log("read");
    //console.log(query)
    var data = { equipment: [{}], reasons: [], category: [] };

    connection.query(
      "select * from equipment where equipment != 'Not Specified' and deleted = 0",
      (err, result) => {
        result.forEach((element) => {
          data.equipment.push({
            id: element.id,
            name: element.equipment,
            lineNumber: element.line,
          });
        });
        updateObject(data);
      }
    );

    connection.query(
      "select * from dt_code where deleted = 0",
      (err, result) => {
        result.forEach((element) => {
          data.reasons.push({
            id: element.id,
            name: element.dt_reason,
            lineNumber: element.equip,
          });
        });
        updateObject(data);
      }
    );

    connection.query(
      "SELECT id, Metric FROM sps_downtime_codes where deleted = 0",
      (err, result) => {
        //data.category.push((result.shift()))
        result.forEach((element) => {
          data.category.push({
            id: element.id,
            name: element.Metric,
            lineNumber: 100,
          });
        });
        updateObject(data);
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
  } catch (error) {
    res.status(400).send(error);
  }
};

//change the supervisor's name
const Update = (res, record) => {
  try {
    record.query = `update ${record.database} set ${record.rowName} = '${record.name}' where id =${record.id}`;

    connection.query(record.query, (err, result) => {
        res.sendStatus(400)
    });
  } catch (error) {
    res.send(400, "error", error);
  }
};

//deletes supervisor
const Delete = (res, record) => {
  try {
    record.query = `update ${record.database} set deleted = 1 where id =${record.id}`;

    connection.query(`${record.query}`, (result, err) => {
      res.sendStatus(200);
    });
  } catch (error) {
    res.send(400, error);
  }
};

module.exports = {
  Create: Create,
  Read: Read,
  Update: Update,
  Delete: Delete,
};
