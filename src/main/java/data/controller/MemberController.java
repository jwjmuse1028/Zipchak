package data.controller;

import data.dto.MemberDto;
import data.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/member")
public class MemberController {
    @Autowired
    MemberMapper memberMapper;

    @PostMapping("/insert")
    public void insertMember(@RequestBody MemberDto dto)
    {
        memberMapper.insertMember(dto);
    }

    @GetMapping("/list")
    public List<MemberDto> list()
    {
        return memberMapper.getAllMembers();
    }

    @DeleteMapping("/delete")
    public void deleteMember(int num)
    {
        memberMapper.deleteMember(num);
    }

}
