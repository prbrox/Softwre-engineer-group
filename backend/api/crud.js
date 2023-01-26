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
        const empty = [];
        connection.query(`select * from equipment`, (err, result) => {
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
const Update = (name, update, res) => {
    try {
        connection.query(`select * from equipment`)
        res.send("updated")
    } catch (error) {
        res.send("error", error)
    }
}

//deletes supervisor 
const Delete = (name, res) => {
    try {
        connection.query(`select * from equipment`)
        res.send("Deleted")
    } catch (error) {
        res.send("error", error)
    }
}





module.exports = {
    Create: Create,
    Read: Read,
    Update: Update,
    Delete: Delete,
};