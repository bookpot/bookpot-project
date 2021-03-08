package com.bookpot.web.user.service;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookpot.web.security.SecurityUser;
import com.bookpot.web.user.dao.UserDao;
import com.bookpot.web.user.vo.UserVo;

@Service
public class UserService implements UserDetailsService{

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public boolean existNickname(String nickname) {
		
		return (userDao.getByNickname(nickname) != null);
	}
	
	public boolean existUserID(String userID) {
		return (userDao.getByUserID(userID)) != null;
	}
	
	@Transactional
	public boolean regUser(UserVo userVo) {
		userVo.setPassword(passwordEncoder.encode(userVo.getPassword()));
		return userDao.insert(userVo);
	}
	
	public UserVo getUser(UserVo userVo) {
		return userDao.get(userVo);
	}
	
	public boolean updateUser(UserVo userVo) {
		return userDao.update(userVo);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserVo userVo = userDao.getByUserID(username);
		
		SecurityUser securityUser = new SecurityUser();
		
		if(userVo != null) {
			securityUser.setNo(userVo.getNo());
			securityUser.setName(userVo.getUserID());
			securityUser.setUsername(userVo.getNickname());
			securityUser.setPassword(userVo.getPassword());
			securityUser.setAuthorities(Arrays.asList(new SimpleGrantedAuthority(userVo.getRole())));
			
		}
		return securityUser;
	}
}
