window.addEventListener("load", initMap);
window.addEventListener("load", initIcons);


// Global Variable for the map
let myMap;
let redIcon;
let blueIcon;




// Initialisierung der Karte
function initMap() {
	myMap = L.map('mapid').setView([49.250723, 7.377122], 13);

	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    maxZoom: 21,
	    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	    
	}).addTo(myMap);
	
	//getAllPoi();
	
	// registriere Callback-Methode auf die Marker
	markers = L.layerGroup().addTo(myMap);
}

// Initialisiert die Icons
function initIcons() {
	redIcon = new L.Icon({
		iconUrl: './icon/marker-icon-red.png',
		shadowUrl: './icon/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

	blueIcon = new L.Icon({
		iconUrl: './icon/marker-icon-blue.png',
		shadowUrl: './icon/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});
}

// +++++++++++++++++++++++++++++++++++++++++++++++

//function getAllPoi()
//{
//	fetch("demo/user",
//		{
//			method: "get",
//			headers: {
//				"Accept": "application/json",
//				"Content-Type": "application/json"
//			}
//		})
//		.then( response =>  response.json())
//        .then( user     =>  showMarker(user) )
//        .catch(error    =>  console.error('Error:', error) );
//}

function showMarker(user)
{
	console.log("showLabels");
	for (let i = 0; i < user.length; i++) {
		let poi = user[i];

		let marker = L.marker([user.position.lat, user.position.lon], { icon: blueIcon })
			.addTo(myMap).on('click', (event) => onPoiSelected(event, poi));
	}
}

function onPoiSelected(event, user)
{
   // todo
   console.log("poi selected, " + user.poiType + " id " + user.id );
}


