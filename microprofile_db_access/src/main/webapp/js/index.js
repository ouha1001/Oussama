//window.addEventListener("load", initialisation );

//let myMap;
var homeMarker;
var selectedMarker; 
var selectedText;
var markerStorage = new Map(); 
function initialisation(){
	document.getElementById("cancelButton").addEventListener("click", hideRegistrierung);
    document.getElementById("registrierungsLink").addEventListener("click", showRegistrierung); 
    document.getElementById("timescheduleLink").addEventListener("click", showTimeSchedule);
    document.getElementById("mitfahrgelegenheitLink").addEventListener("click", showMitfahrgelegenheit);
    document.getElementById("loginButton").addEventListener("click", login); 
    document.getElementById("logOut").addEventListener("click", logout);
    document.getElementById("registrierungBestätigen").addEventListener("click", saveImage);
    document.getElementById("searchRide").addEventListener("click", search); 
    
    let token = sessionStorage.getItem('uuidToken');
    if(token == null) {
	hideLoggedInMenu();
    hideSearch();
    hideRegistrierung();
    hideTimeSchedule(); 
}
	//initmap();
	//reload();
}
/*function initmap() {
    myMap = L.map('mapid').setView([49.250723, 7.377122], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, <a href="https://www.flaticon.com/free-icons/address" title="address icons">Address icons created by DinosoftLabs - Flaticon</a>',
        maxZoom: 21, // max. possible 23
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        crossOrigin: true,  
        integrity: 'sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM='
    }).addTo(myMap);
    
}

let redIcon = new L.Icon({
		iconUrl: './icon/marker-icon-red.png',
		shadowUrl: './icon/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

let	blueIcon = new L.Icon({
		iconUrl: './icon/marker-icon-blue.png',
		shadowUrl: './icon/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41] 
	});
		
let	homeIcon = new L.Icon({
		iconUrl: './icon/marker-icon-home.png', 
		shadowUrl: './icon/marker-shadow.png',
		iconSize: [25, 41], 
		iconAnchor: [12, 41],
		popupAnchor: [1, -34], 
		shadowSize: [41, 41]
	}); 
*/
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
	document.getElementById("cancelButton").disabled = true;
	document.getElementById("registrierungsLink").disabled = false; 
	setVisibility("registration",false);
}

function showRegistrierung() {
	document.getElementById("cancelButton").disabled = false; 
	document.getElementById("registrierungsLink").disabled = true;
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

function setVisibility(elementId, visible) {
    const element = document.getElementById(elementId);
    if(visible === true) {
        element.classList.remove("hidden");
    } else {
        element.classList.add("hidden")
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
		getUserName(); 
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
