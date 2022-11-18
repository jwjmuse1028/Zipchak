package data.controller;

import data.dto.ChatMessageDto;
import data.mapper.ChatMessageMapper;
import data.mapper.ChatRoomMapper;
import data.dto.ChatRoomDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Map<String,Object> createRoom(ChatRoomDto crdto){
        Map<String,Integer> map=crmapper.getRoomChk(crdto);
        int chk=Integer.parseInt(String.valueOf(map.get("count")));
        if(chk==1){
            Map<String,Object> sendmap=new HashMap<>();
            sendmap.put("cr_num",map.get("cr_num"));
            sendmap.put("msg","이미 채팅방이 있습니다");
            return sendmap;
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
            Map<String,Object> sendmap2=new HashMap<>();
            sendmap2.put("cr_num",crdto.getCr_num());
            sendmap2.put("msg","채팅방이 생성되었습니다");
            return sendmap2;
        }
    }
    @GetMapping("/getbuyer")
    public List<Map<String,Object>> getBuyer(int sp_num){
        return crmapper.getBuyer(sp_num);
    }
}
