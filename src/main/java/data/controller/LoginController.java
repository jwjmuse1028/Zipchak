package data.controller;

import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {
    @Autowired
    UserMapper userMapper;

    @PostMapping("/check")
    public Map<String, Object> getLogin(@RequestBody Map<String, String> map)
    {
        int check = userMapper.getLogin(map);
        String prf_nick="";
        String prf_img="";
        if (check==1)
        {
            prf_nick=userMapper.getName(map.get("ur_id"));
            prf_img=userMapper.getProfile(map.get("ur_id"));
//            System.out.println("prf_nick="+prf_nick);
//            System.out.println("prf_img="+prf_img);
        }
        Map<String, Object>sendmap=new HashMap<>();
        sendmap.put("check", check);
        sendmap.put("prf_nick", prf_nick);
        sendmap.put("prf_img", prf_img);
        return sendmap;
    }

    @GetMapping("/getname")
    public String getName(String ur_id)
    {
        return userMapper.getName(ur_id);
    }
    @GetMapping("/getProfile")
    public String getProfile(String ur_id)
    {
        return userMapper.getProfile(ur_id);
    }
}
