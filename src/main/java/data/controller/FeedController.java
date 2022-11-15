package data.controller;


import data.dto.FeedDto;
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

@RestController
@CrossOrigin
@RequestMapping("/feed")
public class FeedController {

    @Autowired
    FeedService feedservice;

    @PostMapping("/upload")
    public void fileUpload(@RequestParam MultipartFile file) throws IOException {
        feedservice.upload(file);
    }

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
