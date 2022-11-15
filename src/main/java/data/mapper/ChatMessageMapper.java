package data.mapper;

import data.dto.ChatMessageDto;
import data.dto.ShopInfoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatMessageMapper {
    public List<ChatMessageDto> getChatMessage(int cr_num);
    public int insertChatMessage(ChatMessageDto dto);
    public ChatMessageDto getMsg(int cm_num);
    public int getSender(int cr_num);
    public void updateRead(Map<String,Integer> map);
    public ShopInfoDto getSpInfo(int cr_num);
    public int getMsgNoti(int ur_num);
    }
