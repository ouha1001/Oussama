package demo.model;

import java.io.Serializable;
import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.*;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "timetable_weekday")
@NamedQueries({
@NamedQuery(name = "Weekday.findByUser", query = "SELECT u FROM Weekday u WHERE u.userId = :userId AND u.weekday = :weekday"),
@NamedQuery(name = "Weekday.deleteEntrance", query = "DELETE FROM Weekday WHERE u.userId = :userId AND u.weekday = :weekday")})

public class Weekday implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name = "user_id", nullable = false, unique = true)
	private Integer userId; 
	
	@Column(name = "weekday", nullable = false)
	private Integer weekday;
	
	@Column(name = "start_time", nullable = false)
	private Time startTime; 
	
	@Column(name = "end_time", nullable = false)
	private Time endTime; 
	
	public String toString() {
		return "UserId = " + userId + " Weekday = " + weekday + " StartTime = " + startTime + " EndTime = " + endTime; 
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getWeekday() {
		return weekday;
	}

	public void setWeekday(Integer weekday) {
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
