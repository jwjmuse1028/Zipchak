package data.mapper;

import data.dto.ShopDto;

import java.util.List;
import java.util.Map;

public interface ShopMapper {

    public int getTotalCount();
    public void insertShop(ShopDto dto);
    public List<ShopDto> getPagingList(Map<String,Integer> map);
    public ShopDto getData(int sp_num);
    public void updateShop(ShopDto dto);
    public void deleteShop(int sp_num);
    public void updateReadCount(int sp_num);
    public int getMaxNum();
}