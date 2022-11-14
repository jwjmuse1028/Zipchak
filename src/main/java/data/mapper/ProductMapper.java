package data.mapper;

import data.dto.ProductDto;
import data.dto.ProductImageDto;
import data.dto.ShopDto;

import java.util.List;

public interface ProductMapper {

    public void insertProduct(ProductDto dto);
    public void insertProductImg(ProductImageDto dto);
    public List<String> getImages(int pd_num);

}
