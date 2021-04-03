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
  // console.log(request.results[0].place_id);
  request.results.map(function(item, index) {
    // console.log(index, item.name);
    // $(".results").append("<ol>"); 
    let placeId = request.results[index].place_id;
    getPlacesURL(placeId, index)
    .then(placeURL => {
      // console.log(renderSearches);
      // console.log(index);
      $(".results").append(`<p> ${index} <a href="${placeURL}" target="_blank"> ${item.name}</a> Open: ${item.opening_hours.open_now === true ? "Yes" : "No"} </p>`);
      // let renderResults = request.results;
      // renderResults.sort((a, b) => Number(a.index) - Number(b.index));
      // console.log(renderResults)
    });

    // $(".results").append("</ol>"); 
    
    // console.log(item.geometry.location.lat, item.geometry.location.lng);
    const marker = new google.maps.Marker({
      position: {lat: item.geometry.location.lat, lng: item.geometry.location.lng}, 
      label: `${index}`
    })
    marker.setMap(map)
    

})

};

async function getPlacesURL(place_id, placesIndex) {
    var apiKey = "AIzaSyBpP9c6UVQA5-hoA1VcR953lZwAsGfUUFg";
    var url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${apiKey}`;
    const request = await fetch(url, {
      method: 'GET',
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
    .catch(err => console.error(err)); 
    // console.log(request);
    // console.log(request.result.website);
    let pURL = request.result.website; 
    return pURL; 


}


