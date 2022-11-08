package data.controller;

import data.dto.ChatMessageDto;
import data.dto.ChatRoomDto;
import data.mapper.ChatMessageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class ChatMessageController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    ChatMessageMapper cmmapper;
    @MessageMapping("/chat")
    public void sendMessage(ChatMessageDto chatDto, SimpMessageHeaderAccessor accessor) {
        //System.out.println(chatDto.getSender()+chatDto.getMsg());
        int cm_num=cmmapper.insertChatMessage(chatDto);
        //System.out.println(cm_num);
        ChatMessageDto sendDto=cmmapper.getMsg(cm_num);
        chatDto.setCm_num(cm_num);
        chatDto.setCm_wdate(sendDto.getCm_wdate());
        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getCr_num(), chatDto);
    }

    @RequestMapping("/chat/cm")
    public List<ChatMessageDto> getChatMessage(int cr_num){
        return cmmapper.getChatMessage(cr_num);
    }
}
