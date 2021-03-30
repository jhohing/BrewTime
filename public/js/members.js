let map, infoWindow;
$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);

    getlocation()
    function getlocation() {
      if (window.navigator.geolocation) {
        (window.navigator.geolocation.getCurrentPosition(locationData => {
           // console.log(locationData)));
           let currentLat = locationData.coords.latitude;
           let currentLong = locationData.coords.longitude;
          // let currentLat = 40.717499;
          // let currentLong = -74.044113;

           initMap(currentLat, currentLong)
           renderSearches(currentLat, currentLong)

        }))
      }
      else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }

    }
  });
});

function initMap(lat, long) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: long },
    zoom: 14,
  });
  infoWindow = new google.maps.InfoWindow();
}

async function renderSearches(lon,lat) {
  var apiKey = "AIzaSyBpP9c6UVQA5-hoA1VcR953lZwAsGfUUFg";
  var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lon},${lat}&radius=3000&keyword=cafe&type=cafe&key=${apiKey}`;
  const request = await fetch(url, {
    method: 'GET',
    mode: 'cors', 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => data.json())
  .catch(err => console.error(err)); 
  console.log(request);
  request.results.map(function(item, index) {
    // console.log(index, item.name);
    $(".results").append(`<p> ${index} , ${item.name} </p>`);
    // console.log(item.geometry.location.lat, item.geometry.location.lng);
    const marker = new google.maps.Marker({
      position: {lat: item.geometry.location.lat, lng: item.geometry.location.lng}, 
      label: `${index}`, 
      zIndex: 1
    
    })
    marker.setMap(map)

})

};


