package data.service;

import data.dto.FeedCmtDto;
import data.dto.FeedDto;
import data.dto.FeedListDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface FeedServiceInter {
    public void insertFeed(MultipartFile file, FeedDto dto);
    public List<FeedListDto> getAllFeeds(String search_col, String search_word, String order_col);
    public FeedDto getFeedByNum(int fd_num);
    public void deleteFeed(int fd_num);
    public void updateFeed(MultipartFile file, FeedDto dto);
    public void insertFeedLike(int fd_num,int ur_num);
    public void deleteFeedLike(int fd_num,int ur_num);
    public Map<String,Object> getProfileByNum(int ur_num);
    public Map<String,Object> getFeedDetail(int fd_num,int ur_num);
    public int checkFeedLike(int fd_num, int ur_num);
    public void updateReadCount(int fd_num);

    public int getMaxCmtNum();
    public void insertFeedCmt(FeedCmtDto dto);
    public void updateCmtRestep(int cmt_rg, int cmt_rs);
    public List<FeedCmtDto> getAllCmtByFdNum(int fd_num);
    public FeedCmtDto getCmtByCmtNum(int cmt_num);
    public void deleteCmtByNum(int cmt_num);
}
