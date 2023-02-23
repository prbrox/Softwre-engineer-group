const connection = require("../db/oldDatabase");
const connection = require("../database/db");
const trycatch = require("../../src/error/error-handling.js");

const asyncHandler = (fn) => (res, record) => {
  try {
    fn(res, record);
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};



//inserts supervisor into table
const Create = (name, res) => {
  try {
    connection.query(`insert into Supervisors(name) values ('${name}')`);
    res.send("inserted");
  } catch (error) {
    res.send("error", error);
  }
};

//read all names from the supervisor's table
const Read = (res) => {
  try {
    const empty = [];
    connection.query(`SELECT * from Supervisors`, (err, result) => {
      while (result.length) {
        empty.push(result.shift().Name);
      }
      res.send(empty);
    });
  } catch (error) {
    res.send("error", error);
  }
};

//change the supervisor's name
const Update = (name, update, res) => {
  try {
    connection.query(
      `UPDATE Supervisors SET name = '${update}' where name = '${name}' limit 1`
    );
    res.send("updated");
  } catch (error) {
    res.send("error", error);
  }
};

//deletes supervisor
const Delete = trycatch((name, res) => {
  try {
    connection.query(`Delete from Supervisors where name ='${name}' limit 1`);
    res.send("Deleted");
  } catch (error) {
    res.send("error", error);
  }
});

const WriteReport = (report, res) => {
  try {
    connection.query(
      `insert into Reports(date, supervisor, observer, type, observationType, feedback, actions) values('${report.date}', '${report.supervisor}', '${report.observer}', '${report.type}', '${report.observationType}', '${report.feedback}', '${report.actions}')`
    );
    res.send("Wrote");
  } catch (error) {
    res.send("error", error);
  }
};

const ReadReports = (res) => {
  try {
    connection.query(`SELECT * from Reports`, (err, result) => {
      if (err) res.send("error");
      res.send(result);
    });
  } catch (error) {
    console.log("error", error);
  }
};

const CheckPass = (pass, res) => {
  try {
    const response = pass === process.env.REACT_APP_PASS;
    if (response) res.send({ roles: 155 });
    res.send({ roles: 0 });
  } catch (error) {
    res.send("error", error);
  }
};


//inserts supervisor into table
const Create = asyncHandler((res, record) => {
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
});

//read all names from the equipment's table
const Read = asyncHandler((res) => {
  try {
    //console.log("read");
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
});

//change the supervisor's name
const Update = asyncHandler((res, record) => {
  try {
    record.query = `update ${record.database} set ${record.rowName} = '${record.name}' where id =${record.id}`;

    connection.query(record.query, (err, result) => {
      res.sendStatus(400);
    });
  } catch (error) {
    res.send(400, "error", error);
  }
});

//deletes supervisor
const Delete = asyncHandler((res, record) => {
  try {
    record.query = `update ${record.database} set deleted = 1 where id =${record.id}`;

    connection.query(`${record.query}`, (result, err) => {
      res.sendStatus(200);
    });
  } catch (error) {
    res.send(400, error);
  }
});

module.exports = {
  Create: Create,
  Read: Read,
  Update: Update,
  Delete: Delete,

  Create: Create,
  Read: Read,
  Update: Update,
  Delete: Delete,
  WriteReport: WriteReport,
  ReadReports: ReadReports,
  CheckPass: CheckPass,
};
