window.addEventListener("load", () => {
	document.getElementById("safeTimeschedule").addEventListener("click", saveTimetable);
	document.getElementById("timescheduleLink").addEventListener("click", loadWeek);
	document.getElementById("logOut").addEventListener("click", clearTimeTable); 
	document.getElementById("mitfahrgelegenheitLink").addEventListener("click", clearTimeTable); 
	
})

function loadWeek() {
	var token = sessionStorage.getItem('uuidToken');
	var uid = sessionStorage.getItem('userId');
	fetch('demo/weekday/?userId=' + uid + '&token=' + token, {
		method: 'get'
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
		showTimeTable(data); 
	})
	.catch((error) => {
		console.error('ERROR: ', error)
		sessionStorage.removeItem('uuidToken'); 
	}) 	
} 

function showTimeTable(data) {	
	for(i = 0; i < data.length; i++) {
		var startTime = data[i].startTime; 
		var endTime = data[i].endTime; 
		var weekday = data[i].weekday;	
		if(weekday == 1) {
			let mst = document.querySelector("#mondayBegin");
            let met = document.querySelector("#mondayEnd"); 
            let stArray = startTime.split(/[TZ]+/); 
		    let etArray = endTime.split(/[TZ]+/); 
		    mst.value = stArray[1]; 
		    met.value = etArray[1]; 
		} else if(weekday == 2) {
			let tust = document.querySelector("#tuesdayBegin");
            let tuet = document.querySelector("#tuesdayEnd"); 
            let stArray = startTime.split(/[TZ]+/); 
		    let etArray = endTime.split(/[TZ]+/); 
		    console.log(stArray[1]);
		    tust.value = stArray[1].value; 
		    tuet.value = etArray[1].value; 
		} else if(weekday == 3) {
			let west = document.querySelector("#wednesdayBegin");
            let weet = document.querySelector("#wednesdayEnd"); 
            let stArray = startTime.split(/[TZ]+/); 
		    let etArray = endTime.split(/[TZ]+/); 
		    west.value = stArray[1]; 
		    weet.value = etArray[1]; 
		} else if(weekday == 4) {
			let thst = document.querySelector("#thursdayBegin");
            let thet = document.querySelector("#thursdayEnd"); 
            let stArray = startTime.split(/[TZ]+/); 
		    let etArray = endTime.split(/[TZ]+/); 
		    thst.value = stArray[1]; 
		    thet.value = etArray[1]; 
		} else if(weekday == 5) {
			let frst = document.querySelector("#fridayBegin");
            let fret = document.querySelector("#fridayEnd");
            let stArray = startTime.split(/[TZ]+/); 
		    let etArray = endTime.split(/[TZ]+/); 
		    frst.value = stArray[1]; 
		    fret.value = etArray[1]; 
		} else if(weekday == 6) {
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
	if(document.querySelector("#mondayBegin").value !== '') {
		let st = document.querySelector("#mondayBegin").value;
		let et = document.querySelector("#mondayEnd").value;
		let day = {
			endTime: et,
			startTime: st, 
			userId: uId,
			weekday: 1
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=1&start_time=' + st +'&end_time=' + et + '&token=' + token, {
			method: 'post',
		headers: {
			'Content-type': 'application/json' },
			body: JSON.stringify(day)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	} 
	if(document.querySelector("#tuesdayBegin").value !== '') {
		let st = document.querySelector("#tuesdayBegin").value;
		let et = document.querySelector("#tuesdayEnd").value;
		let day = {
			endTime: et,
			startTime: st, 
			userId: uId,
			weekday: 2
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=2&start_time=' + st +'&end_time=' + et + '&token=' + token, {
			method: 'post',
		headers: {
			'Content-type': 'application/json' },
			body: JSON.stringify(day)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	if(document.querySelector("#wednesdayBegin").value !== '') {
		let st = document.querySelector("#wednesdayBegin").value;
		let et = document.querySelector("#wednesdayEnd").value;
		let day = {
			endTime: et,
			startTime: st, 
			userId: uId,
			weekday: 3
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=3&start_time=' + st +'&end_time=' + et + '&token=' + token, {
			method: 'post',
		headers: {
			'Content-type': 'application/json' },
			body: JSON.stringify(day)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	if(document.querySelector("#thursdayBegin").value !== '') {
		let st = document.querySelector("#thursdayBegin").value;
		let et = document.querySelector("#thursdayEnd").value;
		let day = {
			endTime: et,
			startTime: st, 
			userId: uId,
			weekday: 4
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=4&start_time=' + st +'&end_time=' + et + '&token=' + token, {
			method: 'post',
		headers: {
			'Content-type': 'application/json' },
			body: JSON.stringify(day)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	if(document.querySelector("#fridayBegin").value !== '') {
		let st = document.querySelector("#fridayBegin").value;
		let et = document.querySelector("#frisdayEnd").value;
		let day = {
			endTime: et,
			startTime: st, 
			userId: uId,
			weekday: 5
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=5&start_time=' + st +'&end_time=' + et + '&token=' + token, {
			method: 'post',
		headers: {
			'Content-type': 'application/json' },
			body: JSON.stringify(day)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	if(document.querySelector("#saturdayBegin").value !== '') {
		let st = document.querySelector("#saturdayBegin").value;
		let et = document.querySelector("#saturdayEnd").value;
		let day = {
			endTime: et,
			startTime: st, 
			userId: uId,
			weekday: 6
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=6&start_time=' + st +'&end_time=' + et + '&token=' + token, {
			method: 'post',
		headers: {
			'Content-type': 'application/json' },
			body: JSON.stringify(day)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	if(document.querySelector("#sundayBegin").value !== '') {
		let st = document.querySelector("#sundayBegin").value;
		let et = document.querySelector("#sundayEnd").value;
		let day = {
			endTime: et,
			startTime: st, 
			userId: uId,
			weekday: 7
		}
		fetch('demo/weekday/?userId=' + uId + '&weekday=7&start_time=' + st +'&end_time=' + et + '&token=' + token, {
			method: 'post',
		headers: {
			'Content-type': 'application/json' },
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