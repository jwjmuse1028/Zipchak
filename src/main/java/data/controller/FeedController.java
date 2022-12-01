package data.controller;


import com.amazonaws.services.dynamodbv2.xspec.NULL;
import data.dto.FeedCmtDto;
import data.dto.FeedDto;
import data.dto.FeedListDto;
import data.mapper.FeedMapper;
import data.service.FeedService;
import data.service.FeedServiceInter;
import data.service.S3Service;
import org.apache.ibatis.javassist.expr.Instanceof;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
    public void updateFeed(@RequestPart(required = false) MultipartFile file, @RequestPart FeedDto dto, @RequestPart String fd_txt)
    {
        dto.setFd_txt(fd_txt);
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
//        System.out.println("search_col:"+search_col);
//        System.out.println("search_col의 타입 :" +(search_col instanceof String));
//        System.out.println("search_col의 이름 :" +(search_col.getClass().getSimpleName()));
//        System.out.println("search_col의 isEmpty :" +(search_col.isEmpty()));
//        System.out.println("search_col의 isBlank :" +(search_col.isBlank()));
//        System.out.println("search_col의 길이 :" +(search_col.length()));
//
//        System.out.println("search_col is null? "+ Objects.isNull(search_col));
//        System.out.println("search_word:"+search_word);
//        System.out.println("search_word is null? "+ Objects.isNull(search_word));
//        System.out.println("order_col:"+order_col);
//        System.out.println("order_col is null? "+ Objects.isNull(order_col));

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
