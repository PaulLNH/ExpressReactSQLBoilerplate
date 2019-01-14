// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var users = {
    all: cb => {
        orm.all("users", res => {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: (cols, vals, cb) => {
        console.log(`Attempting to create via the model.js`);
        orm.create("users", cols, vals, res => {
            cb(res);
        });
    },
    update: (objColVals, condition, cb) => {
        orm.update("users", objColVals, condition, res => {
            cb(res);
        });
    },
    delete: (condition, cb) => {
        orm.delete("users", condition, res => {
            cb(res);
        });
    }
};

// Export the database functions for the controller (../controllers/controller.js).
module.exports = users;