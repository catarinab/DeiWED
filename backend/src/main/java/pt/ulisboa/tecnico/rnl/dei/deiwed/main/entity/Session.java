package pt.ulisboa.tecnico.rnl.dei.deiwed.main.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import pt.ulisboa.tecnico.rnl.dei.deiwed.main.dto.SessionDto;

@Entity
@Table(name = "sessions")
public class Session {

	@Id
	@GeneratedValue
	private Long id;

	@Column(name = "date", nullable = false)
	private LocalDate date;

	@Column(name = "speaker", nullable = false)
	private String speaker;

	@Column(name = "theme", nullable = false)
	private String theme;

	protected Session() {
	}

	public Session(LocalDate date, String speaker, String theme) {
		this.date = date;
		this.speaker = speaker;
		this.theme = theme;
	}

	public Session(SessionDto sessionDto) {
		this(sessionDto.getDate(), sessionDto.getSpeaker(), sessionDto.getTheme());
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return this.date;
	}

	public void setDate(LocalDate date) {
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
		return String.format(
				"Session[id=%d, date='%s', speaker='%s', theme='%s']",
				id, date, speaker, theme);
	}
}
