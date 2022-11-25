package data.mapper;

import data.dto.FeedCmtDto;
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
    public void insertFeedLike(Map<String,Integer> map);
    public void deleteFeedLike(Map<String,Integer> map);
    public int getFeedLikes(int fd_num);
    public int checkFeedLike(Map<String,Integer> map);
    public void updateReadCount(int fd_num);

    public int getRecentFeedNum();
    public void insertFeedImage(Map<Integer,String> map);


    public int getMaxCmtNum();
    public void insertFeedCmt(FeedCmtDto dto);
    public void updateCmtRestep(Map<String,Integer> map);
    public List<FeedCmtDto> getAllCmtByFdNum(int fd_num);
    public FeedCmtDto getCmtByCmtNum(int cmt_num);
    public void deleteCmtByNum(int cmt_num);

}
