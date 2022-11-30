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
            crmapper.crstatusTrue(map.get("cr_num"));
            Map<String,Object> sendmap=new HashMap<>();
            sendmap.put("cr_num",map.get("cr_num"));
            sendmap.put("msg","이미 채팅방이 있습니다");
            return sendmap;
        } else {
            crmapper.insertRoom(crdto);
            int sp_num=crdto.getSp_num();
            String sp_title=crmapper.getSptitle(sp_num);
            int ur_num=crmapper.getSeller(sp_num);
            ChatMessageDto cmdto=new ChatMessageDto();
            cmdto.setCr_num(crdto.getCr_num());
            cmdto.setSender(ur_num);
            cmdto.setMsg("안녕하세요 "+sp_title+" 상품에 대한 채팅방입니다.");
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
    @GetMapping("/getunum")
    public int getUnum(int cr_num,int ur_num)
    {
        Map<String,Integer> map=crmapper.getUnum(cr_num);
        //System.out.println(map.get("ur_num"));
       //System.out.println(map.get("buyer_num"));
        if (ur_num==map.get("ur_num")) {return map.get("buyer_num");}
        else{return map.get("ur_num"); }
    }
    @GetMapping("/crstatusfalse")
    public void crstatusFalse(int cr_num ){
        crmapper.crstatusFalse(cr_num);
    }
}
