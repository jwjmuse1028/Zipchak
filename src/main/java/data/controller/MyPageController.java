package data.controller;

import data.dto.ReviewDto;
import data.mapper.MyPageMapper;
import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class MyPageController {

    @Autowired
    MyPageMapper mpmapper;

    @PostMapping("/updatetmp")
    public void updatetmp(@RequestBody ReviewDto dto){
        int rv_tmp=dto.getRv_tmp();
        if (rv_tmp==0){
            rv_tmp=1;
        }
        //seller인지 buyer인지 확인

        mpmapper.insertRv(dto);
        double pretmp=mpmapper.getTmp(dto.getTouser());
        double avgtmp1=(rv_tmp+pretmp)/2;
        double avgtmp=Math.round(avgtmp1*10)/10.0;
        Map<String,Object> map=new HashMap<>();
        map.put("ur_num",dto.getTouser());
        map.put("avgtmp",avgtmp);
        mpmapper.updateTmp(map);
    }

    @GetMapping("/checkrv")
    public int checkRv(int ur_num)
    {
        return mpmapper.checkRv(ur_num);
    }

    @GetMapping("/buylistforreview")
    public List<ReviewDto> buylistforreview(int ur_num)
    {
        List<ReviewDto> list= mpmapper.buylistforreview(ur_num);
        return list;
    }
    @GetMapping("/getrv")
    public List<ReviewDto> getRvList(int ur_num)
    {
        return mpmapper.getRvList(ur_num);
    }
}
