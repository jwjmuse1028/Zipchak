package data.controller;

import data.dto.ChatMessageDto;
import data.mapper.ChatMessageMapper;
import data.mapper.ChatRoomMapper;
import data.dto.ChatRoomDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class ChatRoomController {
    @Autowired
    ChatRoomMapper crmapper;
    @Autowired
    ChatMessageMapper cmmapper;

    @GetMapping("/chat/list")
    public List<ChatRoomDto> getChatRoomByUr(int ur_num)
    {
        return crmapper.getChatRoomByUr(ur_num);
    }

    @GetMapping("/chat/create")
    public String createRoom(ChatRoomDto crdto){
        int chk=crmapper.getRoomChk(crdto);
        if(chk==1){
            return "이미 채팅방이 있습니다.";
        } else {
            crmapper.insertRoom(crdto);
            //상품이름으로 변경하기
            int sp_num=crdto.getSp_num();
            int ur_num=crmapper.getSeller(sp_num);
            ChatMessageDto cmdto=new ChatMessageDto();
            cmdto.setCr_num(crdto.getCr_num());
            cmdto.setSender(ur_num);
            cmdto.setMsg("안녕하세요 "+sp_num+" 상품에 대한 채팅방입니다.");
            cmmapper.insertChatMessage(cmdto);
            return "채팅방이 생성되었습니다";
        }
    }
}
