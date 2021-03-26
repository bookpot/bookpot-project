package com.bookpot.web.tag.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bookpot.web.tag.entity.Tag;

@Repository
public class TagDao {
	
	@Autowired
	private SqlSession sqlSession;
	
	private static final String namespace = "TagMapper";

	public Tag getByName(String name) {
		return sqlSession.selectOne(namespace + ".getByName", name);
	}

	public Boolean insert(String name) {
		int count = sqlSession.insert(namespace + ".insert", name);
		if(count == 1) {
			return true;
		} else {
			return false;
		}
	}
	
	
}
