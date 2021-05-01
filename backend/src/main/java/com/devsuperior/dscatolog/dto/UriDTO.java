package com.devsuperior.dscatolog.dto;

import java.io.Serializable;

public class UriDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String uri;
	
	public UriDTO() {
		
	}
	
	public UriDTO(String uri) {
		this.uri = uri;
	}

	public String getFile() {
		return uri;
	}

	public void setFile(String uri) {
		this.uri = uri;
	}
	
}
