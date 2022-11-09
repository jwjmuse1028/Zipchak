package data.controller;


import data.dto.FeedDto;
import data.mapper.FeedMapper;
import data.service.FeedServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/feed")
public class FeedController {

    @Autowired
    FeedServiceInter feedservice;


    @PostMapping("/insert")
    public void insertFeed(@RequestBody FeedDto dto)
    {
        feedservice.insertFeed(dto);
    }


    @GetMapping("/list")
    public List<FeedDto> getFeedList(@RequestParam(required = false) String search_col,
                                     @RequestParam(required = false) String search_word,
                                     @RequestParam(required = false) String order_col)
    {
        return feedservice.getAllFeeds(search_col,search_word,order_col);
    }


}
