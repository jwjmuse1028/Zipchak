package data.service;

import data.dto.FeedDto;
import data.mapper.FeedMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import util.FileUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service @Primary
public class FeedService implements FeedServiceInter{

    @Autowired
    FeedMapper feedMapper;

    //커버 사진 업로드 시 저장할 파일명
    String uploadFileName;

    //커버 사진 업로드
    @Override
    public String fileUpload(MultipartFile uploadFile, HttpServletRequest request) {
        System.out.println("React로부터 이미지 업로드");

        //업로드할 폴더 구하기
        String path=request.getSession().getServletContext().getRealPath("/image");

        // 기존 업로드 파일이 있을 경우 삭제->사진 쌓이는 것 방지 위해 삭제
        if(uploadFileName!=null){
            FileUtil.deletePhoto(path,uploadFileName);
        }

        //현재사진 바뀐 파일명으로 업로드하기
        uploadFileName=FileUtil.getChangeFileName(uploadFile.getOriginalFilename());
        try {
            uploadFile.transferTo(new File(path+"/"+uploadFileName));
            System.out.println("업로드 성공");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return uploadFileName;
    }



    @Override
    public void insertFeed(FeedDto dto) {
        //업로드한 파일이름 넣기
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
