package data.mapper;

import data.dto.*;
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
    public List<Map<String,Object>> getSellList(int ur_num);
    public List<Map<String,Object>> getFeedList(int ur_num);
    public List<Map<String,Object>> getBookmarkList(int ur_num);
    public List<Map<String,Object>> getLikeList(int ur_num);
    public void updateprf(Map<String,Object> map);
    public UserDto getpersonaldata(int ur_num);
    public void updateinfo(UserDto dto);
    public List<Integer> sellerking();
    public List<Integer> buyerking();
    public List<Integer> tempking();
    public List<Integer> bookmarkking();
    public List<Integer> likeking();
    public List<FeedListDto> getSearchFeeds(String search_word);
    public List<ShopProductDto> getSearchShops(String search_word);
}
