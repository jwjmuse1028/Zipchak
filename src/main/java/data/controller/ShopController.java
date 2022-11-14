package data.controller;

import data.dto.*;
import data.mapper.ProductMapper;
import data.mapper.ShopMapper;
import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import util.FileUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/shop")
public class ShopController {

    @Autowired
    ShopMapper shopMapper;
    @Autowired
    ProductMapper productMapper;

    @Autowired
    UserMapper userMapper;

    List<String> totalImages=new ArrayList<>();

    @PostMapping("/insert")
    public void insertShop(@RequestBody Map<String,Object> map) {
//        System.out.println("pd_price="+map.get("pd_price"));
        ProductDto pddto=new ProductDto();
        pddto.setPd_name((String)map.get("pd_name"));
        pddto.setPd_ctg((String)map.get("pd_ctg"));
        pddto.setPd_price(Integer.parseInt((String)map.get("pd_price")));
        productMapper.insertProduct(pddto);

        ShopDto spdto=new ShopDto();
        spdto.setSp_title((String)map.get("sp_title"));
        spdto.setSp_txt((String)map.get("sp_txt"));
        spdto.setPd_num(pddto.getPd_num());
        spdto.setUr_num(Integer.parseInt((String)map.get("ur_num")));
        shopMapper.insertShop(spdto);


        for (String sname : totalImages) {
            ProductImageDto pdto=new ProductImageDto();
            pdto.setPd_num(pddto.getPd_num());
            pdto.setImg_name(sname);
            productMapper.insertProductImg(pdto);
        }
    }

    @GetMapping("/list")
    public Map<String, Object> getPagingList(@RequestParam(defaultValue = "1") int currentPage)
    {
        int totalCount;
        int perPage=16;
        int perBlock=5;
        int startNum;
        int startPage;
        int endPage;
        int totalPage;
        int no;

        totalCount=shopMapper.getTotalCount();
        totalPage=totalCount/perPage+(totalCount%perPage==0?0:1);

        startPage=(currentPage-1)/perBlock*perBlock+1;
        endPage=startPage+perBlock-1;

        if (endPage>totalPage)
            endPage=totalPage;

        startNum=(currentPage-1)*perPage;
        no=totalCount-(currentPage-1)*perPage;

        Map<String,Integer>map=new HashMap<>();
        map.put("startnum",startNum);
        map.put("perpage", perPage);
        List<ShopProductDto> list=shopMapper.getPagingList(map);
        
        for(ShopProductDto sdto:list)
        {
            List<String> images=productMapper.getImages(sdto.getPd_num());
            if(images.size()==0){ //등록된 사진이 없는경우
                sdto.setImg_first("noimage.jpg");
            }else{
                sdto.setImg_first(images.get(0)); //첨부된 사진중에 첫번째 사진을 대표이미지로 보낸다
            }
            UserDto udto=userMapper.getUserdataByUr(sdto.getUr_num());
            sdto.setPrf_tmp(udto.getPrf_tmp());
            sdto.setPrf_nick(udto.getPrf_nick());
            sdto.setPrf_img(udto.getPrf_img());
        }

        Vector<Integer> parr=new Vector<>();
        for (int i=startPage; i<=endPage; i++){
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
    public List<String> fileUpload(@RequestParam List<MultipartFile> uploadFile,
                                   HttpServletRequest request)
    {
//        System.out.println("Shop React로부터 이미지 업로드");
        //업로드할 폴더 구하기
        String path = request.getSession().getServletContext().getRealPath("/image");
        int i=0;
        for(MultipartFile multi:uploadFile) {
           //이전 업로드한 사진을 지운 후 현재 사진 업로드하기
           String pname = i++ +"_"+FileUtil.getChangeFileName(multi.getOriginalFilename());
           try {
               multi.transferTo(new File(path + "/" + pname));
               //총사진
               totalImages.add(pname);
//            System.out.println("업로드 성공");
           } catch (IOException e) {
               throw new RuntimeException(e);
           }
       }
        return totalImages;
    }

    @DeleteMapping("/imagedelete")
    public void imageDelete(@RequestParam int idx, HttpServletRequest request)
    {
        String path = request.getSession().getServletContext().getRealPath("/image");
        String fname=totalImages.get(idx);
        File file=new File(path+"/"+fname);
        if(file.exists())
            file.delete();
        totalImages.remove(idx);
    }

    @GetMapping("/imageclear")
    public void imageClear(HttpServletRequest request){
        String path = request.getSession().getServletContext().getRealPath("/image");
        totalImages.clear();
    }
    @GetMapping("/detail")
    public ShopDto select(@RequestParam int sp_num)
    {
        shopMapper.updateReadCount(sp_num);
        return shopMapper.getData(sp_num);
    }
    @GetMapping("/updateform")
    public ShopDto updateform(@RequestParam int sp_num)
    {
        return shopMapper.getData(sp_num);
    }

    @PostMapping("/update")
    public void updateBoard(@RequestBody ShopDto dto)
    {
        shopMapper.updateShop(dto);
    }

    @DeleteMapping("/delete")
    public void deleteBoard(@RequestParam int sp_num, HttpServletRequest request)
    {
        shopMapper.deleteShop(sp_num);
    }
}
