const changeLocation = (component) => {
    let startIndex = component.indexOf(">") + 1
    let endIndex = component.indexOf("<", startIndex);
    locationString = component.substring(startIndex,endIndex);
    console.log(locationString);
    mymap.flyTo(locations[locationString], 10);
}

const findAddress = async () => { 
    const entered_text = document.getElementById("locationText").value;
    const normalized = encodeURIComponent(entered_text);
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${normalized}.json?access_token=${L.mapbox.accessToken}`);
    const coordinates = [response.data.features[0].center[1], response.data.features[0].center[0]]  
    L.marker(coordinates).addTo(mymap);
    locations[entered_text] = coordinates;
    document.getElementsByTagName('input')[0].value = "";
    let locationList = document.getElementsByTagName('ul')[0]; 
    locationList.innerHTML += "<li onclick='changeLocation(this.innerHTML)'><p id='location" + Object.keys(locations).length.toString() +"'>" + entered_text + "</p></li>";
    mymap.flyTo(coordinates, 10);
}

var mymap, geocoder, marker, locations;
L.mapbox.accessToken = 'pk.eyJ1Ijoic2RhaGFsMiIsImEiOiJja2g4NzVjd3IwYmVvMnRvNzU1bjlia2tsIn0.GhYhUmrb0rsxIXrl3rjyLg';
const initialization = () =>{
    mymap = L.mapbox.map('myMap').setView([40.896401, -74.022748], 13);
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${L.mapbox.accessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: L.mapbox.accessToken
    }).addTo(mymap)
    geocoder = L.mapbox.geocoder('mapbox.places');
    marker = {
        icon: L.mapbox.marker.icon({
            'marker-size':'large',
            'marker-color':'#fa0'
        })};
    locations = {};
}
