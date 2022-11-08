package data.controller;

import data.dto.ChatRoomDto;
import data.mapper.ChatRoomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/chat")
public class ChatRoomController {
    @Autowired
    ChatRoomMapper crmapper;

    @GetMapping("/list")
    public List<ChatRoomDto> getChatRoomByUr(int ur_num)
    {
        return crmapper.getChatRoomByUr(ur_num);
    }
}
