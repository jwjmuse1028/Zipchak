package data.mapper;

import data.dto.ReviewDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MyPageMapper {
    public double getTmp(int ur_num);
    public void updateTmp(Map<String,Object> map);
    public void insertRv(ReviewDto dto);
    public int checkRv(int ur_num);
    public List<ReviewDto> buylistforreview(int ur_num);
    public List<ReviewDto> getRvList(int ur_num);
}