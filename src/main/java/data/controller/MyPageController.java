package data.controller;

import data.dto.FeedListDto;
import data.dto.ReviewDto;
import data.dto.ShopProductDto;
import data.dto.UserDto;
import data.mapper.MyPageMapper;
import data.service.S3Service;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin
public class MyPageController {

    @Autowired
    MyPageMapper mpmapper;
    private final S3Service s3Service;

    @PostMapping("/updatetmp")
    public void updatetmp(@RequestBody ReviewDto dto) {
        mpmapper.insertRv(dto);
        double pretmp = mpmapper.getTmp(dto.getTouser());
        double avgtmp1 = (dto.getRv_tmp() + pretmp) / 2;
        double avgtmp = Math.round(avgtmp1 * 10) / 10.0;
        Map<String, Object> map = new HashMap<>();
        map.put("ur_num", dto.getTouser());
        map.put("avgtmp", avgtmp);
        mpmapper.updateTmp(map);
    }

    @GetMapping("/checkrv")
    public int checkRv(int ur_num) {
        return mpmapper.checkRv(ur_num);
    }

    @GetMapping("/buylistforreview")
    public List<ReviewDto> buylistforreview(int ur_num) {
        List<ReviewDto> list = mpmapper.buylistforreview(ur_num);
        return list;
    }

    @GetMapping("/getrv")
    public List<ReviewDto> getRvList(int ur_num) {
        return mpmapper.getRvList(ur_num);
    }

    @GetMapping("/getselllist")
    public List<Map<String, Object>> getSellList(int ur_num) {
        return mpmapper.getSellList(ur_num);
    }

    @GetMapping("/getfeedlist")
    public List<Map<String, Object>> getFeedList(int ur_num) {
        return mpmapper.getFeedList(ur_num);
    }

    @GetMapping("/getbookmarklist")
    public List<Map<String, Object>> getBookmarkList(int ur_num) {
        return mpmapper.getBookmarkList(ur_num);
    }

    @GetMapping("/getlikelist")
    public List<Map<String, Object>> getLikeList(int ur_num) {
        return mpmapper.getLikeList(ur_num);
    }

    @PostMapping("/updateprf")
    public Map<String, String> updateprf(@RequestPart(required=false) MultipartFile file,
                                         @RequestParam String prf_nick,
                                         @RequestParam int ur_num) throws IOException {
        Map<String, Object> map = new HashMap<>();
        String uploadimg = null;
        if (file != null) {
            uploadimg = s3Service.upload(file, "prf_img");
            map.put("prf_img", uploadimg);
        }

        map.put("ur_num", ur_num);
        map.put("prf_nick", prf_nick);
        //System.out.println(prf_nick);
        //System.out.println(map.get("prf_nick"));
        mpmapper.updateprf(map);

        Map<String, String> sendmap = new HashMap<>();
        sendmap.put("prf_nick", prf_nick);
        sendmap.put("prf_img", uploadimg);
        return sendmap;
    }

    @GetMapping("/getpersonaldata")
    public UserDto getpersonaldata(int ur_num) {
        return mpmapper.getpersonaldata(ur_num);
    }

    @PostMapping("/updateinfo")
    public Map<String, String> updateinfo(@RequestPart(required=false) MultipartFile file,
                                          @RequestParam String prf_nick,
                                          @RequestParam int ur_num,
                                          @RequestParam String info_email,
                                          @RequestParam String info_hp,
                                          @RequestParam String info_addr) throws IOException {
        UserDto dto=new UserDto();
        String uploadimg=null;
        if (file != null) {
            uploadimg = s3Service.upload(file, "prf_img");
            dto.setPrf_img(uploadimg);
        }
        dto.setUr_num(ur_num);
        dto.setPrf_nick(prf_nick);
        dto.setInfo_email(info_email);
        dto.setInfo_hp(info_hp);
        dto.setInfo_addr(info_addr);
        //System.out.println(prf_nick);
        //System.out.println(map.get("prf_nick"));
        mpmapper.updateinfo(dto);

        Map<String, String> sendmap = new HashMap<>();
        sendmap.put("prf_nick", prf_nick);
        sendmap.put("prf_img", uploadimg);
        return sendmap;
    }
    @GetMapping("/searchking")
    public Map<String, List<Integer>> searchking(){
        List<Integer> sellerking=mpmapper.sellerking();
        List<Integer> buyerking=mpmapper.buyerking();
        List<Integer> tempking=mpmapper.tempking();
        List<Integer> bookmarkking=mpmapper.bookmarkking();
        List<Integer> likeking=mpmapper.likeking();
        Map<String, List<Integer>> map= new HashMap<>();
        map.put("sellerking",sellerking);
        map.put("buyerking",buyerking);
        map.put("tempking",tempking);
        map.put("bookmarkking",bookmarkking);
        map.put("likeking",likeking);
        return map;
    }

    @GetMapping("/getsearchtotal")
    public Map<String,Object> getsearchtotal(String word)
    {
        Map<String,Object> map=new HashMap<>();
        List<FeedListDto> fdlist=mpmapper.getSearchFeeds(word);
        List<ShopProductDto> splist=mpmapper.getSearchShops(word);
        map.put("fdlist",fdlist);
        map.put("splist",splist);
        return map;
    }

}
