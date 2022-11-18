package data.controller;

import data.dto.*;
import data.mapper.ProductMapper;
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

    List<String> totalImages=new ArrayList<>();

    public ShopController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @PostMapping("/insert")
    public Map<String,Integer> insertShop(@RequestBody Map<String,Object> map) {
//        System.out.println("pd_price="+map.get("pd_price"));
        ProductDto pddto=new ProductDto();
        pddto.setPd_name((String)map.get("pd_name"));
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
        System.out.println("pd_num="+pddto.getPd_num());
        Map<String,Integer> rmap=new HashMap<>();
        rmap.put("pd_num",pddto.getPd_num());
        rmap.put("sp_num",spdto.getSp_num());

        return rmap;
    }

    @GetMapping("/list")
    public Map<String, Object> getPagingList(@RequestParam(defaultValue = "1") int currentPage,
                                             @RequestParam(required = false) String search_col,
                                             @RequestParam(required = false) String search_word)
    {
        int totalCount;
        int perPage=12;
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
        smap.put("search_col", search_col);
        smap.put("search_word", search_word);

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
    public void imageClear(HttpServletRequest request)
    {
        String path = request.getSession().getServletContext().getRealPath("/image");
        totalImages.clear();
    }
    @GetMapping("/detail")
    public ShopProductDto detail(int sp_num)
    {
        shopMapper.updateReadCount(sp_num);
        ShopProductDto dto=shopMapper.getData(sp_num);
        List<String> images=productMapper.getImages(dto.getPd_num());

        dto.setImages(images); //첨부된 사진중에 첫번째 사진을 대표이미지로 보낸다

        return dto;
    }
//    @GetMapping("/updateform")
//    public ShopDto updateform(@RequestParam int sp_num)
//    {
//        return shopMapper.getData(sp_num);
//    }
    @PostMapping("/soldout")
    public void updateSoldOut(int pd_num)
    {
        productMapper.updateSoldOut(pd_num);
    }

    @PostMapping("/update")
    public void updateShop(@RequestBody ShopDto dto)
    {
        shopMapper.updateShop(dto);
    }

    @DeleteMapping("/delete")
    public void deleteShop(@RequestParam int pd_num)
    {
        productMapper.deleteShop(pd_num);
    }
}
