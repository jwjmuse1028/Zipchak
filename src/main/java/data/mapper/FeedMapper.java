package data.mapper;

import data.dto.FeedDto;
import data.dto.FeedListDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface FeedMapper {
    public void insertFeed(FeedDto dto);
    public List<FeedListDto> getAllFeeds(Map<String,String> map);
    public FeedDto getFeedByNum(int fd_num);
    public void deleteFeed(int fd_num);
    public void updateFeed(FeedDto dto);
    public int getFeedLikes(int fd_num);
    public int checkFeedLike(Map<String,Integer> map);
    public int getRecentFeedNum();
    public void insertFeedImage(Map<Integer,String> map);
}
