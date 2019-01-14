var express = require("express");

var router = express.Router();

// Import the model (database.js) to use its database functions.
var database = require("../models/database.js");

// Create all our routes and set up logic within those routes where required.
router.get("/api/users", (req, res) => {
    database.all(data => {
        var hbsObject = {
            database: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/users", (req, res) => {
    // Setup your data structure here
    database.create([
        "username", "active"
    ], [
        req.body.username, false
    ], result => {
        // Send back the ID of the new quote
        res.json({
            id: result.insertId
        });
    });
});

router.put("/api/users/:id", (req, res) => {
    var condition = `id = ${req.params.id}`;

    console.log("condition", condition);

    database.update({
        active: req.body.active
    }, condition, result => {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/users/:id", (req, res) => {
    var condition = "id = " + req.params.id;

    database.delete(condition, result => {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;