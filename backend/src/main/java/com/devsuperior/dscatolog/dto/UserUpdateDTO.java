package com.devsuperior.dscatolog.dto;

import com.devsuperior.dscatolog.services.validation.UserUpdateValid;

@UserUpdateValid
public class UserUpdateDTO extends UserDTO {

	
	private static final long serialVersionUID = 1L;
	
	private String password;
	
	UserUpdateDTO(){
		super();	
	}

	public UserUpdateDTO(String password) {
		super();
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
