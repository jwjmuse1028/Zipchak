package data.controller;

import data.service.ExcelService;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/crawling")
public class CrawlingImageController {

    @Autowired
    ExcelService excelService;

    @PostMapping("/insert")
    public void insertFeed(MultipartFile file) throws  InvalidFormatException {
        excelService.insertFeed(file);

    }

    @PostMapping("/insertshop")
    public void insertShop(MultipartFile file) throws InvalidFormatException {
        excelService.insertShop(file);
    }
}
