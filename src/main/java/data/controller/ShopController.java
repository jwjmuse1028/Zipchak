package data.controller;

import com.amazonaws.services.simpleworkflow.flow.core.TryCatch;
import data.dto.*;
import data.mapper.ChatRoomMapper;
import data.mapper.ProductMapper;
import data.mapper.ShopLikeMapper;
import data.mapper.ShopMapper;
import data.mapper.UserMapper;
import data.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/shop")
public class ShopController {

    private final S3Service s3Service;

    @Autowired
    ShopMapper shopMapper;
    @Autowired
    ProductMapper productMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    ShopLikeMapper likeMapper;

    @Autowired
    ChatRoomMapper crmapper;
    
    List<String> totalImages=new ArrayList<>();
    List<String> newTotalImages=new ArrayList<>();

    public ShopController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @PostMapping("/insert")
    public Map<String,Integer> insertShop(@RequestBody Map<String,Object> map) {
        ProductDto pddto=new ProductDto();
        pddto.setPd_ctg((String)map.get("pd_ctg"));
        pddto.setPd_price(Integer.parseInt((String)map.get("pd_price")));
        productMapper.insertProduct(pddto);

        ShopDto spdto=new ShopDto();
        spdto.setSp_title((String)map.get("sp_title"));
        spdto.setSp_txt((String)map.get("sp_txt"));
        spdto.setUr_num(Integer.parseInt((String)map.get("ur_num")));
        spdto.setPd_num(pddto.getPd_num());
        shopMapper.insertShop(spdto);

        for (String sname : totalImages) {
            ProductImageDto pdto=new ProductImageDto();
            pdto.setPd_num(pddto.getPd_num());
            pdto.setImg_name(sname);
            productMapper.insertProductImg(pdto);
        }
        Map<String,Integer> rmap=new HashMap<>();
        rmap.put("pd_num",pddto.getPd_num());
        rmap.put("sp_num",spdto.getSp_num());

        return rmap;
    }

    @GetMapping("/list")
    public Map<String, Object> getPagingList(@RequestParam(defaultValue = "1") int currentPage,
                                             @RequestParam(required = false) String search_col,
                                             @RequestParam(required = false) String search_word,
//                                             @RequestParam(required = false) int sp_num,
//                                             int sp_num,
                                             @RequestParam(value = "ur_num",required = false) String s_ur_num,
                                             @RequestParam(value = "pd_ctg",required = false) String pd_ctg
                                             )
    {
        int totalCount;
        int perPage=12;
        int perBlock=5;
        int startNum;
        int startPage;
        int endPage;
        int totalPage;
        int no;

        int ur_num = 0;
        try{
            ur_num = Integer.parseInt(s_ur_num);
        }catch (NumberFormatException|NullPointerException e){
            ur_num=0;
        }

        totalCount=shopMapper.getTotalCount(pd_ctg);
        totalPage=totalCount/perPage+(totalCount%perPage==0?0:1);

        startPage=(currentPage-1)/perBlock*perBlock+1;
        endPage=startPage+perBlock-1;

        if (endPage>totalPage)
            endPage=totalPage;

        startNum=(currentPage-1)*perPage;
        no=totalCount-(currentPage-1)*perPage;

        Map<String,Object>map=new HashMap<>();
        map.put("startnum",startNum);
        map.put("perpage", perPage);
        map.put("search_col",search_col);
        map.put("search_word",search_word);
        //if (pd_ctg==null){pd_ctg="all";}
        map.put("pd_ctg",pd_ctg);
        List<ShopProductDto> list=shopMapper.getPagingList(map);
        
        for(ShopProductDto sppddto:list)
        {
            List<String> images=productMapper.getImages(sppddto.getPd_num());
            if(images.size()==0)
            { //등록된 사진이 없는경우
                sppddto.setImg_first("noimage.jpg");
            }else{
                sppddto.setImg_first(images.get(0)); //첨부된 사진중에 첫번째 사진을 대표이미지로 보낸다
            }
//            UserDto udto=userMapper.getUserdataByUr(sppddto.getUr_num());
//            sppddto.setPrf_tmp(udto.getPrf_tmp());
//            sppddto.setPrf_nick(udto.getPrf_nick());
//            sppddto.setPrf_img(udto.getPrf_img());

            Map<String,Object> likeMap=new HashMap<>();
            likeMap.put("ur_num",ur_num);
//            likeMap.put("sp_num",sp_num);
            likeMap.put("sp_num",sppddto.getSp_num());

            if(ur_num==0)
                sppddto.setUserlike(0);
            else
                sppddto.setUserlike(likeMapper.getUserLike(likeMap));

            sppddto.setTotallikes(likeMapper.getTotalLikes(sppddto.getSp_num()));

        }

        Vector<Integer> parr=new Vector<>();

        for (int i=startPage; i<=endPage; i++)
        {
            parr.add(i);
        }
        Map<String,Object>smap=new HashMap<>();
        smap.put("totalCount",totalCount);
        smap.put("totalPage",totalPage);
        smap.put("startPage",startPage);
        smap.put("endPage",endPage);
        smap.put("list",list);
        smap.put("parr",parr);
        smap.put("no",no);

        return smap;
    }

    @PostMapping("/upload")
    public List<String> fileUpload(@RequestParam List<MultipartFile> uploadFile)throws IOException
    {
        for(MultipartFile multi:uploadFile){
            totalImages.add(s3Service.upload(multi, "sp_img"));
        }
        return totalImages;
    }
//    @PostMapping("/upload2")
//    public List<String> fileUpload2(@RequestParam List<MultipartFile> uploadFile)throws IOException
//    {
//        newTotalImages.clear();//지운후 마지막 업로드한것만 저장
//
//        for(MultipartFile multi:uploadFile){
//            String names=s3Service.upload(multi, "sp_img");
//            newTotalImages.add(names);
//            totalImages.add(names);
//        }
//        return newTotalImages;
//    }

    @DeleteMapping("/imagedelete")
    public void imageDelete(@RequestParam int idx, HttpServletRequest request)
    {
//        String path = request.getSession().getServletContext().getRealPath("/image");
//        String fname=totalImages.get(idx);
//        File file=new File(path+"/"+fname);
//        if(file.exists())
//            file.delete();

        totalImages.remove(idx);

    }

    @GetMapping("/imageclear")
    public void imageClear(HttpServletRequest request)
    {
//        String path = request.getSession().getServletContext().getRealPath("/image");
        totalImages.clear();
    }
    @GetMapping("/detail")
    public ShopProductDto detail(int sp_num,@RequestParam(value = "ur_num", required = false) String s_ur_num)
    {
        int ur_num = 0;
        try{
            ur_num = Integer.parseInt(s_ur_num);
        }catch (NumberFormatException|NullPointerException e){
            ur_num=0;
        }
        shopMapper.updateReadCount(sp_num);
        ShopProductDto sppddto=shopMapper.getData(sp_num);
        List<String> images=productMapper.getImages(sppddto.getPd_num());

        Map<String,Object> likeMap=new HashMap<>();
        likeMap.put("ur_num",ur_num);
        likeMap.put("sp_num",sp_num);

        sppddto.setTotallikes(likeMapper.getTotalLikes(sp_num));
        sppddto.setUserlike(likeMapper.getUserLike(likeMap));

        sppddto.setImages(images); //첨부된 사진중에 첫번째 사진을 대표이미지로

        return sppddto;
    }

    @GetMapping("/updateform")
    public ShopProductDto updateform(int sp_num)
    {
        ShopProductDto sppddto=shopMapper.getData(sp_num);
        sppddto.setSp_num(sp_num);
       // System.out.println(sppddto);
        List<String> images=productMapper.getImages(sppddto.getPd_num());


        sppddto.setImages(images); //첨부된 사진중에 첫번째 사진을 대표이미지로

        totalImages=sppddto.getImages();
        return sppddto;
    }

    @PostMapping("/soldout")
    public void updateSoldOut(int pd_num)
    {
        productMapper.updateSoldOut(pd_num);
    }

    @PostMapping("/update")
    public void updateShop(@RequestBody ShopProductDto dto)
    {
//        System.out.println(dto);
        shopMapper.updateShop(dto);
//        System.out.println("수정성공");
    }

    @DeleteMapping("/delete")
    public void deleteShop(@RequestParam int pd_num)
    {
        productMapper.deleteShop(pd_num);
    }
    @GetMapping("/getchatcnt")
    public int getChatCnt(int sp_num)
    {
        return crmapper.getChatCnt(sp_num);
    }
}
