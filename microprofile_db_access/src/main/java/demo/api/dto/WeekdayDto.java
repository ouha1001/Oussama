package demo.api.dto;

import java.io.Serializable;
import java.sql.Time;

import demo.model.Weekday;

@SuppressWarnings("serial")
public class WeekdayDto implements Serializable{
	
	private int userId; 
	private int weekday;
	private Time startTime;
	private Time endTime; 
	
	public WeekdayDto() {
		
	}
	
	public WeekdayDto(Weekday weekday) {
		this.userId = weekday.getUserId();
		this.weekday = weekday.getWeekday();
		this.endTime = weekday.getEndTime();
		this.startTime = weekday.getStartTime(); 
	}
	
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getWeekday() {
		return weekday;
	}

	public void setWeekday(int weekday) {
		this.weekday = weekday;
	}

	public Time getStartTime() {
		return startTime;
	}

	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}

	public Time getEndTime() {
		return endTime;
	}

	public void setEndTime(Time endTime) {
		this.endTime = endTime;
	}


	
	

}
