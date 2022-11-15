package data.service;

import data.dto.FeedDto;
import data.mapper.FeedMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service @Primary
public class FeedService implements FeedServiceInter{

    @Autowired
    FeedMapper feedMapper;

    @Autowired
    S3Service s3service;

    //커버 사진 업로드 시 저장할 파일명
    String uploadFileName;

    //커버 사진 담아놓을 파일 선언
    MultipartFile uploadFile;

    //커버 사진 업로드-S3 bucket
    //경로는 fd_img로 동일하므로 parameter로 안받음
    public void upload(MultipartFile file){
        uploadFile=file;
    }

    @Override
    public void insertFeed(FeedDto dto) {
        // s3에 저장
        try {
            uploadFileName= s3service.upload(uploadFile,"fd_img");
            System.out.println("uploadFileName:"+uploadFileName);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        //s3에 업로드한 파일이름 넣기
        dto.setFd_img(uploadFileName);

        //전체 dto 데이터 넣기
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
