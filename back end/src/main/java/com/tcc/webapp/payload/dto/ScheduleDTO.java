package com.tcc.webapp.payload.dto;

import java.time.LocalDateTime;

// Actually is Appointment
public class ScheduleDTO {

	private String scheduleDate;
	private String scheduleNotes;
	private Integer status;

	public ScheduleDTO(String scheduleDate, String scheduleNotes, Integer status) {
		this.scheduleDate = scheduleDate;
		this.scheduleNotes = scheduleNotes;
		this.status = status;		
	}

	public ScheduleDTO(String scheduleDate, String scheduleNotes) {
		this.scheduleDate = scheduleDate;
		this.scheduleNotes = scheduleNotes;
		this.status = 0;
	}

	private ScheduleDTO() {}

	public String getScheduleDate() {
		return this.scheduleDate;
	}

	public void setScheduleDate(String scheduleDate) {
		this.scheduleDate = scheduleDate;
	}

	public String getScheduleNotes() {
		return this.scheduleNotes;
	}

	public void setScheduleNotes(String scheduleNotes) {
		this.scheduleNotes = scheduleNotes;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}


}
