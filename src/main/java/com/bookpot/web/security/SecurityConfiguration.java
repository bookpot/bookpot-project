package com.bookpot.web.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.bookpot.web.user.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private UserService userService;
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		// 리소스 인증 무시
		web.ignoring().antMatchers("/resources/**");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//테스트 위한 임시로 csrf 설정 막기
		http.csrf().disable();
		
		
		// /login 은 누구나 접근 가능
		// /user/** 은 user의 role을 가질 경우만 접근 가능
		// /admin/** 은 admin의 role을 가질 경우만 접근 가능
		// 위의 두 role이 없으면 formLogin		
		http.authorizeRequests()
			.antMatchers("/**","/").permitAll()
			.antMatchers("/user/**").access("hasRole('ROLE_USER')")
			.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
			.anyRequest().authenticated()
			
		//	로그인 설정
			.and()
			.formLogin()
			.loginProcessingUrl("/user/login")
		//	로그인 성공페이지 구현
		//	.successHandler(AuthenticationSuccessHandler())
			
		//	로그아웃 설정	
			.and()
			.logout()
			.logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
			.logoutSuccessUrl("/")
			.deleteCookies("JSEESIONID")
			.invalidateHttpSession(true)
			
			.and()
			.exceptionHandling()
			.accessDeniedPage("/WEB-INF/views/error/403.jsp");
	}

	// 비밀번호 암호화 (로그인 시 인코딩 된 비밀번호를 비교)
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService);
	}
}
