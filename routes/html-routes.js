// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
//index page(home page)
  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/index");
    }
    res.render("index");
  });
//get the login page
  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/login");
    }
    res.render("login");
  });
//get the history page
  app.get("/history", function(req, res) {
    if (req.user) {
      res.redirect("/history");
    }
    res.render("history");
  });
//get the about page
  app.get("/about", function(req, res) {
    if (req.user) {
      res.redirect("/about");
    }
    res.render("about");
  });
//get the maps page
  app.get("/maps", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/maps");
    }
    res.render("maps");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
