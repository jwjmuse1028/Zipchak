package data.service;

import data.dto.FeedDto;
import data.dto.FeedListDto;
import data.dto.UserDto;
import data.mapper.FeedMapper;
import data.mapper.UserMapper;
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
    UserMapper userMapper;

    @Autowired
    S3Service s3service;

    @Override
    public void insertFeed(MultipartFile file, FeedDto dto)
    {
        //커버 사진 업로드-S3 bucket
        //경로는 fd_img로 동일하므로 parameter로 안받음
        try {
            int max_num = feedMapper.getRecentFeedNum()+1;
            String uploadFileName= s3service.upload(file,"fd_img/"+max_num);
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
    public List<FeedListDto> getAllFeeds(String search_col, String search_word, String order_col) {

        //데이터 가져오기
        Map<String,String> map=new HashMap<>();
        map.put("search_col",search_col);
        map.put("search_word",search_word);
        map.put("order_col",order_col);

        return feedMapper.getAllFeeds(map);
    }

    @Override
    public FeedDto getFeedByNum(int fd_num) {
        return feedMapper.getFeedByNum(fd_num);
    }

    @Override
    public Map<String,Object> getProfileByNum(int ur_num) {
        Map<String,Object> map= userMapper.getProfileByNum(ur_num);
        return map;
    }

    @Override
    public Map<String,Object> getFeedDetail(int fd_num) {

        FeedDto dto=getFeedByNum(fd_num);
        int writer_num=dto.getUr_num();
        Map<String,Object> pmap=getProfileByNum(writer_num);

        // 좋아요 수
        int fd_likes = feedMapper.getFeedLikes(fd_num);

        Map<String,Object> map=new HashMap<>();
        map.put("dto",dto);
        map.put("prf_map",pmap);
        map.put("fd_likes",fd_likes);

        return map;
    }
    @Override
    public int checkFeedLike(int fd_num, int ur_num){
        // like 했는지 여부 조회 -> 했으면 1 아니면 0
        Map<String,Integer> lmap=new HashMap<>();
        lmap.put("fd_num",fd_num);
        lmap.put("ur_num",ur_num);
        int chk_like = feedMapper.checkFeedLike(lmap);

        return chk_like;
    }

    @Override
    public void deleteFeed(int fd_num) {

    }

    @Override
    public void updateFeed(FeedDto dto) {

    }


}
