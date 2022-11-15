package data.controller;


import data.dto.FeedDto;
import data.service.FeedServiceInter;
import data.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
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

    FeedServiceInter feedServiceInter;

    static MultipartFile uploadFile;


    //커버 사진 업로드 시 저장할 파일명
    String uploadFileName;
    @PostMapping("/upload")
    public String fileUpload(@RequestParam MultipartFile uploadFile, HttpServletRequest request)
    {
        return feedServiceInter.fileUpload(uploadFile,request);
    }

    @Autowired
    S3Service s3service;
    @PostMapping("/insert")
    public void insertFeed(@RequestBody FeedDto dto)
    {
        feedServiceInter.insertFeed(dto);
    }


    @GetMapping("/list")
    public List<FeedDto> getFeedList(@RequestParam(required = false) String search_col,
                                     @RequestParam(required = false) String search_word,
                                     @RequestParam(required = false) String order_col)
    {
        return feedServiceInter.getAllFeeds(search_col,search_word,order_col);
    }


}

    @GetMapping("/list")
    public List<FeedDto> getFeedList(@RequestParam(required = false) String search_col,
                                     @RequestParam(required = false) String search_word,
                                     @RequestParam(required = false) String order_col)
    {
        return feedServiceInter.getAllFeeds(search_col,search_word,order_col);
    }


}
