package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("rvdto")
public class ReviewDto {
    private int sp_num;
    private int touser;
    private int rv_tmp;
    private String rv_txt;
}