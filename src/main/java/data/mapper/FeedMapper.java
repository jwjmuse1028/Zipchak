package data.mapper;

import data.dto.FeedDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface FeedMapper {
    public void insertFeed(FeedDto dto);
    public List<FeedDto> getAllFeeds(Map<String,String> map);
    public FeedDto getFeedByNum(int fd_num);
    public void deleteFeed(int fd_num);
    public void updateFeed(FeedDto dto);
}
