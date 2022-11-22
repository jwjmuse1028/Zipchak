package data.controller;

import data.mapper.ShopLikeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/shop")
public class ShopLikeController {

    @Autowired
    ShopLikeMapper shopLikeMapper;

    @GetMapping("/likes")
    public Map<String,Integer> selectLikes(int sp_num,int ur_num)
    {
        Map<String,Object> likeMap=new HashMap<>();
        likeMap.put("ur_num",ur_num);
        likeMap.put("sp_num",sp_num);
        int n=shopLikeMapper.getUserLike(likeMap);
        if(n==1){
            shopLikeMapper.deleteLike(likeMap); //like일 경우 unlike로
        }else {
            shopLikeMapper.insertLike(likeMap);//unlike일 경우 like로
        }

        Map<String,Integer> rmap=new HashMap<>();
        rmap.put("userlike",shopLikeMapper.getUserLike(likeMap));
        rmap.put("totallikes",shopLikeMapper.getTotalLikes(sp_num));
        return rmap;

    }
}
