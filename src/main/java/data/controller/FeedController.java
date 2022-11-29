package data.controller;


import data.dto.FeedCmtDto;
import data.dto.FeedDto;
import data.dto.FeedListDto;
import data.mapper.FeedMapper;
import data.service.FeedService;
import data.service.FeedServiceInter;
import data.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class FeedController {

    @Autowired
    FeedServiceInter feedServiceInter;

    @PostMapping("/feed/insert")
    public void insertFeed(@RequestPart MultipartFile file, @RequestPart FeedDto dto, @RequestPart String fd_txt)
    {
        dto.setFd_txt(fd_txt);
        feedServiceInter.insertFeed(file,dto);
    }

    @PostMapping("/feed/update")
    public void updateFeed(@RequestPart(required = false) MultipartFile file, @RequestPart FeedDto dto)
    {
        feedServiceInter.updateFeed(file,dto);
    }
    @GetMapping("/feed/delete")
    public void insertFeedLike(int fd_num)
    {
        feedServiceInter.deleteFeed(fd_num);
    }

//    @GetMapping("/feed/getfd")
//    public void getFeedByNum(@RequestParam int fd_num)
//    {
//        feedServiceInter.getFeedByNum(fd_num);
//    }

    @GetMapping("/feed/list")
    public List<FeedListDto> getFeedList(@RequestParam(required = false) String search_col,
                                         @RequestParam(required = false) String search_word,
                                         @RequestParam(required = false) String order_col)
    {
        return feedServiceInter.getAllFeeds(search_col,search_word,order_col);
    }

    @GetMapping("/feed/like")
    public void insertFeedLike(int fd_num,int ur_num){
        feedServiceInter.insertFeedLike(fd_num,ur_num);
    }
    @GetMapping("/feed/likedel")
    public void deleteFeedLike(int fd_num,int ur_num){
        feedServiceInter.deleteFeedLike(fd_num,ur_num);
    }
    @GetMapping("/feed/uprdcnt")
    public void updateReadCount(int fd_num){
        feedServiceInter.updateReadCount(fd_num);
    }

    @GetMapping("/feed/detail")
    public Map<String,Object> getFeedDetail(int fd_num, int ur_num)
    {
        return feedServiceInter.getFeedDetail(fd_num,ur_num);
    }

    @PostMapping("/feed/loginur")
    public Map<String,Object> getProfileByNum(int ur_num) {
        return feedServiceInter.getProfileByNum(ur_num);
    }


    //  댓글관련

    @PostMapping("fdcmt/insert")
    public void insertFeedCmt(@RequestBody FeedCmtDto dto)
    {
        feedServiceInter.insertFeedCmt(dto);
    }

    @GetMapping("fdcmt/list")
    public List<FeedCmtDto> getAllCmtByFdNum(int fd_num) {
        return feedServiceInter.getAllCmtByFdNum(fd_num);
    }

}
