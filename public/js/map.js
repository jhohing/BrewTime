let map, infoWindow;
function initMap(lat, long) {
    map = new google.maps.Map(document.getElementById("map"), {
        // center: { lat: lat, lng: long },
        zoom: 14,
    });
    infoWindow = new google.maps.InfoWindow();
}

async function renderSearches(lon, lat) {
    var apiKey = "AIzaSyBpP9c6UVQA5-hoA1VcR953lZwAsGfUUFg";
    var searchurl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=&radius=3000&keyword=cafe&type=cafe&key=${apiKey}`;
    const request = await fetch(searchurl, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch(err => console.error(err));
    console.log(request);
    request.results.map(function (item, index) {
        // console.log(index, item.name);
        $(".results").append(`<p> ${index}: ${item.name} Open: ${item.opening_hours.open_now === true ? "Yes" : "No"} </p>`);
        // console.log(item.geometry.location.lat, item.geometry.location.lng);
        const marker = new google.maps.Marker({
            position: { lat: item.geometry.location.lat, lng: item.geometry.location.lng },
            label: `${index}`,
            // zIndex: 1

        })
        marker.setMap(map)
    })
}; 