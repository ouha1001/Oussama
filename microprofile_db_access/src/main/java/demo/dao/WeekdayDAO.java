package demo.dao;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import demo.api.dto.WeekdayDto;
import demo.model.Weekday;

@Singleton
public class WeekdayDAO {

	@PersistenceContext(name ="jpa-unit")
	EntityManager em;
	
	public void safeTimetable(WeekdayDto weekdayDto) {
		try {
			Query query = em.createNamedQuery("Weekday.deleteEntrance", Weekday.class);
			query.setParameter("userId", weekdayDto.getUserId());
			query.setParameter("weekday", weekdayDto.getWeekday());
			query.executeUpdate(); 
			Weekday weekday = new Weekday(); 
			weekday.setEndTime(weekdayDto.getEndTime());
			weekday.setStartTime(weekdayDto.getStartTime());
			weekday.setUserId(weekdayDto.getUserId());
			weekday.setWeekday(weekdayDto.getWeekday());
			System.out.println("test");
			em.persist(weekday);
			em.flush();
			em.refresh(weekday);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public Optional<Weekday> getSingleWeekday(int userId, int weekday) {	
			Query query = em.createNamedQuery("Weekday.findByUser", Weekday.class); 
			query.setParameter("userId", userId);
			query.setParameter("weekday", weekday); 
			Weekday wd = (Weekday) query.getSingleResult(); 
			if(wd != null) {
				return Optional.of(wd); 
			} else {
				return Optional.empty();
			}
	}
	
	@SuppressWarnings("unchecked")
	public List<Weekday> getWeek(int userId) {
		try {
			final String qer = "SELECT * FROM timetable_weekday WHERE user_id = ?";
			Query query = em.createNativeQuery(qer); 
			query.setParameter(1, userId); 
			
			List<Object[]> results = (List<Object[]>) query.getResultList();
			List<Weekday> res = new ArrayList<>(); 
			
			for(Object[] row : results) {
				Weekday wd  = new Weekday(); 
				wd.setEndTime((Time) row[3]);
				wd.setStartTime((Time) row[2]); 
				wd.setUserId((Integer) row[0]);
				wd.setWeekday((Integer) row[1]);
				res.add(wd);
			}
			return res;
		} catch(Exception ex) {
			ex.printStackTrace();
			return List.of();
		}
	}
}
