package data.mapper;

import data.dto.ChatMessageDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatMessageMapper {
    public List<ChatMessageDto> getChatMessage(Map<String,Integer> map);
    public int insertChatMessage(ChatMessageDto dto);
    public int getSender(int cr_num);
    public void updateRead(Map<String,Integer> map);
    public Map<String,String> getSpInfo(int cr_num);
    public int getCntMsg(int cr_num);
    }
