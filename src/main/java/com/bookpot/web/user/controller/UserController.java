package com.bookpot.web.user.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bookpot.web.user.service.UserService;
import com.bookpot.web.user.valid.UserValidator;
import com.bookpot.web.user.vo.UserRegVo;
import com.bookpot.web.user.vo.UserVo;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/user/")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("signup")
	public String signUp(@ModelAttribute UserRegVo userRegVo) {
		
		return "user/signup";
	}
	
	@PostMapping("signup")
	public String signUp(@ModelAttribute @Valid UserRegVo userRegVo, BindingResult result, Model model) {
		System.out.println("signup 실행");
		
		//유효성 검사
		new UserValidator().validate(userRegVo, result);
		
		if(result.hasErrors()) {
			List<ObjectError> errors = result.getAllErrors();
			for(ObjectError error : errors) {
				System.out.println("에러발생 : " + error);
			}
			return "user/signup";
		}
		// userRegVo -> userVo
		UserVo userVo = new UserVo();
		userVo.setNickname(userRegVo.getNickname());
		userVo.setPassword(userRegVo.getPassword());
		userVo.setUserID(userRegVo.getUserID());
		
		userService.regUser(userVo);
		System.out.println("signup 종료");
		return "redirect:/";
	}
	
	@ResponseBody
	@PostMapping("checkNickname")
	public String checkNickname(String nickname) {
		System.out.println("닉네임 중복확인 시작");
		
		// 존재하면 fail
		// 생성가능하면 success
		if(userService.existNickname(nickname)) {
			System.out.println("닉네임 중복");
			return "exist";
		} else {
			System.out.println("닉네임 생성가능");
			return "possible";
		}
	}
	
	@ResponseBody
	@PostMapping("checkUserID")
	public String checkUserID(String userID) {
		System.out.println("아이디 중복체크");
		if(userService.existUserID(userID)) {
			return "exist";
		} else {
			return "possible";
		}
	}
}
