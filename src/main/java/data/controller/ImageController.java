package data.controller;

import data.mapper.FeedMapper;
import data.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class ImageController {

    private final S3Service s3Service;

    FeedMapper feedMapper;

    @PostMapping ("/insert")
    public String insertImg(@RequestParam("file") MultipartFile multipartFile) throws IOException {

        int fidx = feedMapper.getRecentFeedNum();
        String imgName = s3Service.upload(multipartFile, "fd_img/"+fidx);

//        Map<Integer, String> map = new HashMap<>();
//        map.put()
//        feedMapper.insertFeedImage();

        return imgName;
    }


}
