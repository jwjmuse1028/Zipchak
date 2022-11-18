package data.mapper;

import data.dto.ChatRoomDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatRoomMapper {
    public List<ChatRoomDto> getChatRoomByUr(int ur_num);
    public void insertRoom(ChatRoomDto crdto);
    public int getSeller(int sp_num);
    public Map<String,Integer> getRoomChk(ChatRoomDto crdto);
    public List<Map<String,Object>>  getBuyer(int sp_num);

}
