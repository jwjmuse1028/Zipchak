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
    FeedServiceInter feedServiceInter;
    static MultipartFile uploadFile;

    //커버 사진 업로드 시 저장할 파일명
    String uploadFileName;
    @PostMapping("/upload")
    public void fileUpload(@RequestParam MultipartFile file) throws IOException {
        // feedServiceInter.upload(file);
        uploadFile=file;
        System.out.println("controller:"+uploadFile);

    }

    @Autowired
    S3Service s3service;
    @PostMapping("/insert")
    public void insertFeed(@RequestParam MultipartFile file, @ModelAttribute FeedDto dto)
    {
        //커버 사진 업로드-S3 bucket
        //경로는 fd_img로 동일하므로 parameter로 안받음
        try {
            uploadFileName= s3service.upload(file,"fd_img");
            System.out.println("uploadFileName:"+uploadFileName);

            //s3에 업로드한 파일이름 넣기
            dto.setFd_img(uploadFileName);

            feedServiceInter.insertFeed(dto);

        } catch (IOException e) {
            throw new RuntimeException(e);
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
