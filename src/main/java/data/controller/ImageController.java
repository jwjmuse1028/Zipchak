package data.controller;

import data.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class ImageController {

    private final S3Service s3Service;

    @PostMapping ("/insert")
    public String insertImg(@RequestParam("file") MultipartFile multipartFile, String dirName) throws IOException {
        return s3Service.upload(multipartFile, dirName);
    }


}
