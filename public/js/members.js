$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);

    getlocation()
    function getlocation() {
      if (window.navigator.geolocation) {
        (window.navigator.geolocation.getCurrentPosition(locationData =>
          console.log(locationData)));
      }
      else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
  });
});
