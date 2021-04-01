var express = require("express");

var router = express.Router();

const brewTime = require("../models/brewTime.js");

//router.get
router.get("/", function (req, res) {
    brewTime.all(function (data) {
        var hbsObject = {
            brewTime: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
//get the about.handlebars
router.get("/about", function (req, res) {
    brewTime.all(function (data) {
        var hbsObject = {
            brewTime: data
        };
        console.log(hbsObject);
        res.render("about", hbsObject);
    });
});
//get the history.handlebars
router.get("/history", function (req, res) {
    brewTime.all(function (data) {
        var hbsObject = {
            brewTime: data
        };
        console.log(hbsObject);
        res.render("history", hbsObject);
    });
});
//get the login.handlebars
router.get("/login", function (req, res) {
    brewTime.all(function (data) {
        var hbsObject = {
            brewTime: data
        };
        console.log(hbsObject);
        res.render("login", hbsObject);
    });
});
//get the maps.handlebars
router.get("/maps", function (req, res) {
    brewTime.all(function (data) {
        var hbsObject = {
            brewTime: data
        };
        console.log(hbsObject);
        res.render("maps", hbsObject);
    });
});

//router.post
router.post("/api/brewTime", function (req, res) {
    brewTime.create([
        //
    ], [
        // req.body.
    ], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});
//router.put
router.put("/api/brewTime/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    brewTime.update({
        
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
//router.delete
router.delete("/api/brewTime/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    brewTime.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;