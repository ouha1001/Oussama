window.addEventListener("load", init);

// Global Variable for Access
let accessToken = null;
let user = null;
let comments = [];

/* ==================================================== */

function init()
{
	document.getElementById("login").addEventListener("click", login);
    document.getElementById("logout").addEventListener("click", logout);
    document.getElementById("registrationForm").addEventListener("submit", addUser);
    document.getElementById("commentButton").addEventListener("click", Commentieren);

    initMap();
    initIcons();
    //getAllPoi();

    // todo
}


function checkPassword (passwd)
{
					var len = passwd.length;
					var c = document.querySelector("#pwdCanvas");
					var ctx = c.getContext ("2d");
					var grd = ctx.createLinearGradient (0, 0, len *20,0);
					grd.addColorStop(0, "green");
					grd.addColorStop(1, "red");
					ctx.fillStyle = grd;
					ctx.fillRect(0, 0, 255,20);
}

function pwdcheck() {
	var pass = document.getElementById("pwd");
	var passwd = pass.value;
	checkPassword(passwd);
  }
  
  function pwdcheck_() {
	var pass = document.getElementById("pwd");
	var passwd = pass.value;
	pwdsicherheit(passwd);
  }
  
  function pwdsicherheit(passwd) {
	let msg = document.getElementsByClassName("passwordmessage")[0];
	var taille = passwd.length;
	var hasDigitsAndSpecialChars = /[!§$&?]/;
	var hasUppercase = /[A-Z]/;
	var hasLowercase = /[a-z]/;
	var ziffer = /[0-9]/;
  
	var len7 = passwd.length > 7;
  
	var size = 0;
  
	if (taille >= 5) {
	  msg.innerHTML = "Akzeptabel";
	  size += 4;
	  if (hasUppercase.test(passwd) && hasLowercase.test(passwd)) {
		msg.innerHTML = "Mittelsicher";
		size += 4;
		if (hasDigitsAndSpecialChars.test(passwd) && ziffer.test(passwd)) {
		  msg.innerHTML = "Sicher";
		  size += 4;
		  if (len7) {
			msg.innerHTML = "Sehr sicher";
			size += 4;
		  }
		}
	  }
	}
  }
  
function emailcheck(){
			let email = document.getElementById("email").value;
				if(!email.includes("@stud.hs-kl.de") && !email.includes("@stud.fs-kl.de")){
						alert("Email not valid ");
						document.getElementById("email").value =" ";
				}
			
		}

		function login() {
			let data = {
				username: document.querySelector("#userNameLogin").value,
				password: document.querySelector("#passwordLogin").value
			};
		
			fetch('demo/access', {
				method: 'post',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(response => response.json())
				.then(data => {
					console.log("Login Token " + data);
					sessionStorage.setItem('loginToken', data.token);
					token = data.token;
					document.getElementById("loginInfo").style.display="none";
					document.getElementById("logoutInfo").style.display="block";
					//showNotesView();
					//setUserLabel();
					//getNotes();
				})
				.catch((error) => {
					console.error('Error:', error);
					sessionStorage.removeItem('loginToken');
					document.querySelector("#loginError").innerHTML = "Es ist ein Fehler aufgetreten!";
				});
		}
		
		
		function logout() {
			//let id = sessionStorage.getItem('loginToken');
			let id = token;
		
			fetch('demo/access', {
				method: 'delete',
				headers: { 'token': id }
			})
				.then(response => {
					if (response.ok) {
						sessionStorage.removeItem('loginToken');
						token = null;
						document.getElementById("loginInfo").style.display="block";
					document.getElementById("logoutInfo").style.display="none";
						//showLoginView();
					}
				})
				.catch(error => console.error('Error:', error));
		}


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

				document.querySelector("#benutzername").innerHTML = "Oussama Hamioui";
			} else {
				alert("Login failed !!");
			}
	

		}
		function addUser() {
			emailcheck();
			// Get the registration data from the form fields
			const username = document.getElementById('IDbenutzer').value;
			const password = document.getElementById('pwd').value;
			const email = document.getElementById('email').value;
			const firstName = document.getElementById('vorname').value;
			const lastName = document.getElementById('nachname').value;
			const street = document.getElementById('strasse').value;
			const streetNr = document.getElementById('nr').value;
			const zip = document.getElementById('plz').value;
			const city = document.getElementById('ort').value;
		
			// Create a JSON object with the registration data
			const registrationData = {
				userName: username,
				password: password,
				email: email,
				firstName: firstName,
				lastName: lastName,
				street: street,
				streetNr: streetNr,
				zip: zip,
				city: city
			};
		
			// Send the data to the server using a POST request
			fetch('demo/user', {
				method: 'post',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(registrationData)
			})
			.then(response => {
				if (response.ok) {
					// Registration successful, proceed with login
					login(); // Call the login function with the registered username and password
					let data = {
						username: document.querySelector("#IDbenutzer").value,
						password: document.querySelector("#pwd").value
					};

					fetch('demo/access', {
						method: 'post',
						headers: {
							'Content-type': 'application/json'
						},
						body: JSON.stringify(data)
					})
						.then(response => response.json())
						.then(data => {
							console.log("Login Token " + data);
							sessionStorage.setItem('loginToken', data.token);
							token = data.token;
							document.getElementById("logoutInfo").style.display = "block";
							document.getElementById("loginInfo").style.display = "none";

							document.querySelector("#benutzername").innerHTML = username;
							//showNotesView();
							//setUserLabel();
							//getNotes();
						})
						.catch((error) => {
							console.error('Error:', error);
							sessionStorage.removeItem('loginToken');
							document.querySelector("#loginError").innerHTML = "Es ist ein Fehler aufgetreten!";
						});
				} else {
					// Handle registration error here (if needed)
					console.error('Registration failed');
					// You can display an error message or perform any other actions
				}
				return response.json();
			})
			.then(data => {
				// Handle the server response here (if needed)
				console.log('User added:', data);
				// You can display a success message or perform any other actions
			})
			.catch(error => {
				// Handle errors here (if needed)
				console.error('Error:', error);
				// You can display an error message or perform any other actions
			});
		}
		
		
function registrationLink(){
	var registrationLink = document.getElementById('registrationLink');
var registrationFormContainer = document.getElementById('registrationFormContainer');

registrationLink.addEventListener('click', function (event) {
	event.preventDefault(); // Verhindert das Navigieren zu einer anderen Seite

	registrationFormContainer.style.display = 'block';
});
}

function capitalizeFirstLetter(input) {
	const value = input.value;
	const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
	input.value = capitalizedValue;
  }


 // Rest of the code

function Commentieren() {
    let rating = document.querySelector('input[name="rating"]:checked');
    let ratingText = document.getElementById('ratingText').value;
    let fileInput = document.getElementById('file');
    let file = fileInput.files[0]; // Get the selected file (if any)

    // Check if a rating and a comment are provided
    if (rating && ratingText.trim() !== '') {
        let newComment = {
            rating: rating.value,
            comment: ratingText,
            file: file // Add the selected file to the comment object
        };

        // Add the new comment to the array
        comments.push(newComment);

        // Clear the rating, comment, and file input fields
        rating.checked = false;
        document.getElementById('ratingText').value = '';
        fileInput.value = null;

        // Update the footer to display the comments
        updateFooter();
    } else {
        alert('Please select a rating and provide a comment.');
    }
}


function updateFooter() {
    let footer = document.querySelector('footer');
    let commentsHtml = '<h3>Meine Bewertungen:</h3>';

    // Loop through the comments array and build the HTML for the comments
    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];
        commentsHtml += '<p style="display: flex;">Rating: ' + comment.rating + ', Comment: ' + comment.comment + '</p>';
        // Check if a file is included in the comment
        if (comment.file) {
            let imgURL = URL.createObjectURL(comment.file);
            commentsHtml += '<img src="' + imgURL + '" alt="Uploaded Image" style="max-width: 200px; max-height: 200px;display: inline;marging: 10px;" /><br />';
        }
    }

    footer.innerHTML = commentsHtml;
}


function validatePlzInput() {
    const plzInput = document.getElementById('plz');
    const plzPattern = /^[0-9]{5}$/; // Regular expression to match 5 numeric digits
    
    if (!plzPattern.test(plzInput.value)) {
        // Invalid input: Show an error message and clear the input field
        document.getElementById('plzError').innerText = 'PLZ must be 5 numeric digits (e.g., 12345)';
        plzInput.value = '';
    } else {
        // Valid input: Clear the error message
        document.getElementById('plzError').innerText = '';
    }
}
function RefrechFormolar(){
	document.getElementById('registrationForm').reset();
	document.getElementById("passwordmessage").value="";
}
