package com.tcc.webapp.payload.response;

public class IntegerJson {
	private Integer value;

	public IntegerJson(Integer value) {
		this.value = value;
	}

	public Integer getValue() {
		return this.value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}	
}
