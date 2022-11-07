package data.mapper;

import data.dto.ChatMessageDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChatMessageMapper {
    public List<ChatMessageDto> getChatMessage(int cr_num);
}
