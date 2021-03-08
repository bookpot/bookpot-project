package com.bookpot.web.user.vo;

import java.sql.Date;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotNull;

public class UserVo {
	
	private Long no;
	private String nickname;
	private String userID;
	private String password;
	private String role;
	private Date regDate;
	
	public UserVo() {
		// TODO Auto-generated constructor stub
	}

	public UserVo(@NotEmpty String userID, @NotNull @Length(min = 4) String password) {
		super();
		this.userID = userID;
		this.password = password;
	}

	public Long getNo() {
		return no;
	}

	public void setNo(Long no) {
		this.no = no;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public UserVo(Long no, @NotEmpty @Length(min = 2, max = 8) String nickname, @NotEmpty String userID,
			@NotNull @Length(min = 4) String password, String role, Date regDate) {
		super();
		this.no = no;
		this.nickname = nickname;
		this.userID = userID;
		this.password = password;
		this.role = role;
		this.regDate = regDate;
	}
	
}
