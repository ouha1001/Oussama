window.addEventListener("load", () => {
	document.getElementById("safeTimeschedule").addEventListener("click", saveTimetable);
	document.getElementById("timescheduleLink").addEventListener("click", loadWeek);
	document.getElementById("logOut").addEventListener("click", clearTimeTable); 
	document.getElementById("mitfahrgelegenheitLink").addEventListener("click", clearTimeTable); 
	
})

