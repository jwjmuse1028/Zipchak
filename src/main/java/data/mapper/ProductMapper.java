package data.mapper;

import data.dto.ProductDto;
import data.dto.ShopDto;

public interface ProductMapper {

    public void insertProduct(ProductDto dto);
    public void insertProductImg(ProductDto dto);

}
