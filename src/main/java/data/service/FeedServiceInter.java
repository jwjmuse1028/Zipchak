package data.service;

import data.dto.FeedDto;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public interface FeedServiceInter {
//    public String fileUpload(MultipartFile uploadFile, HttpServletRequest request);
    public String upload(MultipartFile file);
    public void insertFeed(FeedDto dto);
    public List<FeedDto> getAllFeeds(String search_col,String search_word,String order_col);
    public FeedDto getFeedByNum(int fd_num);
    public void deleteFeed(int fd_num);
    public void updateFeed(FeedDto dto);
}
