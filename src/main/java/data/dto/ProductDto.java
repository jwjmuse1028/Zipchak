package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("ProductDto")
public class ProductDto {

    private int pd_num;
    private int pd_price;
    private String pd_ctg;
    private String pd_status;


}
