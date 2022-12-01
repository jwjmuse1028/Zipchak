package data.service;

import data.dto.FeedCmtDto;
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
import java.util.Objects;

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
    public void deleteFeed(int fd_num) {
        feedMapper.deleteFeed(fd_num);
    }

    @Override
    public void updateFeed(MultipartFile file, FeedDto dto)
    {
        String uploadFileName;
        //커버 사진 업로드-S3 bucket
        //경로는 fd_img로 동일하므로 parameter로 안받음
        if (file!=null){
            try {
                uploadFileName= s3service.upload(file,"fd_img/"+dto.getFd_num());
                System.out.println("uploadFileName:"+uploadFileName);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            //s3에 업로드한 파일이름 dto의 fd_img에 넣기
            dto.setFd_img(uploadFileName);
        }
        //DB에 dto 저장
        feedMapper.updateFeed(dto);
    }

    @Override
    public List<FeedListDto> getAllFeeds(String search_col, String search_word, String order_col) {

//        System.out.println("search_col:"+search_col);
//        System.out.println("search_col is blank :" + search_col=="");
//
//        System.out.println("search_col is null? "+ Objects.isNull(search_col));
//        System.out.println("search_word:"+search_word);
//        System.out.println("search_word is null? "+ Objects.isNull(search_word));
//        System.out.println("order_col:"+order_col);
//        System.out.println("order_col is null? "+ Objects.isNull(order_col));

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
    public void insertFeedLike(int fd_num,int ur_num){
        Map<String,Integer> lmap=new HashMap<>();
        lmap.put("fd_num",fd_num);
        lmap.put("ur_num",ur_num);

        feedMapper.insertFeedLike(lmap);
    }
    public void deleteFeedLike(int fd_num,int ur_num){
        Map<String,Integer> lmap=new HashMap<>();
        lmap.put("fd_num",fd_num);
        lmap.put("ur_num",ur_num);

        feedMapper.deleteFeedLike(lmap);
    }

    @Override
    public Map<String,Object> getProfileByNum(int ur_num) {
        Map<String,Object> map= userMapper.getProfileByNum(ur_num);
        return map;
    }

    @Override
    public Map<String,Object> getFeedDetail(int fd_num, int ur_num) {

        FeedDto dto=getFeedByNum(fd_num);

        // 글쓴이 프로필 가져오기
        int writer_num=dto.getUr_num();
        Map<String,Object> pmap=getProfileByNum(writer_num);

        // 좋아요 수
        int fd_likes = feedMapper.getFeedLikes(fd_num);

        Map<String,Object> map=new HashMap<>();
        map.put("dto",dto);
        map.put("prf_map",pmap);
        map.put("fd_likes",fd_likes);

        int chk_like=this.checkFeedLike(fd_num,ur_num);
        map.put("chk_like",chk_like);

        return map;
    }
    @Override
    public int checkFeedLike(int fd_num, int ur_num){
        // like 했는지 여부 조회 -> 했으면 1 아니면 0
        Map<String,Integer> lmap=new HashMap<>();
        lmap.put("fd_num",fd_num);
        lmap.put("ur_num",ur_num);

        return feedMapper.checkFeedLike(lmap);
    }

    @Override
    public void updateReadCount(int fd_num)
    {
        feedMapper.updateReadCount(fd_num);
    }




//  댓글관련


    @Override
    public int getMaxCmtNum() {
        return feedMapper.getMaxCmtNum();
    }

    @Override
    public void insertFeedCmt(FeedCmtDto dto) {
        // 새글인지 답글인지 판단해서 로직을 짠다
        int cmt_num=dto.getCmt_num(); //새글(새로운 원글)일 경우 0이 들어가 있음 댓글 form에서 넣을때 빈값-> default인 0 들어감
        int cmt_rg=dto.getCmt_rg();
        int cmt_rs=dto.getCmt_rs();
        int cmt_rl=dto.getCmt_rl();

        if(cmt_num==0) //새글일 경우
        {
            cmt_rg=this.getMaxCmtNum()+1; //가장 큰 feedcmtnum가져옴
            cmt_rs=0;
            cmt_rl=0;

        }else { //답글일 경우
            //같은 그룹 중 전달받은 restep보다 큰 값을 가진 데이터들은 모두 restep에 일괄 +1을 해준다.
            this.updateCmtRestep(cmt_rg,cmt_rs);
            //그리고 나서 전달받은 값보다 1크게 db에 저장
            cmt_rs++;
            cmt_rl++;
        }
        //변경된 값들 다시 dto에 넣기
        dto.setCmt_rg(cmt_rg);
        dto.setCmt_rs(cmt_rs);
        dto.setCmt_rl(cmt_rl);

        feedMapper.insertFeedCmt(dto);
    }

    @Override
    public void updateCmtRestep(int cmt_rg, int cmt_rs) {
        Map<String,Integer> map=new HashMap<>();
        map.put("cmt_rg",cmt_rg);
        map.put("cmt_rs",cmt_rs);

        feedMapper.updateCmtRestep(map);
    }

    @Override
    public List<FeedCmtDto> getAllCmtByFdNum(int fd_num) {
        return feedMapper.getAllCmtByFdNum(fd_num);
    }

    @Override
    public FeedCmtDto getCmtByCmtNum(int cmt_num) {
        return feedMapper.getCmtByCmtNum(cmt_num);
    }

    @Override
    public void deleteCmtByNum(int cmt_num) {
        feedMapper.deleteCmtByNum(cmt_num);
    }
}
