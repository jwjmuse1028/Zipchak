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
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class FeedController {

    @Autowired
    FeedServiceInter feedServiceInter;

    @PostMapping("/feed/insert")
    public void insertFeed(@RequestPart MultipartFile file, @RequestPart FeedDto dto)
    {
        feedServiceInter.insertFeed(file,dto);
    }

    @GetMapping("/feed/list")
    public List<FeedListDto> getFeedList(@RequestParam(required = false) String search_col,
                                         @RequestParam(required = false) String search_word,
                                         @RequestParam(required = false) String order_col)
    {
        return feedServiceInter.getAllFeeds(search_col,search_word,order_col);
    }

    @GetMapping("/feed/detail")
    public Map<String,Object> getFeedDetail(int fd_num)
    {
        return feedServiceInter.getFeedDetail(fd_num);
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
