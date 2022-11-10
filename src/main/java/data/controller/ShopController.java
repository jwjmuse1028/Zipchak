package data.controller;

import data.dto.ShopDto;
import data.mapper.ShopMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

@RestController
@CrossOrigin
@RequestMapping("/shop")
public class ShopController {

    @Autowired
    ShopMapper shopMapper;

    @PostMapping("/insert")
    public void insertShop(@RequestBody ShopDto dto)
    {
        shopMapper.insertShop(dto);
    }

    @GetMapping("/list")
    public Map<String, Object> getPagingList(@RequestParam(defaultValue = "1") int currentPage)
    {
        //System.out.println("currentPage="+currentPage);
        int totalCount;
        int perPage=20;
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
        List<ShopDto> list=shopMapper.getPagingList(map);

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
