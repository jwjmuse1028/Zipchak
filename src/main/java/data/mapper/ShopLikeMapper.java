package data.mapper;

import data.dto.ShopDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface ShopLikeMapper {
    public int getTotalLikes(int sp_num);
    public void insertLike(Map<String, Object> map);
    public void deleteLike(Map<String, Object> map);
    public int getUserLike(Map<String, Object> map);
}
