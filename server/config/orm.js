// Import MySQL connection.
// const connection = require("../config/connection.js");
const db = require("../../server/server");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Paul Laird => 'Paul Laird')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Paul Laird'} => ["name='Paul Laird'"]
            // e.g. {active: true} => ["active=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
    all: function (tableInput, cb) {
        var queryString = `SELECT * FROM ${tableInput};`;
        db.query(queryString, function (err, result) {
            if(err) throw err;
            cb(result);
        });
    },
    create: function (table, cols, vals, cb) {
        const queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;

        // var queryString = "INSERT INTO " + table;
        // queryString += " (";
        // queryString += cols.toString();
        // queryString += ") ";
        // queryString += "VALUES (";
        // queryString += printQuestionMarks(vals.length);
        // queryString += ") ";

        console.log(queryString);

        db.query(queryString, vals, function (err, result) {
            if(err) throw err;
            cb(result);
        });
    },
    // An example of objColVals would be {user: Paul, active: true}
    update: function (table, objColVals, condition, cb) {
        const queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;

        // var queryString = "UPDATE " + table;
        // queryString += " SET ";
        // queryString += objToSql(objColVals);
        // queryString += " WHERE ";
        // queryString += condition;

        console.log(queryString);
        db.query(queryString, function (err, result) {
            if(err) throw err;
            cb(result);
        });
    },
    delete: (table, condition, cb) => {
        const queryString = `DELETE FROM ${table} WHERE ${condition}`;

        // var queryString = "DELETE FROM " + table;
        // queryString += " WHERE ";
        // queryString += condition;

        db.query(queryString, (err, result) => {
            if(err) throw err;
            cb(result);
        });
    }
};

// Export the orm object for the model (../models/model.js).
module.exports = orm;