package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("ShopInfoDto")
public class ShopInfoDto {
    private String sp_title;
    private String img_name;
}
