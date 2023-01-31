const connection = require("../db/oldDatabase")




//inserts supervisor into table 
const Create = (name, res) => {
    try {
        connection.query(`select * from equipment`)
        res.send("inserted")
    } catch (error) {
        res.send("error", error)
    }
}

//read all names from the equipment's table
const Read = (res) => {
    try {
        console.log("read")
        const empty = [];
        connection.query(`select * from equipment where equipment != 'Not Specified'`, (err, result) => {
            while (result.length) {
                empty.push((result.shift()))
            }
            res.send(empty)
        })
    } catch (error) {
        res.send("error", error)
    }
}

//change the supervisor's name
const Update = (res, reasons) => {
    try {
        connection.query(`update equipment set equipment = '${reasons.reason}' where id = ${reasons.id}`, (err, result) => {
            res.json(result.changedRows)
        })
    } catch (error) {
        res.json("error", error)
    }
}

//deletes supervisor 
const Delete = (res, reasons) => {
    console.log("deleted", reasons)
    // try {
    //     connection.query(`select * from equipment`)
    //     res.send("Deleted")
    // } catch (error) {
    //     res.send("error", error)
    // }
}





module.exports = {
    Create: Create,
    Read: Read,
    Update: Update,
    Delete: Delete,
};