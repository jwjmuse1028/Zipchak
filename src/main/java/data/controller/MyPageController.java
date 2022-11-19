package data.controller;

import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class MyPageController {

    @Autowired
    UserMapper umapper;

    @GetMapping("/chatwithrv")
    public List<Map<String ,Object>> chatlistwithreview(int ur_num)
    {
        List<Map<String ,Object>> list= umapper.chatlistwithreview(ur_num);
        return list;
    }
}
