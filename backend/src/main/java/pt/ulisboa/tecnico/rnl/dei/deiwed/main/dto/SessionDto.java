package pt.ulisboa.tecnico.rnl.dei.deiwed.main.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import pt.ulisboa.tecnico.rnl.dei.deiwed.main.entity.Session;


// Data Transfer Object, to communicate with frontend
public class SessionDto implements Serializable {

	private long id;
	private String date;
	private String speaker;
	private String theme;

	public SessionDto() {
	}

	public SessionDto(long id, String date, String speaker, String theme) {
		this.id = id;
		this.date = date;
		this.speaker = speaker;
		this.theme = theme;
	}

	public SessionDto(Session session) {
		this(session.getId(), 
		session.getDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")), 
		session.getTheme(), session.getTheme());
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return LocalDate.parse(date, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getSpeaker() {
		return this.speaker;
	}

	public void setSpeaker(String speaker) {
		this.speaker = speaker;
	}

	public String getTheme() {
		return this.theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}


	@Override
	public String toString() {
		return String.format("SessionDto[id=%d, date='%s', speaker='%s', theme='%s']"
		, id, date, speaker, theme);
	}
}
