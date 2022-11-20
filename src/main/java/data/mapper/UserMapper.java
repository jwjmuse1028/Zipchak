package data.mapper;

import data.dto.ReviewDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {

    public void insertUser(UserDto dto);
    public void insertUser2(UserDto dto);
    public void insertUser3(UserDto dto);
    public int getSearchId(String ur_id);
    public int getSearchNickname(String prf_nick);
    public int getLogin(Map<String, String>map);
    public String getName(String ur_id);
    public String getProfile(String ur_id);
    public UserDto getUserdata(String ur_id);
    public Map<String,Object> getProfileByNum(int ur_num);
}
