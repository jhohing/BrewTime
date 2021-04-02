// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });
//get the login page
  app.get("/login", function(req, res) {
    res.render("login");
  });
//get the history page
  app.get("/history", function(req, res) {
    res.render("history");
  });
//get the about page
  app.get("/about", function(req, res) {
    res.render("about");
  });
//get the maps page
  app.get("/members", function(req, res) {
    // If the user already has an account send them to the members page
    if (!req.user) {
      res.redirect("/login");
    }
    res.render("maps");
  });

};