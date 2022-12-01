package data.mapper;

import data.dto.ShopDto;
import data.dto.ShopProductDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ShopMapper {

    public int getTotalCount(String pd_ctg);
    public void insertShop(ShopDto dto);
    public List<ShopProductDto> getPagingList(Map<String, Object> map);
    public ShopProductDto getData(int sp_num);
    public void updateShop(ShopProductDto dto);
    public void updateReadCount(int sp_num);
}
