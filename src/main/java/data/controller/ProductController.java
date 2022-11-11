package data.controller;

import data.dto.ProductDto;
import data.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductMapper productMapper;

    @PostMapping("/insert")
    public void insertProduct(@RequestBody ProductDto dto)
    {
        productMapper.insertProduct(dto);
        productMapper.insertProductImg(dto);
    }

}
