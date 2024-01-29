window.addEventListener("load", () => {
	
    var registerTable = document.querySelector("#registerTable");
	var firstNameCon = document.querySelector("#firstName");
	var lastNameCon = document.querySelector("#lastName");
	var straßeCon = document.querySelector("#straße");
	var numberCon = document.querySelector("#number");
	var plzCon = document.querySelector("#plz");
	var ortCon = document.querySelector("#ort");
	var emailCon = document.querySelector("#email"); 
	var benutzeridCon = document.querySelector("#benutzerid"); 
	var input = document.querySelector("#password");
	
	registerTable.addEventListener("keyup",function() {
		var firstName = firstNameCon.value; 
		var lastName = lastNameCon.value; 
		var straße = straßeCon.value; 
		var number = numberCon.value; 
		var plz = plzCon.value; 
		var ort = ortCon.value; 
		var email = emailCon.value; 
		var benutzerid = benutzeridCon.value; 
		var password = input.value; 
		checkLength(firstName,lastName,straße,number,plz,ort,email,benutzerid,password);
		checkFirstName(firstName); 
		checkLastName(lastName); 
		checkPLZ(plz);
		checkEmail(email);
		escherPLZ();
	},false);
	
	input.addEventListener("keyup",function() {
			var password = input.value;
			checkPassword(password);
			},false);	
	document.getElementById("benutzerid").addEventListener("keyup", checkUsernameAvailable);
})

function clearPlz() {
	let plz = document.getElementById('ort'); 
	let number = plz.childElementCount;
	for(i = 0; i < number; i ++){
		plz.remove(i);
	}
}

function escherPLZ(){
	var plz = document.querySelector("#plz").value; 
	if(plz.length == 5){
		clearPlz();
		fetch('http://escher.informatik.hs-kl.de:8080/PlzService/ort?plz=' + plz, {
			method: 'get',
			headers: {'Accept': 'application/json'}
		})
		.then(response => response.json())
		.then(data => {
			if(data) {
				let results = document.getElementById("ort");
				data.forEach(item => {
					let result = document.createElement("option");
					result.value = item.ort; 
					result.text = item.ort;
					results.appendChild(result);
				})			
			}
		})
		.catch((error) =>{
		console.error('Error: ', error);
		})
	} else{
		console.log("PLZ request denied");
	}
}

function checkUsernameAvailable() {
	var uname = document.querySelector("#benutzerid").value;
	
	let queryPar = "username=" + uname; 
	fetch('demo/user/username?' + queryPar,{
		method: 'get'
	})
	.then(response => response.json())
	.then(data => {
		console.log(data); 
		if(data) {
			setErrorColor("benutzerid", true);
			document.getElementById("registrierungBestätigen").disabled = true;
			
		} else {
			setErrorColor("benutzerid", false); 
			document.getElementById("registrierungBestätigen").disabled = false;
		}
	})
	.catch((error) =>{
		console.error('Error: ', error);
	})
}

function checkLength(firstName,lastName,straße,number,plz,ort,email,benutzerid,password) {
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
	
	if(hasRegFirstName){
		 document.getElementById("registrierungBestätigen").disabled = true;
	     setErrorColor("firstName",true);
	} else {
	   document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("firstName",false);
	}
	if(hasRegLastName){
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("lastName",true);
	} else{
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("lastName",false);
	}
	if(hasRegStraße){
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("straße",true);
	} else{
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("straße",false);
	}
	if(hasRegNumber){
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("number",true);
	} else{
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("number",false);
	}
	if(hasRegPLZ){
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("plz",true);
	} else{
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("plz",false);
	}
	if(hasRegOrt){
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("ort",true);
	} else{
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("ort",false);
	}
	if(hasRegEmail){
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("email",true);
	} else{
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("email",false);
	}
	if(hasRegBenutzerID){
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("benutzerid",true);
	} else{
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("benutzerid",false);
	}
	if(hasRegPassword){
		document.getElementById("registrierungBestätigen").disabled = true;
		setErrorColor("password",true);
	} else{
		document.getElementById("registrierungBestätigen").disabled = false; 
	    setErrorColor("password",false); 
	}
}

function setErrorColor(elementId, visible) {
	const element = document.getElementById(elementId);
    if(visible === true) {
        element.classList.add("errorColor");
    } else {
        element.classList.remove("errorColor");
    }
}

function checkFirstName(firstName) {
	var regExFirstName = /^[A-Z][a-z]*$/;
	var hasRegFirstName = regExFirstName.test(firstName);
	
	if(hasRegFirstName){
		document.getElementById("registrierungBestätigen").disabled = false; 
		setErrorColor("firstName",false); 
	} else{
		document.getElementById("registrierungBestätigen").disabled = true; 
		setErrorColor("firstName",true);
	}
}

function checkLastName(lastName) {
	var regExLastName = /^[A-Z][a-z]*$/;
	var hasRegLastName = regExLastName.test(lastName); 
	
	if(hasRegLastName) { 
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("lastName",false); 
	} else {
		document.getElementById("registrierungBestätigen").disabled = true; 
		setErrorColor("lastName",true); 
	}	
}

function checkPLZ(plz) { 
	var regExPLZ = /^[0-9]{5}$/;
	var hasRegPLZ = regExPLZ.test(plz);
	
	if(hasRegPLZ) {
		document.getElementById("registrierungBestätigen").disabled = false;
		setErrorColor("plz",false);
	} else {
		document.getElementById("registrierungBestätigen").disabled = true; 
		setErrorColor("plz",true);
	}
}

function checkEmail(email) {
	var regExEmail = /^\w{4}\d{4}@stud\.(hs-kl|fh-kl)\.de$/;
	var hasRegEmail = regExEmail.test(email);
	
	if(hasRegEmail) {
		document.getElementById("registrierungBestätigen").disabled = false; 
		setErrorColor("email",false);
	} else {
		document.getElementById("registrierungBestätigen").disabled = true; 
		setErrorColor("email",true); 
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