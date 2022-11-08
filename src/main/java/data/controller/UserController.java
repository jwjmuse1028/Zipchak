package data.controller;

import data.dto.UserDto;
import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserMapper userMapper;

    @GetMapping("/idcheck") //회원가입때 아이디 중복 확인
    public int getSearchId(String ur_id)
    {
        return userMapper.getSearchId(ur_id);
    }

    @GetMapping("/nickcheck") //회원가입때 아이디 중복 확인
    public int getSearchNickname(String prf_nick)
    {
        return userMapper.getSearchNickname(prf_nick);
    }

    @PostMapping("/insert") //회원가입
    public void insertUser(@RequestBody UserDto dto)
    {
        userMapper.insertUser(dto);
        userMapper.insertUser2(dto);
        userMapper.insertUser3(dto);
    }
}
