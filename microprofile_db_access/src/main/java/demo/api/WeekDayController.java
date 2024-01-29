package demo.api;



import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import demo.api.access.AccessManager;
import demo.api.dto.WeekdayDto;
import demo.dao.WeekdayDAO;
import demo.model.Weekday;

@Path("/weekday")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class WeekDayController {
	
	@Inject
	private WeekdayDAO weekdayDao; 
	
	@Inject
	private AccessManager am; 
	
	@GET
	public List<WeekdayDto> getWeek(@QueryParam("userId") int userId, @QueryParam("token") UUID uuid) {
		if(am.hasAccess(uuid) == false) {
			throw new RuntimeException("ERROR: Access not granted");
		}
        List<Weekday> wd = weekdayDao.getWeek(userId); 
		return wd.stream().map( WeekdayDto::new ).collect(Collectors.toList() );
	}
	
	@GET
	@Path("/single")
	public WeekdayDto getDay(@QueryParam("userId") int userId, @QueryParam("weekday") int weekday, @QueryParam("token")UUID uuid) {
		if(am.hasAccess(uuid) == false) {
			throw new RuntimeException("ERROR: Access not granted"); 
		}
		Optional<Weekday> wd = weekdayDao.getSingleWeekday(userId,weekday);
		if(wd.isPresent()) {
			WeekdayDto wdDto = new WeekdayDto(wd.get());
			return wdDto; 
		} else {
			throw new RuntimeException("ERROR: no results found");
		}
	}
	
	@POST
	@Transactional
	//kein Dto mitschicken sondern nur die einzelnen Parameter? Aktuell funktioniert Post aber Daten werden nicht übertragen
	public void safeWeekday(@QueryParam("userId")int userId, @QueryParam("weekday") int weekday, @QueryParam("token") UUID uuid,@QueryParam("start_time") String startTime,@QueryParam("end_time") String endTime) throws ParseException {
		if(am.hasAccess(uuid) == false) {
			throw new RuntimeException("ERROR: Access not granted");
		}
	    SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm"); 
	    Time resultSt = new Time(timeFormat.parse(startTime).getTime());
	    Time resultEt = new Time(timeFormat.parse(endTime).getTime());
		Weekday wd = new Weekday(); 
		wd.setUserId(userId);
		wd.setWeekday(weekday);
		wd.setStartTime(resultSt);
		wd.setEndTime(resultEt);
		WeekdayDto wdDto = new WeekdayDto(wd);
		weekdayDao.safeTimetable(wdDto);
		
	}
	
}
