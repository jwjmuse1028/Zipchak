package data.service;

import data.dto.FeedDto;
import data.mapper.FeedMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import util.FileUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FeedService implements FeedServiceInter{

    @Autowired
    FeedMapper feedMapper;

    //사진 업로드 시 저장할 파일명
    String uploadFileName;

    //사진 업로드


    @Override
    public void insertFeed(FeedDto dto) {
        feedMapper.insertFeed(dto);
    }

    @Override
    public List<FeedDto> getAllFeeds(String search_col, String search_word, String order_col) {

        //데이터 가져오기
        Map<String,String> map=new HashMap<>();
        map.put("search_col",search_col);
        map.put("search_word",search_word);
        map.put("order_col",order_col);

        return feedMapper.getAllFeeds(map);
    }

    @Override
    public FeedDto getFeedByNum(int fd_num) {
        return null;
    }

    @Override
    public void deleteFeed(int fd_num) {

    }

    @Override
    public void updateFeed(FeedDto dto) {

    }


}
