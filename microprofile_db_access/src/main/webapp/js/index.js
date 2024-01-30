window.addEventListener("load", initialisation );
//window.addEventListener("load", initMap);
window.addEventListener("load", initIcons);
let myMap;
var homeMarker;
var selectedMarker; 
var selectedText;
var markerStorage = new Map(); 
function initialisation(){
	document.getElementById("cancelButton").addEventListener("click", hideRegistrierung);//hideRegistrierung
	document.getElementById("registrierungsLink").addEventListener("click", showRegistrierung); //showRegistrierung
	//document.getElementById("timescheduleLink").addEventListener("click", showTimeSchedule);//showTimeSchedule
	//document.getElementById("mitfahrgelegenheitLink").addEventListener("click", showMitfahrgelegenheit); //showMitfahrgelegenheit
    document.getElementById("loginButton").addEventListener("click", login_); 
   document.getElementById("logOut").addEventListener("click", lougout_);
 //   //document.getElementById("registrierungBestätigen").addEventListener("click", saveImage);
 //   //document.getElementById("searchRide").addEventListener("click", search); 
    
    let token = sessionStorage.getItem('uuidToken');
    if(token == null) {
	//hideLoggedInMenu();
    //hideSearch();
    //hideRegistrierung();
    //hideTimeSchedule(); 
}
	initMap();
	//reload();
}

function initMap() {
	myMap = L.map('mapid').setView([49.250723, 7.377122], 13);

	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 21,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',

	}).addTo(myMap);

	//getAllPoi();

	// registriere Callback-Methode auf die Marker
	//markers = L.layerGroup().addTo(myMap);


}
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
	let homeIcon = new L.Icon({
		iconUrl: './icon/marker-icon-home.png',
		shadowUrl: './icon/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});
}
//function initmap() {
//    myMap = L.map('mapid').setView([49.250723, 7.377122], 12);

//    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, <a href="https://www.flaticon.com/free-icons/address" title="address icons">Address icons created by DinosoftLabs - Flaticon</a>',
//        maxZoom: 21, // max. possible 23
//        id: 'mapbox/streets-v11',
//        tileSize: 512,
//        zoomOffset: -1,
//        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
//        crossOrigin: true,
//        integrity: 'sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM='
//    }).addTo(myMap);
//	markers = L.layerGroup().addTo(myMap);
//}



function lougout_() {
	document.getElementById("loggedInTopBar").style.display = "none";
	document.getElementById("topbarlogin").style.display = "block";
	closeNav();
	document.getElementById("userNameLogin").value = "";
	document.getElementById("passwordLogin").value = "";


}
function login_() {
	username = document.getElementById("userNameLogin").value;
	password = document.getElementById("passwordLogin").value;


	if (username === "admin" && password === "admin") {
		document.getElementById("loggedInTopBar").style.display = "block";
		document.getElementById("topbarlogin").style.display = "none";

		document.querySelector("#userNameSpan").innerHTML = "Oussama Hamioui";
	} else {
		alert("Login failed !!");
	}


}
//let redIcon = new L.Icon({
//		iconUrl: './icon/marker-icon-red.png',
//		shadowUrl: './icon/marker-shadow.png',
//		iconSize: [25, 41],
//		iconAnchor: [12, 41],
//		popupAnchor: [1, -34],
//		shadowSize: [41, 41]
//	});

//let	blueIcon = new L.Icon({
//		iconUrl: './icon/marker-icon-blue.png',
//		shadowUrl: './icon/marker-shadow.png',
//		iconSize: [25, 41],
//		iconAnchor: [12, 41],
//		popupAnchor: [1, -34],
//		shadowSize: [41, 41] 
//	});
		
//let	homeIcon = new L.Icon({
//		iconUrl: './icon/marker-icon-home.png', 
//		shadowUrl: './icon/marker-shadow.png',
//		iconSize: [25, 41], 
//		iconAnchor: [12, 41],
//		popupAnchor: [1, -34], 
//		shadowSize: [41, 41]
//	}); 

function showMitfahrgelegenheit(){
	hideTimeSchedule();
	showSearch(); 
}

function showTimeTable() {
	clearSearches(); 
	hideSearch();
	showTimeSchedule();
}

function showSearch(){
	document.getElementById("timescheduleLink").disabled = false; 
	document.getElementById("mitfahrgelegenheitLink").disabled = true; 
	setVisibility("find-ride-container", true);
}

function hideSearch(){
	document.getElementById("timescheduleLink").disabled = true;
	document.getElementById("mitfahrgelegenheitLink").disabled = false; 
	setVisibility("find-ride-container", false);
}


function hideRegistrierung() {
	//document.getElementById("cancelButton").disabled = true;
	//document.getElementById("registrierungsLink").disabled = false; 

	setVisibility("registration",false);
}

function showRegistrierung() {
	//document.getElementById("cancelButton").disabled = false;
	//document.getElementById("registrierungsLink").disabled = true;
	//this.preventDefault();
	clearRegister();
	setVisibility("registration",true);  
}

function showTimeSchedule() {
	document.getElementById("mitfahrgelegenheitLink").disabled = false; 
	document.getElementById("timescheduleLink").disabled = true; 
	setVisibility("timeScheduleDIV",true); 
	getUserAdress();
	clearSearches();
	hideSearch();
}

function hideTimeSchedule() {
	document.getElementById("timescheduleLink").disabled = false; 
	document.getElementById("mitfahrgelegenheitLink").disabled = true; 
	setVisibility("timeScheduleDIV",false); 
}

function hideLogin(){
	document.getElementById("loginButton").disabled = true; 
	document.getElementById("logOut").disabled = false; 
	setVisibility("topbarlogin",false);  
}

function showLogin(){
	document.getElementById("loginButton").disabled = false; 
	document.getElementById("logOut").disabled = true; 
	setVisibility("topbarlogin",true); 
}

function hideLoggedInMenu(){
	console.log(" Logged bar was readed")
	setVisibility("loggedInTopBar",false);
	document.getElementById("loggedInTopBar").style.display = "none";
}

function showLoggedInMenu(){ 
	setVisibility("loggedInTopBar",true); 
}

function setVisibility(elementId, visible) { //visibilite = true => elementid will  visible 
    const element = document.getElementById(elementId);
	if (visible === true) {
		element.style.display = "block";
    } else {
		element.style.display = "none";
    }
}

function login() {
	let logindata = {
		username: document.querySelector("#userNameLogin").value,
		password: document.querySelector("#passwordLogin").value
	};
	fetch('demo/access', {
		method: 'post',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(logindata)
	})
		.then(response => response.json())
		.then(data => {
			console.log("Login Token " + data);
			sessionStorage.setItem('uuidToken', data.token);
			sessionStorage.setItem('username', logindata.username);
			storeUserId(logindata.username); 
			hideLogin();
			showSearch();
			showLoggedInMenu();
			getUserName();
			clearLoginFields();
			setHomeMarker(logindata);
			loadImageLoginImage();
		})
		.catch((error) => {
			console.error('Error:', error);
			sessionStorage.removeItem('uuidToken');
		});
}

function logout() {
	let id = sessionStorage.getItem('uuidToken');
	fetch('demo/access' + '/?token=' + id, {
		method: 'delete'
	})
		.then(response => {
			if (response.ok) {
				sessionStorage.removeItem('uuidToken');
				sessionStorage.removeItem('username');
				sessionStorage.removeItem('userId'); 
			}
			clearSearches();
			hideLoggedInMenu();
			hideSearch();
			hideTimeSchedule(); 
			showLogin();
			removeMarker();
			removeSearchMarkers();
		})
		.catch(error => {
			console.error('Error:', error);
			sessionStorage.removeItem('uuidToken');
		});
}

function register() {
	console.log(sessionStorage.getItem('sendImage'));
	if(sessionStorage.getItem('sendImage') === false) {
		var person = {
		firstname: document.getElementById("firstName").value,
		lastname: document.getElementById("lastName").value,
		street: document.getElementById("straße").value,
		streetNumber: document.getElementById("number").value,
		zip: document.getElementById("plz").value,
		city: document.getElementById("ort").value,
		email: document.getElementById("email").value,
		username: document.getElementById("benutzerid").value,
		password: document.getElementById("password").value,
		image_id: sessionStorage.getItem('image_id')
	};
		console.log(person.image_id);
	fetch('demo/user', {
		method: 'post',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(person)
	})
		.then(response => response.json())
		.then(data => {
			console.log("Login Token " + data);
			sessionStorage.setItem('uuidToken', data.token);
			sessionStorage.setItem('username', person.username);
			sessionStorage.removeItem('sendImage');  
			storeUserId(person.username);
			saveImage();
			clearRegister();
			clearPlz();
			hideLogin();
			hideRegistrierung();
			showSearch();
			showLoggedInMenu(); 
			setHomeMarker(person);
			getUserName(); 
			loadImageLoginImage();
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	} else {
		 fetch('demo/image' , {
			method: 'get'
		})
		.then(response => response.json())
		.then(data => {
			var person = {
		firstname: document.getElementById("firstName").value,
		lastname: document.getElementById("lastName").value,
		street: document.getElementById("straße").value,
		streetNumber: document.getElementById("number").value,
		zip: document.getElementById("plz").value,
		city: document.getElementById("ort").value,
		email: document.getElementById("email").value,
		username: document.getElementById("benutzerid").value,
		password: document.getElementById("password").value,
		image_id: data
		};
		fetch('demo/user', {
		method: 'post',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(person)
	})
		.then(response => response.json())
		.then(data => {
			console.log("Login Token " + data);
			sessionStorage.setItem('uuidToken', data.token);
			sessionStorage.setItem('username', person.username); 
			sessionStorage.removeItem('sendImage'); 
			saveImage();
			clearRegister();
			clearPlz();
			hideLogin();
			hideRegistrierung();
			showSearch();
			showLoggedInMenu(); 
			setHomeMarker(person);
			getUserName(); 
			loadImageLoginImage();
		})
		.catch((error) => {
			console.error('Error:', error);
		})
	})
	}
} 

function clearLoginFields() {
	document.getElementById("userNameLogin").value = '';
	document.getElementById("passwordLogin").value = ''; 
}

function clearSearches() {
	document.querySelector("#searchResults").innerHTML = '';
}

function clearRegister() {
	document.getElementById("firstName").value = '';
	document.getElementById("lastName").value = '';
	document.getElementById("straße").value = '';
	document.getElementById("number").value = '';
	document.getElementById("plz").value = '';
	document.getElementById("ort").value = '';
	document.getElementById("email").value = '';
	document.getElementById("benutzerid").value = '';
	document.getElementById("password").value = '';
	//document.getElementById("registrationForm").reset();
}

function getUserName(){
	let id = sessionStorage.getItem('uuidToken'); 
	queryPar = "token=" + id; 
	fetch('demo/user?' + queryPar, {
		method: 'get'
	})
	.then(response => response.json())
	.then(data => {
		console.log("UserName " + data); 
		document.getElementById("userNameSpan").innerHTML = "Willkommen " + data.firstname + " " + data.lastname;
	})
	.catch((error) => {
		console.error('Error:', error); 
		sessionStorage.removeItem('uuidToken'); 
	}); 
}

function reload() {
	let id = sessionStorage.getItem('uuidToken'); 
	if(id != null) {
		hideLogin();
		hideTimeSchedule(); 
		hideRegistrierung(); 
		//getUserName(); 
	}
}

function getUserAdress() {
	let id = sessionStorage.getItem('uuidToken'); 
	queryPar = "token=" + id; 
	fetch('demo/user?' + queryPar, {
		method: 'get'
	})
	.then(response => response.json())
	.then(data => {
		console.log("UserAdress " + data); 
		document.getElementById("timeTableAdress").innerHTML =  data.street + " " + data.streetNumber + ", " + data.zip + " " + data.city; 
	})
	.catch((error) => {
		console.error('Error:', error); 
		sessionStorage.removeItem('uuidToken');
	});
}

function setHomeMarker(logindata){
	fetch('demo/user/position' + '/?username=' + logindata.username, {
       method: 'get'
    })
	.then(response => response.json())
	.then(data => {
		console.log("UserPosition " + data); 
		console.log(data.latitude); 
		console.log(data.longitude);
		homeMarker = new L.Marker([data.latitude, data.longitude]);
		homeMarker.setIcon(homeIcon); 
		homeMarker.addTo(myMap); 
		myMap.flyTo(homeMarker.getLatLng());
	})
	.catch((error) => {
		console.error('Error:', error); 
		sessionStorage.removeItem('uuidToken'); 
	});
}

function pickMarker(event, marker, li) {
    if (selectedMarker != null) { selectedMarker.setIcon(blueIcon); }
    selectedMarker = marker;
    selectedMarker.setIcon(redIcon);
    if (selectedText != null) { selectedText.style.color = "black"; }
    li.style.color = "red";
    selectedText = li;
}

function removeSearchMarkers() {
	markerStorage.forEach(deleteMarkerValue); 
}

function deleteMarkerValue(value){
	value.remove();
}

function removeMarker() {
	homeMarker.remove();
}

function loadImageLoginImage() {
let query = sessionStorage.getItem('uuidToken');
let imageId; 
fetch('demo/user?token=' + query, {
	method: 'get'
})
.then(response => response.json())
.then(data => {
	console.log("user" + data); 
	imageId = data.image_id
	fetch('demo/image/' + imageId + '/?token=' + query)
.then(response => response.arrayBuffer())  
.then(imageData => { return {"imageContent": imageData}; })
.then(data => {
	let div = document.querySelector("#userPB"); 
	div.textContent = '';
	let image = document.createElement("img"); 
	image.src = URL.createObjectURL(new Blob([data.imageContent],{tpye: 'image/png'}));
	image.height = "50"; 
	div.append(image);
})
.catch(error =>{
	console.error('Error:', error);
})
})
.catch(error => {
console.error('Error:', error); 
})
}

function saveImage() {
	let file = document.getElementById("profilbild").files[0]; 
	if(file){
		document.getElementById("profilbild").value = ""; 
		fetch('demo/image/' ,{
			method: 'post',
			headers: { 'Content-type': 'image/png' },
			body: file
		})
		.then(response => {
			if(!response.ok) {
				console.error('Denied storing image due to a error');
				throw Error(response.statusText);
			}
			console.log('Success');
			sessionStorage.setItem('sendImage', true); 
			return;
		})
		.catch(error => {
			console.error('Error:', error);
		});
		register(); 
	} else { 
		let iid = 1;
		sessionStorage.setItem('image_id', iid)
		sessionStorage.setItem('sendImage', false);
		register();
		}
}

function search() {
	clearSearches();
	removeSearchMarkers();
	//let fahrttyp = document.getElementsByName('fahrt');
	let distance = document.querySelector("#umkreisInput").value;
	let id = sessionStorage.getItem('uuidToken');
	queryPar = "distance=" + distance + "&token=" + id;
	fetch('demo/user/search?' + queryPar, {
		method: 'get'
	})
		.then(response => response.json())
		.then(data => {
			console.log("Search Result " + data);
			showSearchResult(data);
		})
		.catch((error) => {
			console.error('Error:', error);
			sessionStorage.removeItem('uuidToken');
		});
}

function setSearchMarkers(item, li) {
    fetch('demo/user/position' + '/?username=' + item.username, {
       method: 'get'
    })
	.then(response => response.json())
		.then(data => {
		console.log("UserPosition " + data); 
			let marker = new L.Marker([data.latitude, data.longitude]);
			marker.setIcon(blueIcon); 
			marker.addTo(myMap);
			marker.on("click", event => select(event, marker, li));
            li.addEventListener("click", event => pickMarker(event, marker, li));
            markerStorage.set(li, marker); 
	})
	.catch((error) => {
		console.error('Error:', error); 
		sessionStorage.removeItem('uuidToken'); 
	});
}

function storeUserId(username) {
	var token = sessionStorage.getItem('uuidToken'); 	
	fetch('demo/user/userId?username=' + username + '&token=' + token, {
		method: 'get'
	})
	.then(response => response.json())
	.then(data => {
		console.log("UserId " + data.user_id); 
		sessionStorage.setItem('userId', data.user_id); 
	})
	.catch((error) => {
		console.error('Error:', error); 
		sessionStorage.removeItem('uuidToken'); 
	});
}

function showSearchResult(data) {
	let div = document.querySelector("#searchResults");
	var ul = document.createElement('ul');
	let token = sessionStorage.getItem('uuidToken'); 
	data.forEach(item => {
		var username = sessionStorage.getItem('username');
		if(username != item.username) {
		var resultDiv = document.createElement('div'); 
		let personAsString = item.firstname + " " + item.lastname;
		let emailString = item.email; 
		let adressString = item.street + " " + item.streetNumber + ", " + item.zip + " " + item.city; 
		let liName = document.createElement('li');
		let liEmail = document.createElement('li');
		let liAdress = document.createElement('li'); 
		liName.classList.add("liStyle"); 
		liEmail.classList.add("liStyle"); 
		liAdress.classList.add("liStyle"); 
		liName.appendChild(document.createTextNode(personAsString));
		liEmail.appendChild(document.createTextNode(emailString)); 
		liAdress.appendChild(document.createTextNode(adressString)); 
		resultDiv.classList.add("resultDiv"); 
	    var pictureDiv = document.createElement('div'); 
	    pictureDiv.classList.add("pictureDiv"); 
	    var dataDiv = document.createElement('div'); 
	    dataDiv.classList.add("dataDiv");   
	    dataDiv.appendChild(liName);
		dataDiv.appendChild(liEmail); 
		dataDiv.appendChild(liAdress); 	
		setSearchMarkers(item, resultDiv);	
		
		let liDistance = document.createElement('li'); 
		liDistance.classList.add("liStyle");
		
		fetch('demo/user/position' + '/?username=' + item.username, {
       method: 'get'
    })
	.then(response => response.json())
		.then(data => {
			let marker = new L.Marker([data.latitude, data.longitude]);
			let hm = homeMarker.getLatLng(); 
			let ma = marker.getLatLng(); 
			let dist = hm.distanceTo(ma).toFixed(0)/1000; 
			let te = dist.toPrecision(1);
			liDistance.appendChild(document.createTextNode("Distanz in km: " + te)); 
	})
		.catch((error) => {
		console.error('Error:', error); 
		sessionStorage.removeItem('uuidToken'); 
	});
		
		dataDiv.appendChild(liDistance);
		
	    fetch('demo/image/' + item.image_id + '/?token=' + token)
	    .then(response => response.arrayBuffer())
	    .then(imageData => {return {"imageContent": imageData}; })
	    .then(data => {
		let image = document.createElement("img"); 
		image.src = URL.createObjectURL(new Blob([data.imageContent],{type: 'image/png'}));
		image.height = 50;
		pictureDiv.append(image); 
	})
	 .catch(error => console.error('Error:', error)); 
	 
		resultDiv.appendChild(dataDiv); 
		resultDiv.appendChild(pictureDiv); 
		ul.appendChild(resultDiv); 
		} else {
			console.log("User stimmt mit angemeldetem User überein, Ergebnis wird verworfen");
		}
	});
	div.appendChild(ul);
}

function loadWeek() {
	var token = sessionStorage.getItem('uuidToken');
	var uid = sessionStorage.getItem('userId');
	fetch('demo/weekday/?userId=' + uid + '&token=' + token, {
		method: 'get'
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			showTimeTable(data);
		})
		.catch((error) => {
			console.error('ERROR: ', error)
			sessionStorage.removeItem('uuidToken');
		})
}

function showTimeTable(data) {
	for (i = 0; i < data.length; i++) {
		var startTime = data[i].startTime;
		var endTime = data[i].endTime;
		var weekday = data[i].weekday;
		if (weekday == 1) {
			let mst = document.querySelector("#mondayBegin");
			let met = document.querySelector("#mondayEnd");
			let stArray = startTime.split(/[TZ]+/);
			let etArray = endTime.split(/[TZ]+/);
			mst.value = stArray[1];
			met.value = etArray[1];
		} else if (weekday == 2) {
			let tust = document.querySelector("#tuesdayBegin");
			let tuet = document.querySelector("#tuesdayEnd");
			let stArray = startTime.split(/[TZ]+/);
			let etArray = endTime.split(/[TZ]+/);
			console.log(stArray[1]);
			tust.value = stArray[1].value;
			tuet.value = etArray[1].value;
		} else if (weekday == 3) {
			let west = document.querySelector("#wednesdayBegin");
			let weet = document.querySelector("#wednesdayEnd");
			let stArray = startTime.split(/[TZ]+/);
			let etArray = endTime.split(/[TZ]+/);
			west.value = stArray[1];
			weet.value = etArray[1];
		} else if (weekday == 4) {
			let thst = document.querySelector("#thursdayBegin");
			let thet = document.querySelector("#thursdayEnd");
			let stArray = startTime.split(/[TZ]+/);
			let etArray = endTime.split(/[TZ]+/);
			thst.value = stArray[1];
			thet.value = etArray[1];
		} else if (weekday == 5) {
			let frst = document.querySelector("#fridayBegin");
			let fret = document.querySelector("#fridayEnd");
			let stArray = startTime.split(/[TZ]+/);
			let etArray = endTime.split(/[TZ]+/);
			frst.value = stArray[1];
			fret.value = etArray[1];
		} else if (weekday == 6) {
			let sast = document.querySelector("#saturdayBegin");
			let saet = document.querySelector("#saturdayEnd");
			let stArray = startTime.split(/[TZ]+/);
			let etArray = endTime.split(/[TZ]+/);
			sast.value = stArray[1];
			saet.value = etArray[1];
		} else {
			let sust = document.querySelector("#sundayBegin");
			let suet = document.querySelector("#sundayEnd");
			let stArray = startTime.split(/[TZ]+/);
			let etArray = endTime.split(/[TZ]+/);
			sust.value = stArray[1];
			suet.value = etArray[1];
		}
	}
}

function saveTimetable() {
	var token = sessionStorage.getItem('uuidToken');
	var uId = sessionStorage.getItem('userId');
	if (document.querySelector("#mondayBegin").value !== '') {
		let st = document.querySelector("#mondayBegin").value;
		let et = document.querySelector("#mondayEnd").value;
		let day = {
			endTime: et,
			startTime: st,
			userId: uId,
			weekday: 1
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=1&start_time=' + st + '&end_time=' + et + '&token=' + token, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(day)
		})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
	if (document.querySelector("#tuesdayBegin").value !== '') {
		let st = document.querySelector("#tuesdayBegin").value;
		let et = document.querySelector("#tuesdayEnd").value;
		let day = {
			endTime: et,
			startTime: st,
			userId: uId,
			weekday: 2
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=2&start_time=' + st + '&end_time=' + et + '&token=' + token, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(day)
		})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
	if (document.querySelector("#wednesdayBegin").value !== '') {
		let st = document.querySelector("#wednesdayBegin").value;
		let et = document.querySelector("#wednesdayEnd").value;
		let day = {
			endTime: et,
			startTime: st,
			userId: uId,
			weekday: 3
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=3&start_time=' + st + '&end_time=' + et + '&token=' + token, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(day)
		})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
	if (document.querySelector("#thursdayBegin").value !== '') {
		let st = document.querySelector("#thursdayBegin").value;
		let et = document.querySelector("#thursdayEnd").value;
		let day = {
			endTime: et,
			startTime: st,
			userId: uId,
			weekday: 4
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=4&start_time=' + st + '&end_time=' + et + '&token=' + token, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(day)
		})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
	if (document.querySelector("#fridayBegin").value !== '') {
		let st = document.querySelector("#fridayBegin").value;
		let et = document.querySelector("#frisdayEnd").value;
		let day = {
			endTime: et,
			startTime: st,
			userId: uId,
			weekday: 5
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=5&start_time=' + st + '&end_time=' + et + '&token=' + token, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(day)
		})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
	if (document.querySelector("#saturdayBegin").value !== '') {
		let st = document.querySelector("#saturdayBegin").value;
		let et = document.querySelector("#saturdayEnd").value;
		let day = {
			endTime: et,
			startTime: st,
			userId: uId,
			weekday: 6
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=6&start_time=' + st + '&end_time=' + et + '&token=' + token, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(day)
		})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
	if (document.querySelector("#sundayBegin").value !== '') {
		let st = document.querySelector("#sundayBegin").value;
		let et = document.querySelector("#sundayEnd").value;
		let day = {
			endTime: et,
			startTime: st,
			userId: uId,
			weekday: 7
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=7&start_time=' + st + '&end_time=' + et + '&token=' + token, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(day)
		})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
	loadWeek();
}

function clearTimeTable() {
	let mst = document.querySelector("#mondayBegin");
	let met = document.querySelector("#mondayEnd");
	let tust = document.querySelector("#tuesdayBegin");
	let tuet = document.querySelector("#tuesdayEnd");
	let west = document.querySelector("#wednesdayBegin");
	let weet = document.querySelector("#wednesdayEnd");
	let thst = document.querySelector("#thursdayBegin");
	let thet = document.querySelector("#thursdayEnd");
	let frst = document.querySelector("#fridayBegin");
	let fret = document.querySelector("#fridayEnd");
	let sast = document.querySelector("#saturdayBegin");
	let saet = document.querySelector("#saturdayEnd");
	let sust = document.querySelector("#sundayBegin");
	let suet = document.querySelector("#sundayEnd");
	mst.value = '';
	met.value = '';
	tust.value = '';
	tuet.value = '';
	west.value = '';
	weet.value = '';
	thst.value = '';
	thet.value = '';
	frst.value = '';
	fret.value = '';
	sast.value = '';
	saet.value = '';
	sust.value = '';
	suet.value = '';
}


//window.addEventListener("load", () => {

//    var registerTable = document.querySelector("#registerTable");
//	var firstNameCon = document.querySelector("#firstName");
//	var lastNameCon = document.querySelector("#lastName");
//	var straßeCon = document.querySelector("#straße");
//	var numberCon = document.querySelector("#number");
//	var plzCon = document.querySelector("#plz");
//	var ortCon = document.querySelector("#ort");
//	var emailCon = document.querySelector("#email"); 
//	var benutzeridCon = document.querySelector("#benutzerid"); 
//	var input = document.querySelector("#password");

//	registerTable.addEventListener("keyup",function() {
//		var firstName = firstNameCon.value; 
//		var lastName = lastNameCon.value; 
//		var straße = straßeCon.value; 
//		var number = numberCon.value; 
//		var plz = plzCon.value; 
//		var ort = ortCon.value; 
//		var email = emailCon.value; 
//		var benutzerid = benutzeridCon.value; 
//		var password = input.value; 
//		checkLength(firstName,lastName,straße,number,plz,ort,email,benutzerid,password);
//		//checkFirstName(firstName); 
//		//checkLastName(lastName); 
//		//checkPLZ(plz);
//		//checkEmail(email);
//		escherPLZ();
//	},false);

//	input.addEventListener("keyup",function() {
//			var password = input.value;
//			checkPassword(password);
//			},false);	
//	document.getElementById("benutzerid").addEventListener("keyup", checkUsernameAvailable);
//})

function clearPlz() {
	let plz = document.getElementById('ort');
	let number = plz.childElementCount;
	for (i = 0; i < number; i++) {
		plz.remove(i);
	}
}

function escherPLZ() {
	var plz = document.querySelector("#plz").value;
	if (plz.length == 5) {
		clearPlz();
		fetch('http://escher.informatik.hs-kl.de:8080/PlzService/ort?plz=' + plz, {
			method: 'get',
			headers: { 'Accept': 'application/json' }
		})
			.then(response => response.json())
			.then(data => {
				if (data) {
					let results = document.getElementById("ort");
					data.forEach(item => {
						let result = document.createElement("option");
						result.value = item.ort;
						result.text = item.ort;
						results.appendChild(result);
					})
				}
			})
			.catch((error) => {
				console.error('Error: ', error);
			})
	} else {
		console.log("PLZ request denied");
	}
}

function checkUsernameAvailable() {
	var uname = document.querySelector("#benutzerid").value;

	let queryPar = "username=" + uname;
	fetch('demo/user/username?' + queryPar, {
		method: 'get'
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if (data) {
				setErrorColor("benutzerid", true);
				document.getElementById("registrierungBestätigen").disabled = true;

			} else {
				setErrorColor("benutzerid", false);
				document.getElementById("registrierungBestätigen").disabled = false;
			}
		})
		.catch((error) => {
			console.error('Error: ', error);
		})
}

function checkLength(firstName, lastName, straße, number, plz, ort, email, benutzerid, password) {
	var firstNameLength = firstName.length;
	var lastNameLength = lastName.length;
	var straßeLength = straße.length;
	var numberLength = number.length;
	var plzLength = plz.length;
	var ortLength = ort.length;
	var emailLength = email.length;
	var benutzeridLength = benutzerid.length;
	var passwordLength = password.length

	var hasRegFirstName = (firstNameLength == 0);
	var hasRegLastName = (lastNameLength == 0);
	var hasRegStraße = (straßeLength == 0);
	var hasRegNumber = (numberLength == 0);
	var hasRegPLZ = (plzLength == 0);
	var hasRegOrt = (ortLength == 0);
	var hasRegEmail = (emailLength == 0);
	var hasRegBenutzerID = (benutzeridLength == 0);
	var hasRegPassword = (passwordLength == 0);

	if (hasRegFirstName) {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("firstName", true);
	} else {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("firstName", false);
	}
	if (hasRegLastName) {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("lastName", true);
	} else {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("lastName", false);
	}
	if (hasRegStraße) {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("straße", true);
	} else {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("straße", false);
	}
	if (hasRegNumber) {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("number", true);
	} else {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("number", false);
	}
	if (hasRegPLZ) {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("plz", true);
	} else {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("plz", false);
	}
	if (hasRegOrt) {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("ort", true);
	} else {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("ort", false);
	}
	if (hasRegEmail) {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("email", true);
	} else {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("email", false);
	}
	if (hasRegBenutzerID) {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("benutzerid", true);
	} else {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("benutzerid", false);
	}
	if (hasRegPassword) {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("password", true);
	} else {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("password", false);
	}
}

function setErrorColor(elementId, visible) {
	const element = document.getElementById(elementId);
	if (visible === true) {
		element.classList.add("errorColor");
	} else {
		element.classList.remove("errorColor");
	}
}

function checkFirstName(firstName) {
	var regExFirstName = /^[A-Z][a-z]*$/;
	var hasRegFirstName = regExFirstName.test(firstName);

	if (hasRegFirstName) {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("firstName", false);
	} else {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("firstName", true);
	}
}

function checkLastName(lastName) {
	var regExLastName = /^[A-Z][a-z]*$/;
	var hasRegLastName = regExLastName.test(lastName);

	if (hasRegLastName) {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("lastName", false);
	} else {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("lastName", true);
	}
}

function checkPLZ(plz) {
	var regExPLZ = /^[0-9]{5}$/;
	var hasRegPLZ = regExPLZ.test(plz);

	if (hasRegPLZ) {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("plz", false);
	} else {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("plz", true);
	}
}

function checkEmail(email) {
	var regExEmail = /^\w{4}\d{4}@stud\.(hs-kl|fh-kl)\.de$/;
	var hasRegEmail = regExEmail.test(email);

	if (hasRegEmail) {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("email", false);
	} else {
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("email", true);
	}
}

function checkPassword(password) {

	var length = password.length;
	var regExHasUpperCase = /[A-ZÄÖÜ]/;
	var regExHasLowerCase = /[a-zäöüß]/;
	var regExHasNumber = /\d/;
	var regExHasSpecialSign = /[!?§$$%&#*+-_]/;

	var hasMinLength = (length >= 5);
	var hasBetterLength = (length > 7);
	var hasUpperCase = regExHasUpperCase.test(password);
	var hasLowerCase = regExHasLowerCase.test(password);
	var hasNumber = regExHasNumber.test(password);
	var hasSpecialSign = regExHasSpecialSign.test(password);

	if (hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialSign && hasBetterLength) {
		document.querySelector("#passwdMsg").innerHTML = "sehr sicher";
	} else if (hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialSign) {
		document.querySelector("#passwdMsg").innerHTML = "sicher";
	} else if (hasMinLength && hasUpperCase && hasLowerCase) {
		document.querySelector("#passwdMsg").innerHTML = "mittel sicher";
	} else if (hasMinLength) {
		document.querySelector("#passwdMsg").innerHTML = "akzeptabel";
	} else {
		document.querySelector("#passwdMsg").innerHTML = "nicht sicher";
	}

	var size = 0;
	if (hasMinLength)
		size += 2;
	if (hasUpperCase)
		size += 2;
	if (hasLowerCase)
		size += 2;
	if (hasBetterLength)
		size += 2;
	if (hasNumber)
		size += 2;
	if (hasSpecialSign)
		size += 2;

	var c = document.querySelector("#pwdCanvas");
	var ctx = c.getContext("2d");

	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, 80, 10);

	var grd = ctx.createLinearGradient(0, 0, size * 20, 0);
	grd.addColorStop(0, "green");
	grd.addColorStop(1, "red");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 80, 10);
}

function capitalizeFirstLetter(input) {
	const value = input.value;
	const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
	input.value = capitalizedValue;
}
