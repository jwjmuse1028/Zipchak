package data.controller;

import data.dto.ReviewDto;
import data.dto.UserDto;
import data.mapper.UserMapper;
import data.service.S3Service;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import util.FileUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class UserController {

    private final S3Service s3Service;

    public UserController(S3Service s3Service) {
        this.s3Service = s3Service;
    }
    @Autowired
    UserMapper userMapper;

    @GetMapping("/user/idcheck") //회원가입때 아이디 중복 확인
    public int getSearchId(String ur_id)
    {
        return userMapper.getSearchId(ur_id);
    }

    @GetMapping("/user/nickcheck") //회원가입때 아이디 중복 확인
    public int getSearchNickname(String prf_nick)
    {
        return userMapper.getSearchNickname(prf_nick);
    }

    @PostMapping("/user/insert") //회원가입
    public void insertUser(@RequestBody UserDto dto)
    {
        dto.setPrf_img(uploadFileName);
        userMapper.insertUser(dto);
        userMapper.insertUser2(dto);
        userMapper.insertUser3(dto);
        uploadFileName=null;
    }
    //리액트에서 업로드시 저장할 파일명
    String uploadFileName;
    //사진업로드
    @PostMapping("/image/upload")
    public String fileUpload(@RequestParam MultipartFile uploadFile, HttpServletRequest request) throws IOException {
//        System.out.println("React로부터 이미지 업로드");
//        //업로드할 폴더 구하기
//        String path = request.getSession().getServletContext().getRealPath("/image");
//        //기존 업로드 파일이 있을 경우 삭제 후 다시 업로드
//        if(uploadFileName!=null){
//            FileUtil.deletePhoto(path, uploadFileName);
//        }
//        //이전 업로드한 사진을 지운 후 현재 사진 업로드하기
//        uploadFileName=FileUtil.getChangeFileName(uploadFile.getOriginalFilename());
//        try {
//            uploadFile.transferTo(new File(path+"/"+uploadFileName));
////            System.out.println("업로드 성공");
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }

        uploadFileName=s3Service.upload(uploadFile, "prf_img");
        return uploadFileName;
    }
}
