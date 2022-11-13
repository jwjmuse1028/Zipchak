package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("ProductImageDto")
public class ProductImageDto {

    private int img_num;
    private int pd_num;
    private String img_name;
}
