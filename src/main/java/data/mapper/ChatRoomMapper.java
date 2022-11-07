package data.mapper;

import data.dto.ChatRoomDto;
import data.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChatRoomMapper {
    public List<ChatRoomDto> getChatRoomByUr(int ur_num);
}
