package com.bookpot.web.user.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bookpot.web.user.vo.UserVo;

@Repository
public class UserDao {

	@Autowired
	private SqlSession sqlSession;
	
	private static final String namespace = "com.bookpot.mapper.userMapper";
	
	public UserVo getByNickname(String nickname) {
		return sqlSession.selectOne(namespace + ".getByNickname", nickname);
	}
	
	public UserVo getByUserID(String userID) {
		return sqlSession.selectOne(namespace + ".getByUserID", userID);
	}
	
	public UserVo get(UserVo userVo) {
		return sqlSession.selectOne(namespace + ".getByUserIDAndPassword", userVo);
	}
	
	public Boolean insert(UserVo userVo) {
		int count = sqlSession.insert(namespace + ".insert", userVo);
		if(count == 1) {
			return true;
		} else {
			return false;
		}
	}
	
	public Boolean update(UserVo userVo) {
		int count = sqlSession.update(namespace + ".update", userVo);
		if(count == 1) {
			return true;
		} else {
			return false;
		}
	}
}
