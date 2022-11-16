package data.service;

import data.dto.FeedDto;
import data.mapper.FeedMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service @Primary
public class FeedService implements FeedServiceInter{

    @Autowired
    FeedMapper feedMapper;

    @Autowired
    S3Service s3service;

    @Override
    public void insertFeed(MultipartFile file, FeedDto dto)
    {
        //커버 사진 업로드-S3 bucket
        //경로는 fd_img로 동일하므로 parameter로 안받음
        try {
            String uploadFileName= s3service.upload(file,"fd_img");
            System.out.println("uploadFileName:"+uploadFileName);

            //s3에 업로드한 파일이름 dto의 fd_img에 넣기
            dto.setFd_img(uploadFileName);
            //DB에 dto 저장
            feedMapper.insertFeed(dto);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
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
