package data.mapper;

import data.dto.ShopDto;
import data.dto.ShopProductDto;

import java.util.List;
import java.util.Map;

public interface ShopMapper {

    public int getTotalCount();
    public void insertShop(ShopDto dto);
    public List<ShopProductDto> getPagingList(Map<String,Integer> map);
    public ShopProductDto getData(int sp_num);
    public void updateShop(ShopDto dto);
    public void updateReadCount(int sp_num);
}
